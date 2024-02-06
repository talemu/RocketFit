import create from "./http-service";

export interface WorkoutTemplate {
  workoutTemplateID: number;
  workoutName: string;
  day: string;
  exercises: string;
  sets: string;
  reps: string;
  rest: string;
}

export interface StandardizedWorkoutTemplate {
  workoutTemplateID: number;
  workoutName: string;
  day: number[];
  exercises: number[];
  sets: number[];
  reps: number[];
  rest: number[];
}

//.NET create
// export default create("/WorkoutsExercise");

//java create
export default create("/workouttemplate");
