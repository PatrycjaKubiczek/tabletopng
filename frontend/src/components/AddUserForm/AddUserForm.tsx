import { useState } from "react";
import { Team } from "../CreateTeamForm/CreateTeamForm";

export type User = {
  _id: number;
  name: string;
  team: string;
  logo: string;
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
  const [logo, setLogo] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser = { name, team, points: 0, _id: Math.random(), logo };
    onAddUser(newUser);
    setName("");
    setTeam("");
  };

  // const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   if (selectedFile) {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(selectedFile);
  //     fileReader.onload = () => {
  //       setLogo(fileReader.result as string);
  //     };
  //   }
  // };

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
      {teams.length === 0 && (
        <p>
          Brak zespołów w bazie :( - dodaj zespół, aby dodać użytkownika do
          zespołu
        </p>
      )}
      {teams.length > 0 ? (
        <select
          name="team"
          id="team"
          value={team}
          onChange={(event) => setTeam(event.target.value)}
        >
          <option value="">Wybierz zespół</option>
          {teams.map((team) => (
            <option key={team._id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      ) : null}

      <button type="submit">Dodaj użytkownika</button>
    </form>
  );
}

export default AddUserForm;
