"use client";

import { useRouter } from "next/navigation";
import { weeks } from "@/data/weeks";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="w-full max-w-md mx-auto">

        {/* Header */}
        <div className="text-center pt-8 mb-8">
          <div className="text-5xl mb-4">📖</div>

          <h1 className="text-3xl font-bold mb-2">
            Bible Knowledge
          </h1>

          <p className="text-slate-400">
            Học Kinh Thánh — chơi cùng nhau — nhớ Lời Chúa
          </p>
        </div>

        {/* Weeks */}
        <div className="space-y-4">
          {weeks.map((item) => (
            <div
              key={item.week}
              className={`rounded-2xl p-5 border ${
                item.type === "current"
                  ? "bg-slate-900 border-white/30"
                  : "bg-slate-900/60 border-slate-800"
              }`}
            >
              {/* Week + status */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold tracking-wider">
                  {item.week}
                </span>

                {item.type === "current" && (
                  <span className="text-xs font-bold text-green-400">
                    ĐANG MỞ
                  </span>
                )}

                {item.type === "closed" && (
                  <span className="text-xs text-red-500">
                    Đã đóng
                  </span>
                )}

                {item.type === "upcoming" && (
                  <span className="text-xs text-slate-500">
                    Sắp mở
                  </span>
                )}
              </div>

              {/* Reading days */}
              <div className="text-lg font-semibold mb-1">
                📖 {item.passage}
              </div>

              <div className="text-sm text-slate-400 mb-4">
                {item.questions} câu
              </div>

              {/* Current week */}
              {item.type === "current" && (
                <button
                  onClick={() => router.push("/quiz")}
                  className="w-full bg-white text-slate-950 py-3 rounded-xl font-bold hover:bg-slate-200 transition"
                >
                  Chơi ngay →
                </button>
              )}

              {/* Closed */}
              {item.type === "closed" && (
                <div className="text-center text-sm text-slate-500 py-2">
                  Quiz đã kết thúc
                </div>
              )}

              {/* Upcoming */}
              {item.type === "upcoming" && (
                <div className="text-center text-sm text-slate-500 py-2">
                  Quiz chưa mở
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <button
          onClick={() => router.push("/leaderboard")}
          className="w-full mt-6 border border-slate-700 py-4 rounded-xl font-bold hover:bg-slate-900 transition"
        >
          🏆 Xem bảng xếp hạng
        </button>

        <p className="text-xs text-slate-600 text-center mt-6">
          Bible Knowledge
        </p>

      </div>
    </main>
  );
}