import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import "@picocss/pico";

import "./TableStyle.css";

function TableImage() {
  const tableRef = useRef(null);
  const [users, setUsers] = useState([
    { id: 1, name: "Optio", team: "test", points: 0 },
    { id: 2, name: "Noye", team: "test3", points: 0 },
    { id: 3, name: "Runisko", team: "test2", points: 0 },
  ]);
  const sortedUsers = users.sort((a, b) => b.points - a.points);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserPoints, setSelectedUserPoints] = useState("");
  const [nameInput, setNameInput] = useState("");

  const downloadImage = () => {
    htmlToImage.toPng(tableRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "table.png";
      link.href = dataUrl;
      link.click();
    });
  };

  const handleNameInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newId = Math.max(...users.map((u) => u.id)) + 1;
    const newUser = { id: newId, name: nameInput, points: 0 };
    setUsers([...users, newUser]);
    setNameInput("");
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((u) => u.id !== userId);
    setUsers(updatedUsers);
  };

  const handleSelectedUserChange = (e) => {
    const userId = parseInt(e.target.value);
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setSelectedUserPoints("");
  };

  const handleSelectedUserPointsChange = (e) => {
    setSelectedUserPoints(e.target.value);
  };

  const handleAddPoints = (e) => {
    e.preventDefault();
    const updatedUsers = users.map((u) => {
      if (u.id === selectedUser.id) {
        return { ...u, points: parseInt(selectedUserPoints) };
      } else {
        return u;
      }
    });
    setUsers(updatedUsers);
    setSelectedUser(null);
    setSelectedUserPoints("");
  };

  const handlePointsChange = (userId, e) => {
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
    <div>
      <div style={{ padding: "10px" }}>
        <form onSubmit={handleAddUser} style={{ padding: "10px" }}>
          <label>
            Dodaj użytkownika:
            <input
              type="text"
              value={nameInput}
              onChange={handleNameInputChange}
            />
          </label>
          <button type="submit">Dodaj</button>
        </form>
        {/* <form onSubmit={handleAddPoints} style={{padding: '10px'}}>
        <label>
          Wybierz użytkownika:
          <select value={selectedUser ? selectedUser.id : ''} onChange={handleSelectedUserChange}>
            <option value="">-- Wybierz --</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        <label>
          Dodaj punkty:
          <input type="number" value={selectedUserPoints} onChange={handleSelectedUserPointsChange} />
        </label>
        <button type="submit" disabled={!selectedUser}>Dodaj</button>
      </form> */}
        <h5>Lista uzytkowników</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Użytkownik</th>
              <th>Zespół</th>
              <th>Punkty</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.team}</td>
                <td>
                  <input
                    type="number"
                    value={user.points}
                    onChange={(e) => handlePointsChange(user.id, e)}
                  />
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />

      <table className="finalTable" ref={tableRef}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Użytkownik</th>
            <th>Zespół</th>
            <th>Punkty</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              {/* dodać miejsce */}
              <td>{user.name}</td>
              <td>{user.team}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={downloadImage}>Pobierz obrazek</button>
    </div>
  );
}

export default TableImage;
