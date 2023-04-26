import { User } from "../components/CreateUserForm/CreateUserForm";
import CreateTeamForm, {
  Team,
} from "../components/CreateTeamForm/CreateTeamForm";
import TeamsList from "../components/TeamsList/TeamsList";

type TeamsPageProps = {
  onAddTeam: (team: Team) => void;
  teams: Team[];
  users: User[];
  tableRef: any;
  isLoading: boolean;
};

function TeamsPage({ onAddTeam, teams, users, isLoading }: TeamsPageProps) {
  return (
    <>
      <article>
        <h5>Dodawanie nowego użytkownika</h5>
        <CreateTeamForm onAddTeam={onAddTeam} />
      </article>
      <article>
        <h5>Lista zespołów</h5>
        <TeamsList teams={teams} isLoading={isLoading} users={users} />
      </article>
    </>
  );
}

export default TeamsPage;
