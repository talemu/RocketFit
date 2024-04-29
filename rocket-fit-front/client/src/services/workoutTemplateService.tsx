import create from "./http-service";

export interface WorkoutTemplate {
  workoutName: string;
  days: string;
  exercises: string;
  sets: string;
  reps: string;
  rest: string;
  weeks: number;
}

export interface StandardizedWorkoutTemplate {
  workoutName: string;
  days: number[];
  exercises: number[];
  sets: number[];
  reps: number[];
  rest: number[];
  weeks: number;
}

export const standardizeWorkoutTemplates = (item: WorkoutTemplate[]) => {
  let newTemplates: any[] = [];
  let newDropdowns: any[] = [];

  item.forEach((element) => {
    const standardWT = {
      workoutName: element.workoutName,
      days: [-1],
      exercises: [-1],
      sets: [-1],
      reps: [-1],
      rest: [-1],
      weeks: element.weeks,
    };
    standardWT.days = element.days.split(",").map((item) => parseInt(item, 10));
    standardWT.exercises = element.exercises
      .split(",")
      .map((item) => parseInt(item, 10));
    standardWT.sets = element.sets.split(",").map((item) => parseInt(item, 10));
    standardWT.reps = element.reps.split(",").map((item) => parseInt(item, 10));
    standardWT.rest = element.rest.split(",").map((item) => parseInt(item, 10));
    newTemplates = [...newTemplates, standardWT];
    newDropdowns = [...newDropdowns, false];
  });
  return [newTemplates, newDropdowns];
};

//.NET create
// export default create("/WorkoutsExercise");

//java create
export default create("/workouttemplate");
