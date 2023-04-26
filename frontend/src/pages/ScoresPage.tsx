import { User } from "../components/CreateUserForm/CreateUserForm";
import ScoreForm, { Score } from "../components/ScoreForm/ScoreForm";

type ScoresPageProps = {
  users: User[];
  submitScore: (scores: Score[]) => void;
};

const ScoresPage = ({ users, submitScore }: ScoresPageProps) => {
  return (
    <>
      <h5>Tabela wyników</h5>
      <article>
        <ScoreForm users={users} onSubmitScore={submitScore} />
      </article>
    </>
  );
};

export default ScoresPage;
