import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Category } from "../models/category.model";
import { mapToModel } from "../shared/utils/app.mapper";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  add(category: Category) {
    this.db.list(`categories/`).push(category);
  }

  get(key: string) {
    return this.db.object<Category>(`categories/${key}`).valueChanges();
  }

  getAll() {
    return mapToModel(this.db.list<Category>("/categories").snapshotChanges());
  }

  getActives() {
    return mapToModel(
      this.db
        .list<Category>("/categories", ref =>
          ref.orderByChild("status").equalTo(true)
        )
        .snapshotChanges()
    );
  }

  update(category: Category, key: string) {
    this.db.object(`categories/${key}`).update(category);
  }

  delete(key: string) {
    this.db.object(`categories/${key}`).remove();
  }
}
