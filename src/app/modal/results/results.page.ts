import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  @Input() results: number; 

  constructor(private modalCtrl: ModalController,
    navParams: NavParams) { 

      console.log(navParams.get('results'));
    }

  ngOnInit() {
  }

}
