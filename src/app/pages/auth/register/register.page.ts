import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user.model";
import { ToastService } from "src/app/services/toast.service";
import { Router } from "@angular/router";
import {
  matchingPasswords,
  emailValidator
} from "src/app/shared/utils/app-validators";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group(
      {
        email: ["", Validators.compose([Validators.required, emailValidator])],
        password: [
          "",
          Validators.compose([Validators.required, Validators.minLength(6)])
        ],
        confirmPassword: ["", Validators.required]
      },
      { validator: matchingPasswords("password", "confirmPassword") }
    );
  }

  onRegisterFormSubmit(values: Object): void {
    if (this.registerForm.valid) {
      this.register(values as User);
    }
  }

  register(user: User) {
    this.authService.register(user);
    this.toastService.presentSimpleToast("Registrado com sucesso!");
    this.router.navigate(["auth/login"]);
  }
}
