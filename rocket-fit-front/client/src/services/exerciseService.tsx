import create from "./http-service";

export interface Exercise {
  exerciseName: string;
  exerciseID: number;
}

export default create("/exercises");
