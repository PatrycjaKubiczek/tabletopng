import { Team } from "../components/CreateTeamForm/CreateTeamForm";
import { User } from "../components/CreateUserForm/CreateUserForm";
import UsersList from "../components/UsersList/UsersList";

type TableGeneratorPageProps = {
  users: User[];
  teams: Team[];
  tableRef: any;
  isLoading: boolean;
  onDownloadImage: () => void;
};

const TableGeneratorPage = ({
  users,
  teams,
  tableRef,
  isLoading,
  onDownloadImage,
}: TableGeneratorPageProps) => {
  return (
    <>
      <h5>Finalna tabela - podgląd</h5>
      <article>
        <UsersList
          users={users}
          teams={teams}
          tableRef={tableRef}
          isLoading={isLoading}
        />
      </article>
      <button onClick={onDownloadImage}>Pobierz obrazek</button>
    </>
  );
};

export default TableGeneratorPage;
