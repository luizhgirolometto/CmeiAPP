import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { Category } from "src/app/models/category.model";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  @Output("category") category: EventEmitter<string> = new EventEmitter();
  default: string = "all";
  isLoading: boolean = true;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
      this.isLoading = false;
    });
  }

  filterbyCategory(category) {
    this.category.emit(category);
  }
}
