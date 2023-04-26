import React, { useState, useRef, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import "@picocss/pico";
import "./TableStyle.css";

import CreateUserForm, { User } from "../CreateUserForm/CreateUserForm";
import UsersList from "../UsersList/UsersList";
import AddUserPointsForm from "../AddUserPointsForm/AddUserPointsForm";
import axios from "axios";
import CreateTeamForm, { Team } from "../CreateTeamForm/CreateTeamForm";

import TeamsList from "../TeamsList/TeamsList";
import Snackbar from "../Snackbar/Snackbar";

function TableGenerator() {
  const tableRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const sortedUsers = users.slice().sort((a, b) => b.points - a.points);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3001/api/users");
    const users = res.data.data;
    setUsers(users);
  };

  const fetchTeams = async () => {
    const res = await axios.get("http://localhost:3001/api/teams");
    const teams = res.data.data;
    setTeams(teams);
  };

  useEffect(() => {
    fetchUsers();
    fetchTeams();
    setIsLoading(false);
  }, []);

  const handleSnackbar = (message: string) => {
    setSnackbarVisible(true);
    setSnackbarMessage(message);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  };

  const downloadImage = () => {
    if (!tableRef.current) return;
    htmlToImage.toPng(tableRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "table.png";
      link.href = dataUrl;
      link.click();
    });

    // add png image to database
    const image: any = tableRef.current;
    const imageSrc = image?.toDataURL("image/png");
    const imageBase64 = imageSrc?.replace(/^data:image\/png;base64,/, "");

    axios
      .post("http://localhost:3001/api/teams", { imageBase64 })
      .then((res) => {
        console.log(res);
      });
  };

  const handleAddTeam = (newTeam: Team) => {
    setTeams([...teams, { ...newTeam, _id: teams.length + 1 }]);

    axios.post("http://localhost:3001/api/teams", newTeam).then((res) => {
      handleSnackbar(`Dodano zespół ${newTeam.name}`);
    });
  };

  const handleCreateUser = (newUser: User) => {
    setUsers([...users, { ...newUser, _id: users.length + 1 }]);

    axios.post("http://localhost:3001/api/users", newUser).then((res) => {
      handleSnackbar(`Dodano użytkownika ${newUser.name}`);
    });
  };

  const handleDeleteUser = (userId: number) => {
    axios.delete(`http://localhost:3001/api/users/${userId}`).then((res) => {
      handleSnackbar(`Usunięto użytkownika!`);
    });

    const updatedUsers = users.filter((u) => u._id !== userId);
    setUsers(updatedUsers);
  };

  const handlePointsChange = (
    userId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedUsers = users.map((u) => {
      if (u._id === userId) {
        if (e.target.value === "") {
          return { ...u, points: 0 };
        }
        if (e.target.value === "-") {
          return { ...u, points: 0 };
        }
        return { ...u, points: parseInt(e.target.value) };
      } else {
        return u;
      }
    });
    setUsers(updatedUsers);
  };

  return (
    <div style={{ padding: "10px 30px", backgroundColor: "#0b161e" }}>
      <h1>Generator tabeli</h1>
      <article>
        <h5>Dodawanie nowego zespołu</h5>
        <CreateTeamForm onAddTeam={handleAddTeam} />
      </article>

      <article>
        <h5>Dodawanie nowego użytkownika</h5>
        <CreateUserForm onCreateUser={handleCreateUser} teams={teams} />
      </article>

      <article>
        <h5>Lista użytkowników</h5>
        <AddUserPointsForm
          users={users}
          onAddUserPoints={handlePointsChange}
          onDeleteUser={handleDeleteUser}
        />
      </article>

      <TeamsList teams={teams} isLoading={isLoading} users={users} />
      <UsersList
        users={sortedUsers}
        teams={teams}
        isLoading={isLoading}
        tableRef={tableRef}
      />

      <button onClick={downloadImage}>Pobierz obrazek</button>
      {snackbarVisible && <Snackbar message={snackbarMessage} />}
    </div>
  );
}

export default TableGenerator;
