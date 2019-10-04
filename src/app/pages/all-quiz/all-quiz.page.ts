import { Component, OnInit } from "@angular/core";
import { Quiz } from "src/app/models/quiz.model";
import { QuizService } from "src/app/services/quiz.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-all-quiz",
  templateUrl: "./all-quiz.page.html",
  styleUrls: ["./all-quiz.page.scss"]
})
export class AllQuizPage implements OnInit {
  quizes: Quiz[];
  quizesReset: Quiz[];
  constructor(private quizService: QuizService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data["category"]) {
        this.getQuizesByCategory(data["category"]);
      }
      else this.getQuizes();
    })

  }

  getQuizes() {
    this.quizService.getAll().subscribe(data => {
      this.quizes = data;
      this.quizesReset = data;
    });
  }

  getQuizesByCategory(category: string) {
    this.quizService.getAllByCategory(category).subscribe(data => {
      this.quizes = data;
      this.quizesReset = data;
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.quizes = null;
      this.getQuizes();
      event.target.complete();
    }, 500);
  }

  filterQuiz(filter: any) {
    this.quizes = this.quizesReset;
    const val = filter.target.value;
    if (val && val.trim() != "") {
      this.quizes = this.quizes.filter(quiz => {
        return quiz.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  resetAllFilters() {
    this.getQuizes();
  }
}
