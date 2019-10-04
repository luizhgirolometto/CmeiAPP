import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Language } from "../models/language.model";
import { mapToModel } from "../shared/utils/app.mapper";

@Injectable({
  providedIn: "root"
})
export class LanguageService {
  constructor(private db: AngularFireDatabase) {}

  add(language: Language) {
    this.db.list(`languages/`).push(language);
  }

  get(key: string) {
    return this.db.object<Language>(`languages/${key}`).valueChanges();
  }

  getAll() {
    return mapToModel(
      this.db
        .list<Language>(`languages`, ref => ref.orderByChild("name"))
        .snapshotChanges()
    );
  }

  getActives() {
    return mapToModel(
      this.db
        .list<Language>("/languages", ref =>
          ref.orderByChild("status").equalTo(true)
        )
        .snapshotChanges()
    );
  }

  update(language: Language, key: string) {
    this.db.object(`languages/${key}`).update(language);
  }

  delete(key: string) {
    this.db.object(`languages/${key}`).remove();
  }
}
