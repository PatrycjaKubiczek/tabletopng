import { useState } from "react";

export type User = {
  _id: number;
  name: string;
  team: string;
  logo: string;
  points: number;
};

function AddUserForm({ onAddUser }: { onAddUser: (user: User) => void }) {
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);
      fileReader.onload = () => {
        setLogo(fileReader.result as string);
      };
    }
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

      <label htmlFor="logo">Logo zespołu</label>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        id="logoUpload"
        onChange={handleLogoChange}
      />

      <label htmlFor="team">Nazwa zespołu</label>
      <input
        type="text"
        placeholder="Wpisz nazwę zespołu"
        value={team}
        onChange={(event) => setTeam(event.target.value)}
        required
      />
      <button type="submit">Dodaj użytkownika</button>
    </form>
  );
}

export default AddUserForm;
