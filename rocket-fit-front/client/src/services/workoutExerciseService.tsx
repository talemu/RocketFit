import create from "./http-service";

export interface Workout {
  workoutExerciseID: number;
  days: string;
  exercises: string;
  sets: string;
  reps: string;
  rest: string;
  weeks: number;
  authID: number;
  workoutNumber: number;
  workoutName: string;
}

export interface StandardizedWorkoutExercise {
  workoutTemplateID: number;
  workoutName: string;
  day: number[];
  exercises: number[];
  sets: number[];
  reps: number[];
  rest: number[];
  weeks: number;
}

export interface WorkoutItem {
  day: number;
  exercise: number;
  sets: number;
  reps: number;
  rest: number;
}

//Standardizing the Workout Exercise data from string to and array of
export const StandardizeWorkouts = (item: Workout, week: number) => {
  const standardWE = {
    workoutTemplateID: item.workoutExerciseID,
    workoutName: item.workoutName,
    day: [-1],
    exercises: [-1],
    sets: [-1],
    reps: [-1],
    rest: [-1],
    weeks: item.weeks,
  };
  standardWE.day = item.days
    .split(",")
    .map((element) => parseInt(element, 10) + (week - 1) * 7);
  standardWE.exercises = item.exercises
    .split(",")
    .map((item) => parseInt(item, 10));
  standardWE.sets = item.sets
    .split(",")
    .map((element) => parseInt(element, 10));
  standardWE.reps = item.reps
    .split(",")
    .map((element) => parseInt(element, 10));
  standardWE.rest = item.rest
    .split(",")
    .map((element) => parseInt(element, 10));
  return MapStandardWEToWorkoutItems(standardWE);
};

const MapStandardWEToWorkoutItems = (
  StandardWE: StandardizedWorkoutExercise
) => {
  const newWorkoutItems = StandardWE.day.map(
    (_item: number, index: number) => ({
      day: StandardWE.day[index],
      exercise: StandardWE.exercises[index],
      sets: StandardWE.sets[index],
      reps: StandardWE.reps[index],
      rest: StandardWE.rest[index],
    })
  );
  return newWorkoutItems;
};

//.NET create
// export default create("/WorkoutsExercise");

//java create
export default create("/workoutexercise");
