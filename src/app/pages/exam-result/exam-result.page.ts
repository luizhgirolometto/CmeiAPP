import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import { Exam } from 'src/app/models/exam.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.page.html',
  styleUrls: ['./exam-result.page.scss'],
})
export class ExamResultPage implements OnInit {
  exam: Exam;
  isLoading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data["key"]) {
        this.getExamResult(data["key"]);
      }
    })
  }

  getExamResult(key: string) {
    this.examService.get(key).subscribe(data => {
      this.exam = data;
      this.isLoading = false;
    })
  }
}
