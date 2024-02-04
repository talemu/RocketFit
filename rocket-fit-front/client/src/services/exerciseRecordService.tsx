import create from "./http-service";

export interface ExerciseRecord {
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
}

//.NET create
// export default create("/WorkoutsExercise");

//java create
export default create("/exerciserecord");
