import { User } from "../AddUserForm/AddUserForm";

function UsersList({ users }: { users: User[] }) {
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error.message}</div>;
  // }

  return (
    <>
      <h5>Finalna tabela</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Miejsce</th>
            <th>Użytkownik</th>
            <th>Zespół</th>
            <th>Punkty</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td>{users.indexOf(user) + 1}</td>
              <td>{user.name}</td>
              <td>{user.team}</td>
              <td>
                <img src={user.logo} alt="edit" style={{ width: "50px" }} />
              </td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UsersList;
