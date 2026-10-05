"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { week06 } from "@/data/week-06";

export default function QuizPage() {
  const router = useRouter();
  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

  const [nickname, setNickname] = useState("");
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);

  const question = questions[current];

  useEffect(() => {
    if (!started || selected !== null) return;

    if (timeLeft <= 0) {
      handleAnswer(null);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [started, timeLeft, selected]);

  function startQuiz() {
    if (!nickname.trim()) return;

    const preparedQuestions = shuffle(week06.questions).map((question) => {
        const answers = question.answers.map((answer, index) => ({
        answer,
        originalIndex: index,
        }));

        const shuffledAnswers = shuffle(answers);

        return {
        ...question,
        answers: shuffledAnswers.map((item) => item.answer),
        correct: shuffledAnswers.findIndex(
            (item) => item.originalIndex === question.correct
        ),
        };
    });

    setQuestions(preparedQuestions);

    localStorage.setItem("nickname", nickname.trim());
    setStarted(true);
}

  function handleAnswer(answerIndex) {
  if (selected !== null) return;

  const correct = answerIndex === question.correct;
  const speedBonus = correct ? timeLeft * 2.5 : 0;
  const points = correct ? 100 + speedBonus : 0;

  const newScore = score + points;

  const newResult = {
    question: question.question,
    selected: answerIndex,
    correct: question.correct,
    points,
    reference: question.reference,
    explanation: question.explanation,
  };

  const newResults = [...results, newResult];

  setSelected(answerIndex);
  setScore(newScore);
  setResults(newResults);

  // Nếu là câu cuối
  if (current === questions.length - 1) {
    localStorage.setItem(
      "quizResult",
      JSON.stringify({
        nickname,
        score: newScore,
        results: newResults,
      })
    );

    const leaderboard = JSON.parse(
      localStorage.getItem("leaderboard") || "[]"
    );

    leaderboard.push({
      nickname,
      score: newScore,
      correct: newResults.filter(
        (item) => item.selected === item.correct
      ).length,
    });

    localStorage.setItem(
      "leaderboard",
      JSON.stringify(leaderboard)
    );

    setTimeout(() => {
      router.push("/result");
    }, 1200);

    return;
  }

  // Chuyển sang câu tiếp theo
  setTimeout(() => {
    setCurrent((old) => old + 1);
    setSelected(null);
    setTimeLeft(20);
  }, 1200);
}

  if (!started) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-3">
            Sẵn sàng chưa? 🎮
          </h1>

          <p className="text-slate-400 mb-8">
            Nhập nickname để bắt đầu.
          </p>

          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Nickname của bạn"
            maxLength={20}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 outline-none focus:border-white mb-4"
          />

          <button
            onClick={startQuiz}
            className="w-full bg-white text-black py-4 rounded-xl font-bold"
          >
            Vào game
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-5">
      <div className="max-w-xl mx-auto">

        <div className="flex justify-between items-center mb-5">
          <span className="text-sm text-slate-400">
            Câu {current + 1}/{questions.length}
          </span>

          <span className="font-bold">
            ⏱️ {timeLeft}s
          </span>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-2 mb-8">
          <div
            className="bg-white h-2 rounded-full transition-all"
            style={{
              width: `${((current + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 mb-5">
          <p className="text-xl font-bold leading-relaxed">
            {question.question}
          </p>
        </div>

        <div className="grid gap-3">
          {question.answers.map((answer, index) => {
            let style =
              "bg-slate-900 border-slate-700 hover:border-white";

            if (selected !== null) {
              if (index === question.correct) {
                style = "bg-green-600 border-green-600";
              } else if (index === selected) {
                style = "bg-red-600 border-red-600";
              } else {
                style = "bg-slate-900 border-slate-800 opacity-50";
              }
            }

            return (
              <button
                key={index}
                disabled={selected !== null}
                onClick={() => handleAnswer(index)}
                className={`border rounded-xl p-4 text-left transition ${style}`}
              >
                <span className="font-bold mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>

                {answer}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-5 bg-slate-900 rounded-xl p-5">
            <p className="font-bold mb-2">
              {selected === question.correct
                ? "✅ Chính xác!"
                : "❌ Chưa đúng!"}
            </p>

            <p className="text-sm text-slate-300 mb-2">
              {question.explanation}
            </p>

            <p className="text-xs text-slate-500">
              📖 {question.reference}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}