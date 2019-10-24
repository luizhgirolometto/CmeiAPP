import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import { Exam } from 'src/app/models/exam.model';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ResultsPage } from 'src/app/modal/results/results.page';



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
    private examService: ExamService,
    public alertController: AlertController,
    public modalCtrl: ModalController) { 
      

    }

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
      var soma = (this.exam.correct * 100) / (this.exam.correct + this.exam.unanswered + this.exam.mistake);
      console.log(soma);
      this.modalPage(soma);
      
    })
  }
 
  async modalPage ( soma: number) {

    const modal = await this.modalCtrl.create({
      component: ResultsPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        'results': soma,
      }
    });
    return await modal.present();
  }
 

}
