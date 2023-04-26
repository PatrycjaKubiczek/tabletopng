import { useState } from "react";
import { Team } from "../CreateTeamForm/CreateTeamForm";
import "./CreateUserForm.css";

export type User = {
  _id: number;
  name: string;
  team: string;
  points: number;
};

function CreateUserForm({
  onCreateUser,
  teams,
}: {
  onCreateUser: (user: User) => void;
  teams: Team[];
}) {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser = { name, team, points: 0, _id: Math.random() };
    onCreateUser(newUser);

    setName("");
    setTeam("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nazwa użytkownika</label>
        <input
          type="text"
          placeholder="Wpisz nazwę użytkownika"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="logo">Wybierz zespół</label>

        {teams && teams.length === 0 && (
          <p>
            Brak zespołów w bazie :( - dodaj zespół, aby dodać użytkownika do
            zespołu
          </p>
        )}

        {teams && teams.length > 0 && (
          <select
            name="team"
            id="team"
            value={team}
            onChange={(event) => setTeam(event.target.value)}
            disabled={!teams}
            required
          >
            <option value="">Wybierz zespół</option>
            {teams.map((team) => (
              <option key={team._id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        )}

        <button type="submit">Dodaj użytkownika</button>
      </form>
    </>
  );
}

export default CreateUserForm;
