import { useEffect, useState } from "react";

interface LeaderboardEntry {
  _id: string;
  userId: string;
  score: number;
  wins: number;
  losses: number;
  date: string;
}

const mockData: LeaderboardEntry[] = [
  {
    _id: "1",
    userId: "AshKetchum",
    score: 850,
    wins: 17,
    losses: 3,
    date: "2026-05-25",
  },
  {
    _id: "2",
    userId: "MistyWater",
    score: 720,
    wins: 14,
    losses: 6,
    date: "2026-05-25",
  },
  {
    _id: "3",
    userId: "BrockRock",
    score: 690,
    wins: 13,
    losses: 7,
    date: "2026-05-24",
  },
  {
    _id: "4",
    userId: "GaryOak",
    score: 540,
    wins: 10,
    losses: 10,
    date: "2026-05-24",
  },
  {
    _id: "5",
    userId: "TeamRocket",
    score: 480,
    wins: 9,
    losses: 11,
    date: "2026-05-23",
  },
  {
    _id: "6",
    userId: "ProfOak",
    score: 420,
    wins: 8,
    losses: 12,
    date: "2026-05-23",
  },
  {
    _id: "7",
    userId: "NurseJoy",
    score: 350,
    wins: 7,
    losses: 13,
    date: "2026-05-22",
  },
  {
    _id: "8",
    userId: "LtSurge",
    score: 300,
    wins: 6,
    losses: 14,
    date: "2026-05-22",
  },
  {
    _id: "9",
    userId: "Sabrina",
    score: 250,
    wins: 5,
    losses: 15,
    date: "2026-05-21",
  },
  {
    _id: "10",
    userId: "Giovanni",
    score: 200,
    wins: 4,
    losses: 16,
    date: "2026-05-21",
  },
];

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setEntries(mockData);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">🏆 Leaderboard</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
              <th>Wins</th>
              <th>Losses</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry._id}>
                <td className="text-lg font-bold">
                  {index === 0 && "🥇"}
                  {index === 1 && "🥈"}
                  {index === 2 && "🥉"}
                  {index > 2 && `#${index + 1}`}
                </td>
                <td className="font-semibold">{entry.userId}</td>
                <td>{entry.score}</td>
                <td className="text-success">{entry.wins}</td>
                <td className="text-error">{entry.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
