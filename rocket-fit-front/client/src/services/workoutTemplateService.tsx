import create from "./http-service";

export interface WorkoutTemplate {
  id: number;
  day: number;
  exercises: string;
  sets: number;
  reps: number;
  rest: number;
}

//.NET create
// export default create("/WorkoutsExercise");

//java create
export default create("/workouttemplate");
