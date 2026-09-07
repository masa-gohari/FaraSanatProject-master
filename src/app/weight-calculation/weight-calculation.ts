import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { PageBanner } from '../shared/page-banner/page-banner';
import { SectionCategory } from '../model/metal-profile.model';
import { MetalCalculatorService } from '../services/metal-calculator.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select'

interface Product {
  name: string;
  category: string;
  weight: number;
  price: number;
}

@Component({
  selector: 'app-weight-calculation',
  standalone: true,
  imports: [MatTableModule, MatSortModule, PageBanner, CommonModule,
    FormsModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatRadioModule, ReactiveFormsModule,
    MatSelectModule,],
  templateUrl: './weight-calculation.html',
  styleUrl: './weight-calculation.scss'
})
export class WeightCalculation implements AfterViewInit {
  categories: SectionCategory[] = [];
  area: any;
  weightDisplay: any;
  weight: any;
  showErrorTypeofSegment: boolean = false;
  showError: boolean = false;
  form!: FormGroup;

  constructor(private metalService: MetalCalculatorService, private fb: FormBuilder) { this.buildFrom() }

  ngOnInit(): void {
    this.metalService.getSections().subscribe(data => {
      this.categories = data;
    });
  }
  // دسترسی سریع به مقدار کنترل انتخاب شده
  get selectedSegmentTypeId(): string {
    return this.form.get('selectedSegmentTypeId')?.value;
  }


  buildFrom() {
    this.form = this.fb.group({
      selectedSegmentTypeId: ['', Validators.required],
      diameteRoundBar: ['', Validators.required],
      lengthSegment: ['', Validators.required],
      density: [8.5, Validators.required],
      numberBranches: [1, Validators.required],
    });
  }

  get f() { return this.form.controls }
  calculateWeight() {
    const formValues = this.form.getRawValue();

    // ۱. ریست کردن وضعیت خطاها در ابتدای متد
    this.showErrorTypeofSegment = false;
    this.showError = false;

    // ۲. بررسی انتخاب نوع مقطع
    if (!formValues.selectedSegmentTypeId) {
      this.showErrorTypeofSegment = true;
      return;
    } else {
      this.showErrorTypeofSegment = false;
    }
    if (!formValues.diameteRoundBar || !formValues.numberBranches || !formValues.density || !formValues.lengthSegment) {
      this.showError = true;
      return
    } else {
      this.showError = false;
    }

   if (formValues.selectedSegmentTypeId == 'round_bar') {
      this.area = ((Math.PI * formValues.diameteRoundBar * formValues.diameteRoundBar) / 4);
      this.weight = (formValues.numberBranches * formValues.density * formValues.lengthSegment * this.area) / 1000000;
      this.weightDisplay = this.weight.toFixed(4).replace('.', '/');
    }
  }




  displayedColumns = ['name', 'category', 'weight', 'price'];

  dataSource = new MatTableDataSource<Product>([
    {
      name: 'مس',
      category: 'مقاطع فلزی',
      weight: 6,
      price: 3
    },
    {
      name: 'برنج',
      category: 'مقاطع فلزی',
      weight: 7,
      price: 4
    },
    {
      name: 'روی',
      category: 'فلزات',
      weight: 8,
      price: 5
    }
  ]);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    // برای مرتب‌سازی عددی صحیح
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'weight') {
        return item.weight;
      }

      if (property === 'price') {
        return item.price;
      }

      return item[property as keyof Product] as string;
    };
  }
}
