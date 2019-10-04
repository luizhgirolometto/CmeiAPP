import { Injectable } from "@angular/core";
import { mapToModel } from "../shared/utils/app.mapper";
import { AngularFireDatabase } from "@angular/fire/database";
import { Exam } from '../models/exam.model';

@Injectable({
  providedIn: "root"
})
export class ExamService {
  constructor(private db: AngularFireDatabase) { }

  add(exam: Exam) {
    return this.db.list(`exams/`).push(exam);
  }

  get(key: string) {
    return this.db.object<Exam>(`exams/${key}`).valueChanges();
  }

  getAll() {
    return mapToModel(
      this.db
        .list<Exam>(`exams`, ref => ref.orderByChild("username"))
        .snapshotChanges()
    );
  }

  getAllByUsers(userKey: string) {
    return mapToModel(
      this.db
        .list<Exam>(`exams`, ref => ref.orderByChild("userKey").equalTo(userKey))
        .snapshotChanges()
    );
  }

  update(exam: Exam, key: string) {
    this.db.object(`exams/${key}`).update(exam);
  }

  delete(key: string) {
    this.db.object(`exams/${key}`).remove();
  }
}
