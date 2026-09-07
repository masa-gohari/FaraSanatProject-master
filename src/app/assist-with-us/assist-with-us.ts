import { Component, inject } from '@angular/core';
import { PageBanner } from '../shared/page-banner/page-banner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContactMessage } from '../model/contact.model';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-assist-with-us',
  imports: [PageBanner, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatRadioModule, ReactiveFormsModule, FormsModule],
  templateUrl: './assist-with-us.html',
  styleUrl: './assist-with-us.scss',
})
export class AssistWithUs {
  private contactService = inject(ContactService);
  form!: FormGroup;
  contactModel!: ContactMessage;
  users = [
    { label: 'تولید کننده', value: 'producer' },
    { label: 'مصرف کننده', value: 'consumer' }
  ];
  showErrorName: boolean = false;
  showErrorMobile: boolean = false;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.buildFrom()
  }

  buildFrom() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^09\d{9}$/)]],
      userType: ['consumer', Validators.required],
    });
  }

  get f() { return this.form.controls }

  submit() {
    const formValues = this.form.getRawValue();

    const fullNameValue = (formValues.fullName ?? '').trim();
    const mobileValue = (formValues.mobile ?? '').trim();
    const userType = formValues.userType;

    this.showErrorName = false;
    this.showErrorMobile = false;

    if (!fullNameValue) {
      this.showErrorName = true;
      return;
    } else {
      this.showErrorName = false;
    }

    if (!mobileValue) {
      this.showErrorMobile = true;
      return;
    } else {
      this.showErrorMobile = false;
    }

    if (userType !== 'seller' && userType !== 'buyer') {
      this.snackBar.open('نوع کاربری را انتخاب نمایید.', '', {
        duration: 3000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.contactModel = {
      fullName: fullNameValue,
      mobile: mobileValue,
      userType: userType
    };

    console.log(this.contactModel);

    this.contactService.sendMessage(this.contactModel).subscribe((q: any) => {
      if (q.isSuccess) {
        // پیام موفقیت
      } else {
        // پیام خطا
      }
    });
  }


}
