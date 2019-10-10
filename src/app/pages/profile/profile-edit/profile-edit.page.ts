import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  profileForm: FormGroup;
  user: User;
  key: string;
  isLoading: boolean = true;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.key = this.authService.getCurrentUser().key
    this.getUserDetail();
  }

  createForm() {
    this.profileForm = new FormGroup({
      email: new FormControl(this.user.email),
      userName: new FormControl(this.user.userName),
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName)
    })
  }

  getUserDetail() {
    this.userService.get(this.key).subscribe(data => {
      this.user = new User();
      this.user = JSON.parse(JSON.stringify(data));
      this.createForm();
      this.isLoading = false;
    })
  }

  onProfileFormSubmit(values: any): void {
    this.userService.update(values, this.key);
    this.toastService.presentSimpleToast("Atualizado com sucesso!");
  }
}
