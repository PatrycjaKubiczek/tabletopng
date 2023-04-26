import { ChangeEvent, useState } from "react";
import { User } from "../CreateUserForm/CreateUserForm";

export type Score = {
  userId: number;
  points: number[];
};

function ScoreForm({
  users,
  onSubmitScore,
}: {
  users: User[];
  onSubmitScore: (scores: Score[]) => void;
}) {
  const [scores, setScores] = useState<Score[]>([]);
  const [rounds, setRounds] = useState<number[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitScore(scores);
  };

  const handleAddRound = () => {
    setRounds((prevRounds) => [...prevRounds, prevRounds.length + 1]);
    const newScores = [...scores];
    users.forEach((user) => {
      if (!newScores.find((score) => score.userId === user._id)) {
        newScores.push({ userId: user._id, points: [] });
      }
    });
    setScores(newScores);
  };

  const handleAddPoints = (
    e: ChangeEvent<HTMLInputElement>,
    user: { _id: any; name?: string; team?: string; points?: number },
    round: number
  ) => {
    const newScores = [...scores];
    const score = newScores.find((score) => score.userId === user._id);
    if (score) {
      score.points[round] = parseInt(e.target.value);
    } else {
      newScores.push({
        userId: user._id,
        points: [parseInt(e.target.value)],
      });
    }
    setScores(newScores);
  };

  return (
    <div className="score-form">
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Użytkownik</th>
              {rounds.map((round) => (
                <th key={round}>Runda {round}</th>
              ))}
              <th>Punkty łącznie</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                {rounds.map((round) => {
                  const score = scores.find(
                    (score) => score.userId === user._id
                  );
                  const roundpoints = score?.points[round] ?? "";
                  return (
                    <td key={round}>
                      <input
                        type="number"
                        value={roundpoints}
                        onChange={(e) => handleAddPoints(e, user, round)}
                      />
                    </td>
                  );
                })}
                <td>
                  {scores
                    .filter((score) => score.userId === user._id)
                    .reduce(
                      (total, score) =>
                        total + score.points.reduce((a, b) => a + b, 0),
                      0
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={handleAddRound}>
          Dodaj rundę
        </button>
        <button type="submit">Zapisz punkty</button>
      </form>
    </div>
  );
}

export default ScoreForm;
