import { Component, inject, OnInit, signal } from '@angular/core';
import { TgjuIndicator, TgjuService } from '../services/tgju.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Map } from '../map/map';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactMessage } from '../model/contact.model';
import { ContactService } from '../services/contact.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, Map, ReactiveFormsModule],
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

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
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
      role: ['buyer'] // مقدار پیش‌فرض
    });
  }

  get f() { return this.form.controls }

  submit() {
    const formValues = this.form.value;

    const fullNameValue = formValues.fullName?.trim();
    const mobileValue = formValues.mobile?.trim();

    if (!fullNameValue) {
      this.toastr.warning('لطفاً نام و نام خانوادگی خود را وارد کنید',);
      return;
    }

    if (!mobileValue) {
      this.toastr.warning('لطفاً شماره موبایل خود را وارد کنید',);
      return;
    }

    const isBuyer = formValues.role === 'buyer';
    this.contactModel = {
      fullName: fullNameValue,
      mobile: mobileValue,
      role: isBuyer
    };

    this.contactService.sendMessage(this.contactModel).subscribe((q: any) => {
      if (q.isSuccess) {
        this.toastr.success(q.message)
      } else {
        this.toastr.error(q.message)
      }
    })
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
