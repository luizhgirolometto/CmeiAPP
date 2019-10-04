import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { About } from "../models/about.model";
import { mapToModel } from "../shared/utils/app.mapper";

@Injectable({
  providedIn: "root"
})
export class HelperService {
  constructor(private db: AngularFireDatabase) {}

  /* ABOUT US */
  addAbout(about: About) {
    this.db.list(`about/`).push(about);
  }

  getAbout() {
    return mapToModel(this.db.list<About>(`about`).snapshotChanges());
  }

  updateAbout(about: About, key: string) {
    this.db.object(`about/${key}`).update(about);
  }
  /* ABOUT US */
}
