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

const HeaderOne = styled.h1``;

const HeaderTwo = styled.h2``;

const StyledTable = styled.table``;

const TableBody = styled.tbody``;

const TableHeader = styled.th`
  padding: 1em 2em;
`;

const TableColumn = styled.td`
  text-align: center;
`;

const TableRecord = styled.tr``;

const TableHead = styled.thead``;

const FlipButton = styled.button``;

const CustomizeButton = styled.button``;

const BackButton = styled.button``;

interface Props {
  authId: number;
}

const WorkoutTemplatesPage = ({ authId }: Props) => {
  const Navigate = useNavigate();

  //number of workouts the user already has
  const location = useLocation();
  const numberOfWorkouts = location.state;

  const [templates, setTemplates] = useState<StandardizedWorkoutTemplate[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [dropdowns, setDropdowns] = useState<boolean[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);
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
                <>
                  <HeaderTwo>{item.weeks} Weeks</HeaderTwo>
                  <StyledTable>
                    <TableHead>
                      <TableRecord>
                        <TableHeader>Day</TableHeader>
                        <TableHeader>Exercise</TableHeader>
                        <TableHeader>Sets</TableHeader>
                        <TableHeader>Reps</TableHeader>
                        <TableHeader>Rest</TableHeader>
                      </TableRecord>
                    </TableHead>
                    {item.days.map((day, count) => (
                      <>
                        <TableBody>
                          <TableRecord>
                            {item.days[count] !== item.days[count - 1] ? (
                              <TableColumn>{day}</TableColumn>
                            ) : (
                              <TableColumn></TableColumn>
                            )}

                            {
                              <TableColumn>
                                {
                                  exercises.find(
                                    (element: Exercise) =>
                                      element.exerciseId ===
                                      item.exercises[count]
                                  )?.exerciseName
                                }
                              </TableColumn>
                            }
                            {<TableColumn>{item.sets[count]}</TableColumn>}
                            {<TableColumn>{item.reps[count]}</TableColumn>}
                            {<TableColumn>{item.rest[count]}</TableColumn>}
                          </TableRecord>
                        </TableBody>
                      </>
                    ))}
                  </StyledTable>
                  <CustomizeButton>
                    <Link
                      to="/customize"
                      state={[item, exercises, numberOfWorkouts]}
                    >
                      {" "}
                      Customize Workout{" "}
                    </Link>
                  </CustomizeButton>
                </>
              ) : (
                <StyledTable></StyledTable>
              )}
            </>
          ))}
        </>
      )}
    </>
  );
};

export default WorkoutTemplatesPage;
