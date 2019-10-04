import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./pages/auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  { path: "home", loadChildren: "./pages/home/home.module#HomePageModule" },
  {
    path: "quiz/:quizKey/:userKey",
    loadChildren: "./pages/quiz/quiz.module#QuizPageModule"
  },
  {
    path: "all-quiz/:category",
    loadChildren: "./pages/all-quiz/all-quiz.module#AllQuizPageModule"
  },
  { path: "about", loadChildren: "./pages/about/about.module#AboutPageModule" },
  {
    path: "contact",
    loadChildren: "./pages/contact/contact.module#ContactPageModule"
  },
  {
    path: "bookmark",
    loadChildren: "./pages/bookmark/bookmark.module#BookmarkPageModule"
  },
  {
    path: "quiz-detail/:quizKey",
    loadChildren: "./pages/quiz-detail/quiz-detail.module#QuizDetailPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "auth/login",
    loadChildren: "./pages/auth/login/login.module#LoginPageModule"
  },
  {
    path: "auth/register",
    loadChildren: "./pages/auth/register/register.module#RegisterPageModule"
  },
  {
    path: "profile",
    loadChildren: "./pages/profile/profile.module#ProfilePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "category",
    loadChildren: "./pages/category/category.module#CategoryPageModule"
  },
  {
    path: "profile-edit",
    loadChildren:
      "./pages/profile/profile-edit/profile-edit.module#ProfileEditPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "exam-result/:key",
    loadChildren: "./pages/exam-result/exam-result.module#ExamResultPageModule",
    canActivate: [AuthGuard]
  },
  { path: "term", loadChildren: "./pages/term/term.module#TermPageModule" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
