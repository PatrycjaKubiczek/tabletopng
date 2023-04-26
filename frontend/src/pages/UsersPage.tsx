import CreateUserForm, {
  User,
} from "../components/CreateUserForm/CreateUserForm";
import AddUserPointsForm from "../components/AddUserPointsForm/AddUserPointsForm";
import { Team } from "../components/CreateTeamForm/CreateTeamForm";
import ScoreForm from "../components/ScoreForm/ScoreForm";

type UserPageProps = {
  onCreateUser: (user: User) => void;
  onAddUserPoints: (
    _id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onDeleteUser: (_id: number) => void;
  teams: Team[];
  users: User[];
  tableRef: any;
  isLoading: boolean;
};

function onSubmitScore() {
  console.log("submit score");
}

function UsersPage({
  onCreateUser,
  onAddUserPoints: handlePointsChange,
  onDeleteUser: handleDeleteUser,
  teams,
  users,
  tableRef,
  isLoading,
}: UserPageProps) {
  return (
    <>
      <article>
        <h5>Dodawanie nowego użytkownika</h5>
        <CreateUserForm onCreateUser={onCreateUser} teams={teams} />
      </article>

      <article>
        <h5>Lista użytkowników</h5>
        <AddUserPointsForm
          users={users}
          onAddUserPoints={handlePointsChange}
          onDeleteUser={handleDeleteUser}
        />
      </article>

      {/* <article>
        <h5>Wyniki</h5>

        <table>
          <thead>
            <tr>
              <th>Użytkownik</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.points}</td>
                <td>{user.points}</td>
                <td>{user.points}</td>
                <td>{user.points}</td>
                <td>{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article> */}
      <article>
        <ScoreForm users={users} onSubmitScore={onSubmitScore} />
      </article>
    </>
  );
}

export default UsersPage;
