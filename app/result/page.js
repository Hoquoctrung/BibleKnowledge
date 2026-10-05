"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();

  const [data, setData] = useState(null);

  useEffect(() => {
    const result = localStorage.getItem("quizResult");

    if (result) {
      setData(JSON.parse(result));
    }
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Đang tải...
      </main>
    );
  }

  const correct = data.results.filter(
    (item) => item.selected === item.correct
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-xl mx-auto text-center">

        <div className="text-6xl mb-5">🏆</div>

        <h1 className="text-3xl font-bold mb-2">
          Hoàn thành!
        </h1>

        <p className="text-slate-400 mb-8">
          {data.nickname}
        </p>

        <div className="bg-slate-900 rounded-2xl p-6 mb-6">
          <div className="text-5xl font-bold mb-3">
            {data.score}
          </div>

          <p className="text-slate-400">
            điểm
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-900 rounded-xl p-4">
            <div className="text-2xl font-bold">
              {correct}/15
            </div>

            <div className="text-xs text-slate-400">
              Đúng
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-4">
            <div className="text-2xl font-bold">
              {data.results.reduce(
                (sum, item) => sum + item.points,
                0
              )}
            </div>

            <div className="text-xs text-slate-400">
              Tổng điểm
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full bg-white text-black py-4 rounded-xl font-bold"
        >
          Về trang chủ
        </button>
      </div>
    </main>
  );
}