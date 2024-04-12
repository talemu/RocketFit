import { useEffect, useState } from "react";
import workoutExerciseService, {
  Workout,
} from "../services/workoutExerciseService";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

interface Props {
  authId: number;
}

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 10em;
`;

const WorkoutButton = styled.button`
  margin: 1em;
`;

const ChooseWorkoutPage = ({ authId }: Props) => {
  const Navigate = useNavigate();
  const [workoutArray, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  if (authId == -10) {
    Navigate("/unauthorized");
  }

  useEffect(() => {
    setLoading(true);
    const { request } = workoutExerciseService.getAll("/" + authId);
    request.then((response) => {
      const workouts = response.data as unknown[] as Workout[];
      setWorkouts(workouts);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <ContentDiv>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {workoutArray?.map((item: Workout) => (
              <WorkoutButton>
                <Link to={"/main"} state={item}>
                  {" "}
                  {item.workoutName}
                </Link>
              </WorkoutButton>
            ))}
          </>
        )}

        <WorkoutButton>
          <Link to={"/workouts"}>Choose New Workout</Link>
        </WorkoutButton>
      </ContentDiv>
    </>
  );
};

export default ChooseWorkoutPage;
