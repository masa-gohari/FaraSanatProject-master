import { Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { TgjuIndicator, TgjuService } from '../services/tgju.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true, // اطمینان حاصل کنید برای انگولار ۱۷ این خط باشد
  imports: [Navbar, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {



    private tgjuService = inject(TgjuService);
  indicators = signal<TgjuIndicator[]>([]);


  // home.ts


  ngOnInit(): void {
    this.tgjuService.getIndicators().subscribe(data => {
      this.indicators.set(data);
    });
  }

}
