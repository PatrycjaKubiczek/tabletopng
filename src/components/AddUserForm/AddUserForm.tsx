import { useState } from "react";

type User = {
    name: string;
    team: string;
    points: number;
};


function AddUserForm({ onAddUser }: { onAddUser: (user: User) => void }) {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser = { name, team, points: 0 };
    onAddUser(newUser);
    setName("");
    setTeam("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Wpisz nazwę użytkownika"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Wpisz nazwę zespołu"
        value={team}
        onChange={(event) => setTeam(event.target.value)}
      />
      <button type="submit">Dodaj użytkownika</button>
    </form>
  );
}

export default AddUserForm;
