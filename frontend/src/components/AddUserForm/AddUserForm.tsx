import { useState } from "react";
import { Team } from "../CreateTeamForm/CreateTeamForm";

import "./AddUserForm.css";

export type User = {
  _id: number;
  name: string;
  team: string;
  points: number;
};

function AddUserForm({
  onAddUser,
  teams,
}: {
  onAddUser: (user: User) => void;
  teams: Team[];
}) {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser = { name, team, points: 0, _id: Math.random() };
    onAddUser(newUser);

    displaySnackbar(name);
    setName("");
    setTeam("");
  };


  const displaySnackbar = (name: string) => {
    const snackbar = document.getElementById("snackbar");
    const snackbarText = document.getElementById("snackbar-text");
    if (!snackbarText) return;
    snackbarText.innerHTML = `Dodano użytkownika ${name} do bazy`;
    snackbar?.classList.add("show");
    setTimeout(() => {
      snackbar?.classList.remove("show");
    }, 3000);
  };

  return (
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

      <div className="snackbar" id="snackbar">
        <span id="snackbar-text"></span>
      </div>
    </form>
  );
}

export default AddUserForm;
