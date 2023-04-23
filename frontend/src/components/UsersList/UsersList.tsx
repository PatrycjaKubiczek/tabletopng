import { User } from "../AddUserForm/AddUserForm";
import { Team } from "../CreateTeamForm/CreateTeamForm";

function UsersList({
  users,
  teams,
  tableRef,
  isLoading,
}: {
  users: User[];
  teams: Team[];
  tableRef: any;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>{error.message}</div>;
  // }

  return (
    <>
      <h5>Finalna tabela</h5>
      <table className="table" ref={tableRef}>
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
            <tr key={user._id}>
              <td>{users.indexOf(user) + 1}</td>
              <td>{user.name}</td>
              <td>{user.team}</td>
              <td>
                {teams.map((team) => {
                  if (team.name === user.team) {
                    return (
                      <img src={team.logo} alt={team.name} key={team._id} />
                    );
                  }
                })}
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
