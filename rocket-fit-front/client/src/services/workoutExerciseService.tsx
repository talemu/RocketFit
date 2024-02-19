import create from "./http-service";

export interface Workout {
  id: number;
  days: string;
  exercises: string;
  sets: string;
  reps: string;
  rests: string;
  weeks: number;
  authID: number;
  workoutNumber: number;
}

//.NET create
// export default create("/WorkoutsExercise");

//java create
export default create("/workoutexercise");
