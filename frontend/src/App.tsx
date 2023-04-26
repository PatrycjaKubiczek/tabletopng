import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import axios from "axios";
//styles
import "@picocss/pico";
import "./App.css";

//types
import { User } from "./components/CreateUserForm/CreateUserForm";
import { Team } from "./components/CreateTeamForm/CreateTeamForm";

//pages
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import UsersPage from "./pages/UsersPage";
import TeamsPage from "./pages/TeamsPage";
import TableGeneratorPage from "./pages/TableGeneratorPage";
import NoPage from "./pages/NoPage";

import ScoreForm, { Score } from "./components/ScoreForm/ScoreForm";
import Snackbar from "./components/Snackbar/Snackbar";

function App() {
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

  const submitScore = (scores: Score[]) => {
    // const updatedUsers = users.map((u) => {
    //   if (u._id === userId) {
    //     return { ...u, points: u.points + score };
    //   } else {
    //     return u;
    //   }
    // });
    // setUsers(updatedUsers);
    console.log(scores);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="users"
              element={
                <UsersPage
                  onCreateUser={handleCreateUser}
                  onAddUserPoints={handlePointsChange}
                  onDeleteUser={handleDeleteUser}
                  teams={teams}
                  users={sortedUsers}
                  isLoading={isLoading}
                  tableRef={tableRef}
                />
              }
            />
            <Route
              path="teams"
              element={
                <TeamsPage
                  onAddTeam={handleAddTeam}
                  teams={teams}
                  users={sortedUsers}
                  isLoading={isLoading}
                  tableRef={tableRef}
                />
              }
            />
            <Route
              path="table"
              element={
                <TableGeneratorPage
                  users={users}
                  teams={teams}
                  tableRef={tableRef}
                  isLoading={isLoading}
                  onDownloadImage={downloadImage}
                />
              }
            />

            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <ScoreForm users={users} onSubmitScore={submitScore} /> */}
      {/* //   <article>
    //     <h5>Lista użytkowników</h5>
    //     <AddUserPointsForm
    //       users={users}
    //       onAddUserPoints={handlePointsChange}
    //       onDeleteUser={handleDeleteUser}
    //     />
    //   </article> */}

      {/* <button onClick={downloadImage}>Pobierz obrazek</button> */}
      {snackbarVisible && <Snackbar message={snackbarMessage} />}
    </div>
  );
}

export default App;
