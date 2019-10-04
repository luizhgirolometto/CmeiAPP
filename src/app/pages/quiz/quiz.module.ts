import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { QuizPage } from "./quiz.page";
import { SharedModule } from "src/app/shared/shared.module";
import { CountdownTimerModule } from "ngx-countdown-timer";
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

const routes: Routes = [
  {
    path: "",
    component: QuizPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    CountdownTimerModule.forRoot()
  ],
  declarations: [QuizPage, ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent]
})
export class QuizPageModule { }
