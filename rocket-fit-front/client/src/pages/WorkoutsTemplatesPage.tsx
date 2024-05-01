import { useEffect, useState } from "react";
import styled from "styled-components";
import exerciseService, { Exercise } from "../services/exerciseService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Templates from "../components/WorkoutTemplateComponents/Templates";
import CreateFromScratch from "../components/WorkoutTemplateComponents/CreateFromScratch";

const BackButton = styled.button``;

interface Props {
  authId: number;
}

const WorkoutTemplatesPage = ({ authId }: Props) => {
  const Navigate = useNavigate();
  //number of workouts the user already has
  const location = useLocation();
  const numberOfWorkouts = location.state;
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  if (authId == -10) {
    Navigate("/unauthorized");
  }

  useEffect(() => {
    const { request } = exerciseService.getAll("");
    request
      .then((response) => {
        const exercises = response.data as unknown[] as Exercise[];
        setExercises(exercises);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {}, [loading]);

  return (
    <>
      <BackButton>
        <Link to="/myworkouts">Back</Link>
      </BackButton>
      <Templates
        exercises={exercises}
        numberOfWorkouts={numberOfWorkouts}
        sendDataToParent={(loading) => setLoading(loading)}
      />
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <CreateFromScratch
            exercises={exercises}
            numberOfWorkouts={numberOfWorkouts}
          />
        </>
      )}
    </>
  );
};

export default WorkoutTemplatesPage;
