import CreateUserForm, {
  User,
} from "../components/CreateUserForm/CreateUserForm";
import UsersList from "../components/UsersList/UserList";
import { Team } from "../components/CreateTeamForm/CreateTeamForm";

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

function UsersPage({
  onCreateUser,
  onAddUserPoints: handlePointsChange,
  onDeleteUser: handleDeleteUser,
  teams,
  users,
}: UserPageProps) {
  return (
    <>
      <h5>Użytkownicy</h5>
      <article>
        <h5>Dodawanie nowego użytkownika</h5>
        <CreateUserForm onCreateUser={onCreateUser} teams={teams} />
      </article>

      <article>
        <h5>Lista użytkowników</h5>
        <UsersList users={users} onDeleteUser={handleDeleteUser} />
      </article>
    </>
  );
}

export default UsersPage;
