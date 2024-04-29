import create from "./http-service";

export interface Exercise {
  exerciseName: string;
  exerciseId: number;
}

export interface ExerciseData {
  exerciseId: number;
  sets: number;
  reps: number;
  rest: number;
}

export default create("/exercise");
