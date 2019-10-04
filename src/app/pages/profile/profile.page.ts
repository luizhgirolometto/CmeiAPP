import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ExamService } from "src/app/services/exam.service";
import { Exam } from "src/app/models/exam.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  exams: Exam[];
  key: string;
  email: string;
  isLoading: boolean = true;
  constructor(
    private authService: AuthService,
    private examService: ExamService
  ) {}

  ngOnInit() {
    this.key = this.authService.getCurrentUser().key;
    this.email = this.authService.getCurrentUser().email;
    this.getUserExams();
  }

  getUserExams() {
    this.examService.getAllByUsers(this.key).subscribe(data => {
      this.exams = data.reverse();
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
