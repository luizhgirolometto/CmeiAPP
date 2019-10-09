import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { ToastService } from "src/app/services/toast.service";
import { emailValidator } from "src/app/shared/utils/app-validators";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, emailValidator])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  onLoginFormSubmit(values: Object): void {
    if (this.loginForm.valid) {
      this.login(values["email"], values["password"]);
    }
  }

  login(email: string, password: string) {
    this.authService.logIn(email).subscribe(data => {
      if (data[0].password == password) {
        data[0].password = "";
        this.authService.setLogged(data[0] as User);
      } else
        this.toastService.presentSimpleToast("Senha ou e-mail incorretos");
    });
  }
}
