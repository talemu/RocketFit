import { useEffect, useState } from "react";
import workoutTemplateService, {
  StandardizedWorkoutTemplate,
  WorkoutTemplate,
  standardizeWorkoutTemplates,
} from "../services/workoutTemplateService";
import styled from "styled-components";
import exerciseService, { Exercise } from "../services/exerciseService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import DropdownTable from "../components/DropdownTable";

const HeaderOne = styled.h1``;

const StyledTable = styled.table``;

const FlipButton = styled.button``;

const BackButton = styled.button``;

const CreateNewWorkoutDiv = styled.div`
  padding: 3em 0em;
`;

const CreateNewWorkoutButton = styled.button``;

interface Props {
  authId: number;
}

const WorkoutTemplatesPage = ({ authId }: Props) => {
  const Navigate = useNavigate();

  //number of workouts the user already has
  const location = useLocation();
  const numberOfWorkouts = location.state;
  console.log(numberOfWorkouts);

  const [templates, setTemplates] = useState<StandardizedWorkoutTemplate[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [dropdowns, setDropdowns] = useState<boolean[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const emptyWorkout = {
    workoutName: "New Workout " + (numberOfWorkouts + 1),
    weeks: 4,
    days: [1],
    exercises: [1],
    sets: [3],
    reps: [12],
    rest: [120],
  };

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

  useEffect(() => {
    const { request } = workoutTemplateService.getAll("");
    request
      .then((response) => {
        const workoutTemplates =
          response.data as unknown[] as WorkoutTemplate[];
        const standardTemplatesAndDropdowns =
          standardizeWorkoutTemplates(workoutTemplates);
        setTemplates(standardTemplatesAndDropdowns[0]);
        setDropdowns(standardTemplatesAndDropdowns[1]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const FlipDrop = (count: number) => {
    setTrigger(!trigger);
    dropdowns[count] = !dropdowns[count];
  };

  return (
    <>
      <BackButton>
        <Link to="/myworkouts">Back</Link>
      </BackButton>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {templates.map((item, count) => (
            <>
              <HeaderOne>{item.workoutName}</HeaderOne>
              <FlipButton onClick={() => FlipDrop(count)}>flip</FlipButton>
              {dropdowns[count] ? (
                <DropdownTable
                  item={item}
                  exercises={exercises}
                  numberOfWorkouts={numberOfWorkouts}
                />
              ) : (
                <StyledTable></StyledTable>
              )}
            </>
          ))}
          <CreateNewWorkoutDiv>
            <CreateNewWorkoutButton>
              <Link
                to="/customize"
                state={[emptyWorkout, exercises, numberOfWorkouts]}
              >
                Create From Scratch
              </Link>
            </CreateNewWorkoutButton>
          </CreateNewWorkoutDiv>
        </>
      )}
    </>
  );
};

export default WorkoutTemplatesPage;
