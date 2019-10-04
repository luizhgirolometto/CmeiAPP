import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { HomePage } from "./home.page";
import { SharedModule } from "src/app/shared/shared.module";
import { CategoriesComponent } from "src/app/shared/components/categories/categories.component";

const routes: Routes = [
  {
    path: "",
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [HomePage, CategoriesComponent],
  exports: [CategoriesComponent]
})
export class HomePageModule {}
