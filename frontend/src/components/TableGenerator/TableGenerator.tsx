import React, { useState, useRef, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import "@picocss/pico";
import "./TableStyle.css";

import AddUser, { User } from "../AddUserForm/AddUserForm";
import UsersList from "../UsersList/UsersList";
import AddUserPointsForm from "../AddUserPointsForm/AddUserPointsForm";
import axios from "axios";

function TableGenerator() {
  const tableRef = useRef(null);

  const [users, setUsers] = useState([
    {
      _id: 1,
      name: "Optio",
      team: "test",
      points: 0,
      logo: "https://images.unsplash.com/photo-1481567758055-3e8a6e89ca58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      _id: 2,
      name: "Noye",
      team: "test3",
      points: 0,
      logo: "https://images.unsplash.com/photo-1481567758055-3e8a6e89ca58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      _id: 3,
      name: "Runisko",
      team: "test2",
      points: 0,
      logo: "https://images.unsplash.com/photo-1481567758055-3e8a6e89ca58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ]);

  useEffect(() => {
    // fetch from database.db and setUsers
    fetch("http://localhost:3001/api/users")
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }, []);

  const sortedUsers = users.slice().sort((a, b) => b.points - a.points);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3001/api/users");
    const users = res.data.data;
    setUsers(users);
  };

  // add loading before fetch data from database
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
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

      <UsersList
        users={sortedUsers}
        tableRef={tableRef}
        isLoading={isLoading}
      />
      <button onClick={downloadImage}>Pobierz obrazek</button>
    </div>
  );
}

export default TableGenerator;
