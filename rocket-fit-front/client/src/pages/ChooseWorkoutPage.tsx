import { useEffect, useState } from "react";
import workoutExerciseService, {
  Workout,
} from "../services/workoutExerciseService";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Slide } from "react-awesome-reveal";

interface Props {
  authId: number;
}

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1em 1em;
`;

const PageHeader = styled.h2`
  padding: 0.1em;
  font-size: 2em;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  color: red;
`;

const SlideDiv = styled(Slide)`
  direction = left
`;

const CreatedSlideDiv = styled(Slide)`
  font-size: 0.8em;
`;

const WorkoutButton = styled.button`
  margin: 1em 1em;
  padding: 1em;
  text-align: start;
  width: 100%;
  border-radius: 0.5em;
  background-color: red;
  color: white;

  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(0.5em);
  transform: perspective(0.5em);
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
  width: 90%;
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
        setWorkouts(workouts.reverse());
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
            <HeaderDiv>
              <PageHeader>Workouts</PageHeader>
              <CreatedSlideDiv
                direction="right"
                delay={workoutArray.length * 50}
              >
                <ButtonLink to={"/workouts"} state={workoutArray.length}>
                  <WorkoutButton>Create New Workout</WorkoutButton>
                </ButtonLink>
              </CreatedSlideDiv>
            </HeaderDiv>
            {workoutArray?.map((item: Workout, index: number) => (
              <SlideDiv key={index} direction="left" delay={index * 50}>
                <ButtonLink to={"/main"} state={[0, item]}>
                  <WorkoutButton>{item.workoutName}</WorkoutButton>
                </ButtonLink>
              </SlideDiv>
            ))}
          </>
        )}
      </ContentDiv>
    </>
  );
};

export default ChooseWorkoutPage;
