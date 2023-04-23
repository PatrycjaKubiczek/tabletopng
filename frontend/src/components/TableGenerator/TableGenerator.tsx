import React, { useState, useRef, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import "@picocss/pico";
import "./TableStyle.css";

import AddUser, { User } from "../AddUserForm/AddUserForm";
import UsersList from "../UsersList/UsersList";
import AddUserPointsForm from "../AddUserPointsForm/AddUserPointsForm";
import axios from "axios";
import CreateTeamForm, { Team } from "../CreateTeamForm/CreateTeamForm";

import TeamsList from "../TeamsList/TeamsList";

function TableGenerator() {
  const tableRef = useRef(null);
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const sortedUsers = users.slice().sort((a, b) => b.points - a.points);

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

  // add loading before fetch data from database
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchTeams();
    setIsLoading(false);
  }, []);

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
      console.log(res);
    });
  };

  const handleAddUser = (newUser: User) => {
    setUsers([...users, { ...newUser, _id: users.length + 1 }]);

    axios.post("http://localhost:3001/api/users", newUser).then((res) => {
      console.log(res);
    });
  };

  const handleDeleteUser = (userId: number) => {
    axios.delete(`http://localhost:3001/api/users/${userId}`).then((res) => {
      console.log(res);
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
        <AddUser onAddUser={handleAddUser} teams={teams} />
      </article>

      <article>
        <h5>Lista użytkowników</h5>
        <AddUserPointsForm
          users={users}
          onAddUserPoints={handlePointsChange}
          onDeleteUser={handleDeleteUser}
        />
      </article>


      <TeamsList teams={teams} isLoading={isLoading} />
      <UsersList
        users={sortedUsers}
        teams={teams}
        isLoading={isLoading}
        tableRef={tableRef}
      />

      <button onClick={downloadImage}>Pobierz obrazek</button>
    </div>
  );
}

export default TableGenerator;
