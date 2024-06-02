import create from "./http-service";

export interface ExerciseRecord {
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
  targetWeight: number;
  createdDate: string;
  workoutNumber: number;
  day: number;
}

//.NET create
// export default create("/WorkoutsExercise");

//java create
export default create("/exerciserecord");
