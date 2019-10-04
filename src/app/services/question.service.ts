import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { mapToModel } from "../shared/utils/app.mapper";
import { Question } from "../models/question.model";

@Injectable({
  providedIn: "root"
})
export class QuestionService {
  constructor(private db: AngularFireDatabase) {}

  add(quizKey: string, question: Question) {
    this.db.list(`quizes/${quizKey}/questions/`).push(question);
  }

  get(quizKey: string, key: string) {
    return this.db
      .object<Question>(`quizes/${quizKey}/questions/${key}`)
      .valueChanges();
  }

  getAll(quizKey: string) {
    return mapToModel(
      this.db.list<Question>(`/quizes/${quizKey}/questions`).snapshotChanges()
    );
  }

  update(question: Question, quizKey: string, key: string) {
    this.db.object(`quizes/${quizKey}/questions/${key}`).update(question);
  }

  delete(quizKey: string, key: string) {
    this.db.object(`quizes/${quizKey}/questions/${key}`).remove();
  }
}
