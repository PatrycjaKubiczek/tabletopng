import { User } from "../AddUserForm/AddUserForm";

export default function AddUserPointsForm({
  users,
  onAddUserPoints,
  onDeleteUser,
}: {
  users: User[];
  onAddUserPoints: (id: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteUser: (id: number) => void;
}) {
  return (
    <>
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
          {users.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.team}</td>
              <td>
                <input
                  type="number"
                  value={user.points}
                  onChange={(e) => onAddUserPoints(user.id, e)}
                />
              </td>
              <td>
                <button onClick={() => onDeleteUser(user.id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
