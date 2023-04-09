import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import "@picocss/pico";
import "./TableStyle.css";

import AddUser, { User } from "../AddUserForm/AddUserForm";
import UsersList from "../UsersList/UsersList";
import AddUserPointsForm from "../AddUserPointsForm/AddUserPointsForm";

function TableGenerator() {
  const tableRef = useRef(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Optio",
      team: "test",
      points: 0,
      logo: "https://images.unsplash.com/photo-1481567758055-3e8a6e89ca58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 2,
      name: "Noye",
      team: "test3",
      points: 0,
      logo: "https://images.unsplash.com/photo-1481567758055-3e8a6e89ca58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 3,
      name: "Runisko",
      team: "test2",
      points: 0,
      logo: "https://images.unsplash.com/photo-1481567758055-3e8a6e89ca58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ]);
  const sortedUsers = users.slice().sort((a, b) => b.points - a.points);

  const downloadImage = () => {
    if (!tableRef.current) return;
    htmlToImage.toPng(tableRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "table.png";
      link.href = dataUrl;
      link.click();
    });
  };

  const handleAddUser = (newUser: User) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
  };

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter((u) => u.id !== userId);
    setUsers(updatedUsers);
  };

  const handlePointsChange = (
    userId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedUsers = users.map((u) => {
      if (u.id === userId) {
        return { ...u, points: parseInt(e.target.value) };
      } else {
        return u;
      }
    });
    setUsers(updatedUsers);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h5>Dodawanie nowego użytkownika</h5>
      <AddUser onAddUser={handleAddUser} />

      <h5>Lista użytkowników</h5>
      <AddUserPointsForm
        users={users}
        onAddUserPoints={handlePointsChange}
        onDeleteUser={handleDeleteUser}
      />
      <hr />

      <UsersList users={sortedUsers} />
      <button onClick={downloadImage}>Pobierz obrazek</button>
    </div>
  );
}

export default TableGenerator;
