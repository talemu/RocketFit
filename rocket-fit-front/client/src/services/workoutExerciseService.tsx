import create from "./http-service";

export interface Workout {
  id: number;
  day: number;
  exercise: string;
  sets: number;
  reps: number;
  rest: number;
  weight: number;
  authID: number;
}

//.NET create
// export default create("/WorkoutsExercise");

//java create
export default create("/workoutexercise/async");
