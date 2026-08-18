import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { PageBanner } from '../shared/page-banner/page-banner';

interface Product {
  name: string;
  category: string;
  weight: number;
  price: number;
}

@Component({
  selector: 'app-weight-calculation',
  standalone: true,
  imports: [MatTableModule, MatSortModule,PageBanner],
  templateUrl: './weight-calculation.html',
  styleUrl: './weight-calculation.scss'
})
export class WeightCalculation implements AfterViewInit {
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
