import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { Metal, Metals } from '../model/metals.model';

@Component({
  selector: 'app-weight-calculation',
  standalone: true,
  imports: [MatTableModule, MatSortModule, PageBanner, CommonModule,
    FormsModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatRadioModule, ReactiveFormsModule,
    MatSelectModule,],
  templateUrl: './weight-calculation.html',
  styleUrl: './weight-calculation.scss'
})

export class WeightCalculation implements OnInit {
  categories: SectionCategory[] = [];
  metals: Metal[] = Metals;
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
      this.weightDisplay = null;
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
      diameterRoundBar: [''],
      squareSide: [''],
      rectWidth: [''],
      rectHeight: [''],
      wrenchFlatsHex: [''],
      innerDiameter: [''],
      outerDiameter: [''],
      wrenchFlatsCircle: [''],
      diameterHexCircle: [''],
      squareSideCircle: [''],
      innerDiameterCircle: [''],
      diameterHexInCircle: [''],
      wrenchFlatsHexInCircle: [''],
      innerWrenchFlats: [''],
      outerWrenchFlats: [''],
      wallThickness: [''],
      outerSide: [''],
      outerWidth: [''],
      outerHeight: [''],
      wallThicknessRect: [''],
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
      const d = this.parseNumber(formValues.diameterRoundBar);
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
      const h = this.parseNumber(formValues.rectHeight);
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
    // دایره در مربع
    if (formValues.selectedSegmentTypeId == 'circle_in_square') {
      const a = this.parseNumber(formValues.squareSideCircle);
      const d = this.parseNumber(formValues.innerDiameterCircle);
      if (isNaN(a) || a <= 0 || isNaN(d) || d <= 0) {
        this.showError = true;
        return;
      }
      this.area = ((Math.pow(a, 2))) - (((Math.PI) * (Math.pow(d, 2))) / 4);
    }
    // شش‌ضلعی در دایره
    if (formValues.selectedSegmentTypeId == 'hex_in_circle') {
      const D = this.parseNumber(formValues.diameterHexInCircle);
      const f = this.parseNumber(formValues.wrenchFlatsHexInCircle);
      if (isNaN(D) || D <= 0 || isNaN(f) || f <= 0) {
        this.showError = true;
        return;
      }
      this.area = (((Math.PI) * (Math.pow(D, 2))) / 4) - (0.866 * (Math.pow(f, 2)));
    }
    // شش‌ضلعی در شش‌ضلعی
    if (formValues.selectedSegmentTypeId == 'hex_in_hex') {
      const F = this.parseNumber(formValues.outerWrenchFlats);
      const f = this.parseNumber(formValues.innerWrenchFlats);
      if (isNaN(F) || F <= 0 || isNaN(f) || f <= 0) {
        this.showError = true;
        return;
      }

      this.area = (0.866 * ((Math.pow(F, 2)) - (Math.pow(f, 2))));
    }
    // قوطی پروفیل (مربع در مربع)
    if (formValues.selectedSegmentTypeId == 'square_pipe') {
      const t = this.parseNumber(formValues.wallThickness);
      const A = this.parseNumber(formValues.outerSide);
      if (isNaN(A) || A <= 0 || isNaN(t) || t <= 0) {
        this.showError = true;
        return;
      }

      this.area = Math.pow(A, 2) - Math.pow(A - 2 * t, 2);
    }
    // قوطی پروفیل (مستطیل در مستطیل)
    if (formValues.selectedSegmentTypeId == 'rect_pipe') {
      const t = this.parseNumber(formValues.wallThicknessRect);
      const H = this.parseNumber(formValues.outerHeight);
      const W = this.parseNumber(formValues.outerWidth);
      if (isNaN(H) || H <= 0 || isNaN(W) || W <= 0 || isNaN(t) || t <= 0) {
        this.showError = true;
        return;
      }
      this.area = (W * H) - ((W - (2 * t)) * (H - (2 * t)))
    }

    this.weight = (formValues.numberBranches * formValues.density * formValues.lengthSegment * this.area) / 1000000;
    const formattedNumber = this.weight.toLocaleString('en-US', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    });
    this.weightDisplay = this.toPersianDigits(formattedNumber.replace('.', '/'));

  }


}
