import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { QuizService } from "src/app/services/quiz.service";
import { Quiz } from "src/app/models/quiz.model";
import { ToastService } from "src/app/services/toast.service";
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: "app-quiz-detail",
  templateUrl: "./quiz-detail.page.html",
  styleUrls: ["./quiz-detail.page.scss"]
})
export class QuizDetailPage implements OnInit {
  quiz: Quiz;
  quizKey: string;
  userKey: string;
  isLoading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private toastService: ToastService,
    private authService: AuthService,
    private shareService: ShareService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data["quizKey"]) {
        this.getQuiz(data["quizKey"]);
        this.quizKey = data["quizKey"];
        this.userKey = this.authService.getCurrentUser().key;
      }
    });
  }

  getQuiz(quizKey) {
    this.quizService.get(quizKey).subscribe(data => {
      this.quiz = data;
      this.isLoading = false;
    });
  }

  addBookmark() {
    let arr = [];
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    if (bookmarks) {
      arr = bookmarks;
      if (arr.filter(v => v.key == this.quizKey).length > 0) {
        this.toastService.presentSimpleToast("Quiz já marcado como favorito!");
        return;
      }
    }
    this.quiz.key = this.quizKey;
    arr.push(this.quiz);
    localStorage.setItem("bookmarks", JSON.stringify(arr));
    this.toastService.presentSimpleToast("Adicionado com sucesso!");
  }

  share() {
    this.shareService.share(this.quiz.title, "EQuiz");
  }
}
