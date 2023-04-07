import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import "@picocss/pico";

import "./TableStyle.css";
import AddUser from "../AddUserForm/AddUserForm";

function TableImage() {
  const tableRef = useRef(null);
  const [users, setUsers] = useState([
    { id: 1, name: "Optio", team: "test", points: 0 },
    { id: 2, name: "Noye", team: "test3", points: 0 },
    { id: 3, name: "Runisko", team: "test2", points: 0 },
  ]);
  const sortedUsers = users.sort((a, b) => b.points - a.points);

  const downloadImage = () => {
    if(!tableRef.current) return;
    htmlToImage.toPng(tableRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "table.png";
      link.href = dataUrl;
      link.click();
    });
  };


  const handleAddUser = (newUser: { name: string; team: string; points: number }) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
  };

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter((u) => u.id !== userId);
    setUsers(updatedUsers);
  };

  const handlePointsChange = (userId: number, e: React.ChangeEvent<HTMLInputElement>) => {
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

        <AddUser onAddUser={handleAddUser} />

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
          {sortedUsers.map((user) => (
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
