import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TgjuService, TgjuIndicator } from '../services/tgju.service';
import { PageBanner } from '../shared/page-banner/page-banner';

@Component({
  selector: 'app-article',
  imports: [CommonModule,PageBanner],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class ArticleComponent {
    private tgjuService = inject(TgjuService);
  indicators = signal<TgjuIndicator[]>([]);

  ngOnInit(): void {
    this.tgjuService.getIndicators().subscribe(data => {
      this.indicators.set(data);
    });
  }
}
