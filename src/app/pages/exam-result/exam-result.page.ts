import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import { Exam } from 'src/app/models/exam.model';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    public alertController: AlertController) { }

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
      console.log('hora do resultado');
      this.presentAlert();
      
    })
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
 

}
