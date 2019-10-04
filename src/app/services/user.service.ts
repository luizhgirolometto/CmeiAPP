import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { mapToModel } from "../shared/utils/app.mapper";
import { User } from "firebase";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private db: AngularFireDatabase) { }

  add(user: User) {
    this.db.list(`users/`).push(user);
  }

  get(key: string) {
    return this.db.object<User>(`users/${key}`).valueChanges();
  }

  getAll() {
    return mapToModel(this.db.list<User>("/users").snapshotChanges());
  }

  update(user: User, key: string) {
    this.db.object(`users/${key}`).update(user);
  }

  delete(key: string) {
    this.db.object(`users/${key}`).remove();
  }
}
