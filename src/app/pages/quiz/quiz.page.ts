import { Component, OnInit } from "@angular/core";
import { Question } from "src/app/models/question.model";
import { QuizService } from "src/app/services/quiz.service";
import { QuestionService } from "src/app/services/question.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Quiz } from "src/app/models/quiz.model";
import { ExamService } from 'src/app/services/exam.service';
import { Exam } from 'src/app/models/exam.model';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material';
import { ToastService } from 'src/app/services/toast.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.page.html",
  styleUrls: ["./quiz.page.scss"]
})
export class QuizPage implements OnInit {
  questions: Question[];
  quiz: Quiz;
  exam: Exam;
  quizKey: string;
  userKey: string;
  duration: any;
  isLoading: boolean = true;
  correct: number = 0;
  mistake: number = 0;
  unanswered: number = 0;

  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private dialog: MatDialog,
    private router: Router,
    private toastService: ToastService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data["quizKey"] && data["userKey"]) {
        this.getQuestions(data["quizKey"]);
        this.getQuiz(data["quizKey"]);
        this.quizKey = data["quizKey"];
        this.userKey = data["userKey"];
        this.isLoading = false;
      }
    });
  }

  getQuestions(quizKey) {
    this.questionService.getAll(quizKey).subscribe(data => {
      this.questions = data;
    });
  }

  getQuiz(quizKey) {
    this.quizService.get(quizKey).subscribe(data => {
      this.quiz = data;
      this.duration = new Date().setMinutes(
        new Date().getMinutes() + parseInt(this.quiz.duration.toString())
      );
     this.resetForm();
     console.log('getquiz caiu aqui');
    });
  }

   timeOut() {
   alert("Fim do tempo!");
   }
  

  confirm() {
    this.correct = 0;
    this.mistake = 0;
    this.unanswered = 0;
    this.checkAnswers();
    this.quiz.questions = this.questions;
    this.exam = {
      quiz: this.quiz,
      userKey: this.userKey,
      correct: this.correct,
      mistake: this.mistake,
      unanswered: this.unanswered,
      insertDate: new Date().toISOString(),
    };
    let examKey = this.examService.add(this.exam).key;
    this.router.navigateByUrl(`exam-result/${examKey}`);
    this.incrementQuiz();
    console.log('confirmação');
  }

  checkAnswers() {
    this.questions.forEach(element => {
      if (element.answered == element.answerRight && element.answered != '') this.correct++;
      if (element.answered != element.answerRight && element.answered != '') this.mistake++;
      if (element.answered == '') this.unanswered++;
    });
  }

  incrementQuiz() {
    console.log('incrementar');
    this.quiz.examCount++;
    this.quizService.update(this.quiz, this.quizKey);
  }

  openDialog() {
    console.log('finalizando');
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirm();
        this.toastService.presentSimpleToast("Sucesso Terminou!");
      }
    });
  }

  resetForm() {
    console.log('resetform');
    this.questions.forEach(element => {
      element.answered = "";
    })
  }
}
