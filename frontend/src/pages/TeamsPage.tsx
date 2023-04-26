import { User } from "../components/CreateUserForm/CreateUserForm";
import CreateTeamForm, {
  Team,
} from "../components/CreateTeamForm/CreateTeamForm";
import TeamsList from "../components/TeamsList/TeamsList";

type TeamsPageProps = {
  onAddTeam: (team: Team) => void;
  onDeleteTeam: (_id: number) => void;
  teams: Team[];
  users: User[];
  tableRef: any;
  isLoading: boolean;
};

function TeamsPage({
  onAddTeam,
  onDeleteTeam,
  teams,
  users,
  isLoading,
}: TeamsPageProps) {
  return (
    <>
      <h5>Zespoły</h5>
      <article>
        <h5>Dodawanie nowego zespołu</h5>
        <CreateTeamForm onAddTeam={onAddTeam} />
      </article>
      <article>
        <h5>Lista zespołów</h5>
        <TeamsList
          teams={teams}
          isLoading={isLoading}
          users={users}
          onDeleteTeam={() => {}}
        />
      </article>
    </>
  );
}

export default TeamsPage;
