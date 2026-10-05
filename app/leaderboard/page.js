"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LeaderboardPage() {
  const router = useRouter();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("leaderboard") || "[]"
    );

    setPlayers(
      saved.sort((a, b) => b.score - a.score)
    );
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-xl mx-auto">

        <button
          onClick={() => router.push("/")}
          className="text-slate-400 mb-6"
        >
          ← Trang chủ
        </button>

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏆</div>

          <h1 className="text-3xl font-bold">
            Bảng xếp hạng
          </h1>

          <p className="text-slate-400 mt-2">
            Kinh Thánh Tuần 43
          </p>
        </div>

        {players.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl p-8 text-center">
            <p className="text-slate-400">
              Chưa có người chơi.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {players.map((player, index) => (
              <div
                key={index}
                className="bg-slate-900 rounded-xl p-4 flex items-center"
              >
                <div className="w-10 text-xl font-bold">
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : `${index + 1}`}
                </div>

                <div className="flex-1">
                  <div className="font-bold">
                    {player.nickname}
                  </div>

                  <div className="text-xs text-slate-500">
                    {player.correct}/15 câu đúng
                  </div>
                </div>

                <div className="font-bold">
                  {player.score}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => router.push("/quiz")}
          className="w-full bg-white text-black py-4 rounded-xl font-bold mt-8"
        >
          Chơi lại
        </button>

      </div>
    </main>
  );
}