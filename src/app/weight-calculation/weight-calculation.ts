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
    this.form.get('selectedSegmentTypeId')?.valueChanges.subscribe(() => {
      this.weightDisplay = null; // یا '' (رشته خالی)
      this.weight = null;
      this.showError = false;
      this.showErrorTypeofSegment = false;
    });
  }

  get selectedSegmentTypeId(): string {
    return this.form.get('selectedSegmentTypeId')?.value;
  }

  buildFrom() {
    this.form = this.fb.group({
      selectedSegmentTypeId: ['', Validators.required],
      lengthSegment: ['', Validators.required],
      density: [8.5, Validators.required],
      numberBranches: [1, Validators.required],
      diameteRoundBar: [''],
      squareSide: [''],
      rectWidth: [''],
      rectHight: [''],
      wrenchFlatsHex: [''],
      innerDiameter: [''],
      outerDiameter: [''],
      wrenchFlatsCircle: [''],
      diameterHexCircle: [''],
    });

  }

  private toPersianDigits(str: string): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.replace(/\d/g, d => persianDigits[+d]);
  }

  private parseNumber(val: any): number {
    if (val === null || val === undefined || String(val).trim() === '') return NaN;
    const cleanedVal = String(val).replace(/[\/]/g, '.').replace(/,/g, '');
    return Number(cleanedVal);
  }
  calculateWeight() {
    const formValues = this.form.getRawValue();

    this.showErrorTypeofSegment = false;
    this.showError = false;

    if (!formValues.selectedSegmentTypeId) {
      this.showErrorTypeofSegment = true;
      return;
    } else {
      this.showErrorTypeofSegment = false;
    }
    if (!formValues.numberBranches || !formValues.density || !formValues.lengthSegment) {
      this.showError = true;
      return
    } else {
      this.showError = false;
    }

    // میلگرد - دایره
    if (formValues.selectedSegmentTypeId == 'round_bar') {
      const d = this.parseNumber(formValues.diameteRoundBar);
      if (isNaN(d) || d <= 0) {
        this.showError = true;
        return;
      }
      this.area = ((Math.PI * (Math.pow(d, 2))) / 4);
    }
    // چهارپهلو (مربع)
    if (formValues.selectedSegmentTypeId == 'square_bar') {
      const s = this.parseNumber(formValues.squareSide);
      if (isNaN(s) || s <= 0) {
        this.showError = true;
        return;
      }
      this.area = (Math.pow(s, 2));
    }
    // چهارپهلو (مستطیل)
    if (formValues.selectedSegmentTypeId == 'rect_bar') {
      const w = this.parseNumber(formValues.rectWidth);
      const h = this.parseNumber(formValues.rectHight);
      if (isNaN(w) || w <= 0 || isNaN(h) || h <= 0) {
        this.showError = true;
        return;
      }
      this.area = (w * h);
    }
    // شش‌پر (شش‌ضلعی)
    if (formValues.selectedSegmentTypeId == 'hex_bar') {
      const f = this.parseNumber(formValues.wrenchFlatsHex);
      if (isNaN(f) || f <= 0) {
        this.showError = true;
        return;
      }
      this.area = (0.866 * (Math.pow(f, 2)));
    }

    //  لوله (دایره در دایره)
    if (formValues.selectedSegmentTypeId == 'pipe_circle_in_circle') {
      const D = this.parseNumber(formValues.outerDiameter);
      const d = this.parseNumber(formValues.innerDiameter);
      if (isNaN(D) || D <= 0 || isNaN(d) || d <= 0) {
        this.showError = true;
        return;
      }
      this.area = (Math.PI / 4) * ((Math.pow(D, 2) - Math.pow(d, 2)));
    }

    // دایره در شش‌ضلعی
    if (formValues.selectedSegmentTypeId == 'circle_in_hex') {


      const d = this.parseNumber(formValues.diameterHexCircle);
      const f = this.parseNumber(formValues.wrenchFlatsCircle);
      if (isNaN(d) || d <= 0 || isNaN(f) || f <= 0) {
        this.showError = true;
        return;
      }
      this.area = (0.866 * (Math.pow(f, 2))) - (((Math.PI) * (Math.pow(d, 2))) / 4);
    }

    this.weight = (formValues.numberBranches * formValues.density * formValues.lengthSegment * this.area) / 1000000;
    const formattedNumber = this.weight.toLocaleString('en-US', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    });
    this.weightDisplay = this.toPersianDigits(formattedNumber.replace('.', '/'));

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
