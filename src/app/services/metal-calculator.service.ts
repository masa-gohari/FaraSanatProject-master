import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SectionCategory } from '../model/metal-profile.model';


@Injectable({
  providedIn: 'root'
})
export class MetalCalculatorService {

  private profileSections: SectionCategory[] = [
    {
      category: '-- مقاطع تو پر --',
      items: [
        { id: 'round_bar', title: 'میلگرد (دایره)' },
        { id: 'square_bar', title: 'چهارپهلو (مربع)' },
        { id: 'rect_bar', title: 'چهارپهلو (مستطیل)' },
        { id: 'hex_bar', title: 'شش‌پر (شش‌ضلعی)' }
      ]
    },
    {
      category: '-- مقاطع تو خالی --',
      items: [
        { id: 'pipe_circle_in_circle', title: 'لوله (دایره در دایره)' },
        { id: 'circle_in_hex', title: 'دایره در شش‌ضلعی' },
        { id: 'circle_in_square', title: 'دایره در مربع' },
        { id: 'hex_in_circle', title: 'شش‌ضلعی در دایره' },
        { id: 'hex_in_hex', title: 'شش‌ضلعی در شش‌ضلعی' },
        { id: 'square_pipe', title: 'قوطی پروفیل (مربع در مربع)' },
        { id: 'rect_pipe', title: 'قوطی پروفیل (مستطیل در مستطیل)' }
      ]
    }
  ];

  // متد دریافت لیست مقاطع
  getSections(): Observable<SectionCategory[]> {
    // از of استفاده می‌کنیم تا ساختار شبیه کال‌های واقعی Observable باشد
    return of(this.profileSections);
  }
}
