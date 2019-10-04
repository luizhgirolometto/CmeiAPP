import { Quiz } from './quiz.model';

export class Exam {
  key?: string;
  userKey: string;
  quiz: Quiz;
  correct: number;
  mistake: number;
  unanswered: number;
  insertDate: string;
}
