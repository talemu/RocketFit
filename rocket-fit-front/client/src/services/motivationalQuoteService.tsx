import create from "./http-service";

export interface MotivationalQuote {
  quote: string;
  author: string;
}

export default create("/motivationalquote");
