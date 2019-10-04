import { Injectable } from "@angular/core";
import { Contact } from "../models/contact.model";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  constructor(private db: AngularFireDatabase) {}

  add(contact: Contact) {
    this.db.list(`contacts/`).push(contact);
  }
}
