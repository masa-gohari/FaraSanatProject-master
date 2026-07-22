import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TgjuService, TgjuIndicator } from '../services/tgju.service';

@Component({
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News {
    private tgjuService = inject(TgjuService);
  indicators = signal<TgjuIndicator[]>([]);

  ngOnInit(): void {
    this.tgjuService.getIndicators().subscribe(data => {
      this.indicators.set(data);
    });
  }
}
