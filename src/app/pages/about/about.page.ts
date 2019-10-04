import { Component, OnInit } from "@angular/core";
import { About } from "src/app/models/about.model";
import { HelperService } from "src/app/services/helper.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.page.html",
  styleUrls: ["./about.page.scss"]
})
export class AboutPage implements OnInit {
  about: About;
  isLoading: boolean = true;
  constructor(private helperService: HelperService) {}

  ngOnInit() {
    this.getAbout();
  }

  getAbout() {
    this.helperService.getAbout().subscribe(data => {
      this.about = data[0];
      this.isLoading = false;
    });
  }
}
