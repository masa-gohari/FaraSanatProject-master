import { routes } from './../app.routes';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TgjuIndicator, TgjuService } from '../services/tgju.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Footer } from '../footer/footer';
import { AssistWithUs } from '../assist-with-us/assist-with-us';
import { TranslatePipe } from '../shared/translate.pipe';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer, AssistWithUs, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home implements OnInit {
  private tgjuService = inject(TgjuService);
  private productService = inject(ProductService);
  private router = inject(Router);
  private translations = inject(TranslationService);
  products = this.productService.products;
  localizedProducts = computed(() => this.products().map(product => ({
    ...product,
    displayName: this.translations.translateHomeProduct(product.id, product.nameFa),
  })));
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

  downloadCatalog() {
    const link = document.createElement('a');
    link.href = '/pdf/FaraSanat.pdf';
    link.download = 'FaraSanat.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
