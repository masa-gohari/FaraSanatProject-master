import { Component, inject, OnInit, signal } from '@angular/core';
import { TgjuIndicator, TgjuService } from '../services/tgju.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Map } from '../map/map';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink,Map],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home implements OnInit {
  private tgjuService = inject(TgjuService);
  private productService = inject(ProductService);
  products = this.productService.products;
  indicators = signal<TgjuIndicator[]>([]);  isExpanded = signal<boolean>(false);
  linkUrl = 'https://www.tgju.org/';

  ngOnInit(): void {
    this.tgjuService.getIndicators().subscribe(data => {
      this.indicators.set(data);
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
