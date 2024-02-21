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

//.NET create
// export default create("/WorkoutsExercise");

//java create
export default create("/workoutexercise");
