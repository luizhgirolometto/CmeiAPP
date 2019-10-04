import { Question } from "./question.model";

export class Quiz {
  key?: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  language: string;
  status: boolean;
  insertDate: string;
  examCount: number;
  questions: Question[];  
}
