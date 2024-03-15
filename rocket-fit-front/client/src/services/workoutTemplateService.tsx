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

//.NET create
// export default create("/WorkoutsExercise");

//java create
export default create("/workouttemplate");
