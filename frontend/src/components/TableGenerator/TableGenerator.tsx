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
  const [users, setUsers] = useState<User[]>([]);
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
