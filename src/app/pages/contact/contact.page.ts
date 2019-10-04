import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contactForm: FormGroup;
  subjects: any[] = [
    { name: 'Suggest' },
    { name: 'Report' },
    { name: 'Support' }
  ];
  constructor(private formBuilder: FormBuilder,
    private contactService: ContactService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.contactForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required]),
      subject: new FormControl("", [Validators.required]),
      content: new FormControl("", [Validators.required])
    })
  }

  onContactFormSubmit(values: any): void {
    if (this.contactForm.valid) {
      this.contactService.add(values);
      this.toastService.presentSimpleToast("Message sent successfully!");
      this.resetForm();
    }
  }

  resetForm() {
    this.contactForm.reset();
  }

}
