import { Team } from "../CreateTeamForm/CreateTeamForm";

function UsersList({
  teams,
  isLoading,
}: {
  teams: Team[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Nazwa zespołu</th>
            <th>Logo</th>
            <th>Punkty</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>
                <img src={team.logo} alt={team.name} />
              </td>
              {/* <td>{team.points}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UsersList;
