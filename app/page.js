"use client";

import { useRouter } from "next/navigation";
import { quiz } from "@/data/quizzes";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="text-5xl mb-5">📖</div>

        <h1 className="text-3xl font-bold mb-3">
          Bible Weekly Quiz
        </h1>

        <p className="text-slate-400 mb-8">
          {quiz.title}
        </p>

        <div className="bg-slate-900 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-2xl font-bold">15</div>
              <div className="text-xs text-slate-400">Câu hỏi</div>
            </div>

            <div>
              <div className="text-2xl font-bold">ABCD</div>
              <div className="text-xs text-slate-400">Trắc nghiệm</div>
            </div>

            <div>
              <div className="text-2xl font-bold">⚡</div>
              <div className="text-xs text-slate-400">Tính tốc độ</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push("/quiz")}
          className="w-full bg-white text-slate-950 py-4 rounded-xl font-bold text-lg hover:bg-slate-200 transition"
        >
          Bắt đầu chơi
        </button>

        <button
          onClick={() => router.push("/leaderboard")}
          className="w-full mt-3 border border-slate-700 py-4 rounded-xl font-bold"
        >
          🏆 Xem bảng xếp hạng
        </button>

        <p className="text-xs text-slate-500 mt-6">
          Học Kinh Thánh — chơi cùng nhau — nhớ Lời Chúa
        </p>
      </div>
    </main>
  );
}