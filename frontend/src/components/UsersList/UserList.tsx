import { User } from "../CreateUserForm/CreateUserForm";

export default function UsersList({
  users,
  onDeleteUser,
}: {
  users: User[];
  onDeleteUser: (_id: number) => void;
}) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Użytkownik</th>
            <th>Zespół</th>
            <th>Punkty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.team}</td>
              <td>{user.points}</td>
              <td>
                <button onClick={() => onDeleteUser(user._id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
