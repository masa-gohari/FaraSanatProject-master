import { Component, inject, OnInit, signal } from '@angular/core';
import { TgjuIndicator, TgjuService } from '../services/tgju.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactMessage } from '../model/contact.model';
import { ContactService } from '../services/contact.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer, ReactiveFormsModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatRadioModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home implements OnInit {
  private tgjuService = inject(TgjuService);
  private contactService = inject(ContactService);
  private productService = inject(ProductService);
  products = this.productService.products;
  indicators = signal<TgjuIndicator[]>([]);
  isExpanded = signal<boolean>(false);
  form!: FormGroup;
  linkUrl = 'https://www.tgju.org/';
  contactModel!: ContactMessage;
  users = [
    { label: 'تولید کننده', value: 'producer' },
    { label: 'مصرف کننده', value: 'consumer' }
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.buildFrom()
  }

  ngOnInit(): void {
    this.tgjuService.getIndicators().subscribe(data => {
      this.indicators.set(data);
    });
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

  if (!fullNameValue) {
    this.snackBar.open('نام و نام‌خانوادگی را وارد نمایید.', '', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
    return;
  }

  if (!mobileValue) {
    this.snackBar.open('شماره موبایل خود را وارد نمایید.', '', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
    return;
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


  expand() {
    this.isExpanded.set(true);
  }

  collapse() {
    this.isExpanded.set(false);
  }

  toggle() {
    this.isExpanded.update(val => !val);
  }
}
