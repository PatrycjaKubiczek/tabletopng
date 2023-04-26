import { User } from "../CreateUserForm/CreateUserForm";
import { Team } from "../CreateTeamForm/CreateTeamForm";

function UsersList({
  teams,
  users,
  isLoading,
  onDeleteTeam,
}: {
  teams: Team[];
  users: User[];
  isLoading: boolean;
  onDeleteTeam: (_id: number) => void;
}) {
  const sumTeamPoints = (team: Team) => {
    const sum = users.reduce((acc, user) => {
      if (user.team === team.name) {
        return acc + user.points;
      }
      return acc;
    }, 0);
    return sum;
  };

  const teamsWithPoints = teams.map((team) => {
    return { ...team, points: sumTeamPoints(team) };
  });

  const sortedTeams = teamsWithPoints
    .slice()
    .sort((a, b) => b.points - a.points);

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
          {sortedTeams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>
                <img src={team.logo} alt={team.name} />
              </td>
              <td>{team.points}</td>
              <td>
                <button onClick={() => onDeleteTeam(team._id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UsersList;
