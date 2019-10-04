import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { User } from '../models/user.model';
import { mapToModel } from '../shared/utils/app.mapper';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private toastService: ToastService
  ) {
    var user = localStorage.getItem("currentUser");
    if (user) {
      this.loggedIn.next(true);
    }
  }

  logIn(email: string) {
    return mapToModel(
      this.db
        .list<User>("/users", ref =>
          ref.orderByChild("email").equalTo(email)
        )
        .snapshotChanges()
    )
  }

  setLogged(user: User) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.loggedIn.next(true);
    this.router.navigate(["/home"]);
    this.toastService.presentSimpleToast("You were entered successfully!");
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  public get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  register(user: User) {
    this.db.list(`users/`).push(user);
  }

  async logOut() {
    // await this.afAuth.auth.signOut();
    localStorage.removeItem("currentUser");
    this.loggedIn.next(false);
    this.router.navigate(["/"]);
    this.toastService.presentSimpleToast("Successfully logged out!");
  }
}
