import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { PageBanner } from '../shared/page-banner/page-banner';
import { SectionCategory } from '../model/metal-profile.model';
import { MetalCalculatorService } from '../services/metal-calculator.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  imports: [MatTableModule, MatSortModule,PageBanner,CommonModule, 
    FormsModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatRadioModule, ReactiveFormsModule,
    MatSelectModule,],
  templateUrl: './weight-calculation.html',
  styleUrl: './weight-calculation.scss'
})
export class WeightCalculation implements AfterViewInit {

 diameter: number = 0;
  categories: SectionCategory[] = [];
  selectedSectionId: string = '';

  constructor(private metalService: MetalCalculatorService) {}

  ngOnInit(): void {
    this.metalService.getSections().subscribe(data => {
      this.categories = data;
    });
  }

   onSectionChange(event: any): void {
    // اگر لازم است، مقدار جدید را مدیریت کنید
    // مقدار انتخاب شده در event.value یا این کلاس با selectedSectionId همخوانی دارد
    console.log('selected', this.selectedSectionId);
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
