import { Component, OnInit } from "@angular/core";
import { QuizService } from "src/app/services/quiz.service";
import { Quiz } from "src/app/models/quiz.model";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  isLoading: boolean = true;
  quizes: Quiz[];

  constructor(private quizService: QuizService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getQuizes();
  }

  getQuizes() {
    this.quizService.getTop().subscribe(data => {
      this.quizes = data.reverse();
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.quizes = null;
      this.getQuizes();
      event.target.complete();
    }, 500);
  }

  getSelectedCategory(event) {
    if (event == "all") {
      this.router.navigateByUrl(`/all-quiz/`);
      return;
    }
    this.router.navigateByUrl(`/all-quiz/${event}`);
  }
}
