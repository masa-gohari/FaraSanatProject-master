import { Component } from '@angular/core';
import { PageBanner } from '../shared/page-banner/page-banner';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
export interface ProductItem {
  id: string;
  title: string;
  image: string;
  nature: string;       // ماهیت محصول
  production: string;   // روش تولید
  keyPoints: string[];  // ویژگی‌ها / کاربردها
}

@Component({
  selector: 'app-brass',
  standalone: true,
  imports: [PageBanner, CommonModule,Footer],
  templateUrl: './brass.html',
  styleUrl: './brass.scss',
})

export class Brass {
    // ذخیره وضعیت باز/بسته بودن هر کارد با شناسه اختصاصی
  expandedCards: { [key: string]: boolean } = {};

  products: ProductItem[] = [
    {
      id: 'round-bar',
      title: 'میلگرد برنجی',
      image: 'img/brass-round.png',
      nature: 'مقاطع توپر استوانه‌ای با ماشین‌کاری عالی و مقاومت به سایش.',
      production: 'اکستروژن گرم و کشش سرد دقیق، آنیل تنش‌زدایی.',
      keyPoints: [
        'آلیاژهای خوش‌تراش (MS58 / C36000) و فورج‌پذیر',
        'تولید قطعات تراشکاری دقیق، شیرآلات و اتصالات فشار قوی',
        'دقت ابعادی و صیقلی بودن سطح بیرونی'
      ]
    },
    {
      id: 'pipe',
      title: 'لوله برنجی',
      image: 'img/brass-tube.png',
      nature: 'مقاطع توخالی بدون درز (Seamless) با مقاومت در برابر خوردگی.',
      production: 'اکستروژن گرم و کشش بر روی سمبه جهت کنترل ضخامت.',
      keyPoints: [
        'لوله بدون درز آلیاژهای C26000 و C27000',
        'کاربرد در مبدل‌های حرارتی، رادیاتور و کندانسورها',
        'استفاده در دکوراسیون و تجهیزات تاسیساتی'
      ]
    },
    {
      id: 'hex',
      title: 'شش‌گوش برنجی',
      image: 'img/brass-hex.jpg',
      nature: 'مقاطع شش‌ضلعی منظم، بهینه‌شده برای قطعه‌سازی و اتصالات آچارخور.',
      production: 'اکستروژن و سایزینگ سرد با تلرانس ابعادی بسیار دقیق.',
      keyPoints: [
        'مناسب تولید پیچ، مهره، بوشن و مغزی اتصالات',
        'سهولت در بستن با آچارهای استاندارد صنعتی',
        'کیفیت تراش بالا بدون پرزدهی فلز'
      ]
    },
    {
      id: 'square',
      title: 'چهارگوش برنجی',
      image: 'img/brass-square.jpg',
      nature: 'مقاطع چهارگوش و تخت توپر با گوشه‌های تیز یا لبه‌گرد.',
      production: 'اکستروژن گرم و نورد/کشش دقیق سرد.',
      keyPoints: [
        'مناسب شینه‌کشی تابلو برق و اتصال‌دهنده‌های الکتریکی',
        'کاربرد در قالب‌سازی، قفل‌سازی و ابزار دقیق',
        'استحکام مکانیکی بالا و سطح تمیز'
      ]
    },
    {
      id: 'parts',
      title: 'قطعات برنجی',
      image: 'img/brass-parts.jpg',
      nature: 'انواع قطعات فورج‌شده و ماشین‌کاری‌شده نهایی طبق نقشه.',
      production: 'فورج گرم دقیق، ماشین‌کاری CNC و عملیات سطحی.',
      keyPoints: [
        'بدنه شیرآلات ساختمانی و صنعتی گاز و آب',
        'اتصالات رزوه شده و مغزی‌های هیدرولیکی',
        'تحمل فشار کاری و مقاومت به خوردگی اتمسفری'
      ]
    },
    {
      id: 'billet',
      title: 'بلیت برنجی',
      image: 'img/brass-billet.png',
      nature: 'ماده اولیه ریخته‌گری پیوسته برای صنایع اکستروژن و فورج.',
      production: 'ذوب شمش/قراضه و ریخته‌گری پیوسته (Continuous Casting).',
      keyPoints: [
        'تضمین آنالیز شیمیایی یکنواخت و بدون حباب و مک',
        'قطرهای استاندارد متناسب با پرس‌های اکستروژن',
        'انواع آلیاژهای سرب‌دار و بدون سرب'
      ]
    }
  ];

  toggleCard(id: string): void {
    this.expandedCards[id] = !this.expandedCards[id];
  }
 }
