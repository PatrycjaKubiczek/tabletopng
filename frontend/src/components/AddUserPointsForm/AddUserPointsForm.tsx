import { User } from "../AddUserForm/AddUserForm";

export default function AddUserPointsForm({
  users,
  onAddUserPoints,
  onDeleteUser,
}: {
  users: User[];
  onAddUserPoints: (
    _id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
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
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.team}</td>
              <td>
                <input
                  type="number"
                  value={user.points}
                  onChange={(e) => onAddUserPoints(user._id, e)}
                />
              </td>
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
