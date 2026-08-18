// tgju.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TgjuIndicator {
  id: number;
  item_id: number;
  market_id: number;
  name: string;
  category_id: string;
  title: string;
  slug: string;
  p: string;         // قیمت فعلی (رشته متنی)
  h: string;         // بالاترین قیمت
  l: string;         // پایین‌ترین قیمت
  o: string;
  d: string;
  dp: number;
  dt: string | null;
  prices: any;
  t: string;         // تاریخ شمسی بروزرسانی (مثلا ۲۹ تیر)
  updated_at: string;
}

export interface TgjuResponse {
  response: {
    indicators: TgjuIndicator[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class TgjuService {
  private http = inject(HttpClient);
  
  private apiUrl = 'https://api.tgju.org/v1/widget/tmp?keys=239617,131419,239614,239616,239615';

  getIndicators(): Observable<TgjuIndicator[]> {
    return this.http.get<TgjuResponse>(this.apiUrl).pipe(
      map(res => res.response.indicators)
    );
  }
}
