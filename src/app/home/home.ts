import { routes } from './../app.routes';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TgjuIndicator, TgjuService } from '../services/tgju.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Footer } from '../footer/footer';
import { AssistWithUs } from '../assist-with-us/assist-with-us';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer, AssistWithUs],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home implements OnInit {
  private tgjuService = inject(TgjuService);
  private productService = inject(ProductService);
  private router = inject(Router);
  products = this.productService.products;
  indicators = signal<TgjuIndicator[]>([]);
  isExpanded = signal<boolean>(false);
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

  goToWeightCalculation() {
    this.router.navigate(['/weight-calculation']);
  }
}
