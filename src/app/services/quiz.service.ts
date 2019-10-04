import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Quiz } from "../models/quiz.model";
import { mapToModel } from "../shared/utils/app.mapper";

@Injectable({
  providedIn: "root"
})
export class QuizService {
  constructor(private db: AngularFireDatabase) { }

  add(quiz: Quiz) {
    this.db.list(`quizes/`).push(quiz);
  }

  get(key: string) {
    return this.db.object<Quiz>(`quizes/${key}`).valueChanges();
  }

  getAll() {
    return mapToModel(
      this.db.list<Quiz>(`quizes`, ref => ref.orderByChild("title")).snapshotChanges()
    );
  }

  getTop() {
    return mapToModel(
      this.db.list<Quiz>(`quizes`, ref => ref.orderByChild("examCount")).snapshotChanges()
    );
  }

  getAllByCategory(category: string) {
    return mapToModel(
      this.db.list<Quiz>(`quizes`, ref => ref.orderByChild("category").equalTo(category)).snapshotChanges()
    );
  }

  update(quiz: Quiz, key: string) {
    this.db.object(`quizes/${key}`).update(quiz);
  }

  delete(key: string) {
    this.db.object(`quizes/${key}`).remove();
  }
}
