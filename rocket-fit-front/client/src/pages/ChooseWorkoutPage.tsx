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
`;

const WorkoutButton = styled.button`
  margin: 1em;
  text-align: start;

  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(0.5em) translateZ(0);
  transform: perspective(0.5em) translateZ(0);
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;

  &:hover,
  &:focus,
  &:active {
    -webkit-transform: translateX(0.5em);
    transform: translateX(0.5em);
  }
`;

const ButtonLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: black;
`;

const ChooseWorkoutPage = ({ authId }: Props) => {
  const Navigate = useNavigate();
  const [workoutArray, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  if (authId == -10) {
    Navigate("/unauthorized");
  }

  useEffect(() => {
    const { request } = workoutExerciseService.getAll("/" + authId);
    request
      .then((response) => {
        const workouts = response.data as unknown[] as Workout[];
        setWorkouts(workouts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
                <ButtonLink to={"/main"} state={[0, item]}>
                  {" "}
                  {item.workoutName}
                </ButtonLink>
              </WorkoutButton>
            ))}
            <WorkoutButton>
              <ButtonLink to={"/workouts"} state={workoutArray.length}>
                Choose New Workout
              </ButtonLink>
            </WorkoutButton>
          </>
        )}
      </ContentDiv>
    </>
  );
};

export default ChooseWorkoutPage;
