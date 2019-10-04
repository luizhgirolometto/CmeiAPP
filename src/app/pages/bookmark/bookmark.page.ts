import { Component, OnInit } from "@angular/core";
import { ToastService } from "src/app/services/toast.service";
import { Quiz } from "src/app/models/quiz.model";

@Component({
  selector: "app-bookmark",
  templateUrl: "./bookmark.page.html",
  styleUrls: ["./bookmark.page.scss"]
})
export class BookmarkPage implements OnInit {
  quizes: Quiz[];
  noData: boolean = false;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.getQuizes();
  }

  getQuizes() {
    let saved = JSON.parse(localStorage.getItem("bookmarks"));
    this.quizes = saved;

    if (!this.quizes) {
      this.noData = true;
    }
  }

  doRefresh(event) {
    setTimeout(() => {
      this.quizes = null;
      this.getQuizes();
      event.target.complete();
    }, 500);
  }

  clear() {
    localStorage.removeItem("bookmarks");
    this.toastService.presentSimpleToast("All bookmarks cleared!");
    this.getQuizes();
  }
}
