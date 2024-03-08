import create from "./http-service";

export interface Exercise {
  exerciseName: string;
  exerciseId: number;
}

export default create("/exercise");
