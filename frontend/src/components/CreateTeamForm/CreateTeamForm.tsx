import { useState } from "react";

export type Team = {
  _id: number;
  name: string;
  logo: string;
};

function CreateUserForm({ onAddTeam }: { onAddTeam: (team: Team) => void }) {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTeam: Team = { _id: Math.floor(Math.random() * 1000), name, logo };
    onAddTeam(newTeam);
    setName("");
    setLogo("");
    const input = document.getElementById("logoUpload") as HTMLInputElement;
    input.value = "";
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
      <label htmlFor="name">Nazwa zespołu</label>
      <input
        type="text"
        placeholder="Wpisz nazwę zespołu"
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
        required
      />

      <button type="submit">Dodaj zespół</button>
    </form>
  );
}

export default CreateUserForm;
