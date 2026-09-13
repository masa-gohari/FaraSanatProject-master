import { Component } from '@angular/core';
import { PageBanner } from '../shared/page-banner/page-banner';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
export interface CopperProduct {
  id: string;
  title: string;
  image: string;
  nature: string;       // ماهیت محصول
  production: string;   // روش تولید
  keyPoints: string[];  // دسته‌بندی و کاربردهای کلیدی
}
@Component({
  selector: 'app-copper',
  imports: [PageBanner,CommonModule,Footer],
  templateUrl: './copper.html',
  styleUrl: './copper.scss',
})
export class Copper {
  expandedCards: { [key: string]: boolean } = {};

  products: CopperProduct[] = [
    {
      id: 'billet',
      title: 'بلیت مسی',
      image: 'img/Billet.jpg',
      nature: 'مقطع نیمه‌ساخته (محصول میانی) توپر، معمولاً به شکل استوانه‌ای (گرد) یا چهارگوش، با خلوص بالای ۹۹.۹٪ مس.',
      production: 'ذوب مس کاتد در کوره و انجماد در قالب‌های ریخته‌گری پیوسته (Continuous Casting).',
      keyPoints: [
        'خوراک اصلی صنایع اکستروژن جهت تولید لوله، شینه، میلگرد و پروفیل‌های مسی',
        'ماده اولیه خطوط نورد و فورج برای تولید مقاطع صنعتی خاص',
        'تضمین ساختار متالورژیکی یکنواخت، عاری از هرگونه مک، حباب و ترک سطحی',
        'هدایت الکتریکی و حرارتی حداکثری به دلیل آنالیز دقیق شمش کاتد اولیه'
      ]
    },
    {
      id: 'sections',
      title: 'مقاطع مسی',
      image: 'img/CopperSections.png',
      nature: 'انواع پروفیل‌ها، شینه‌ها، تسمه‌ها، میلگردها، لوله‌ها و مقاطع هندسی توپر و توخالی استاندارد و سفارشی با درصد خلوص بالای مس.',
      production: 'فرآیند اکستروژن گرم (Hot Extrusion)، کشش سرد (Cold Drawing) و فرم‌دهی نهایی از بلیت مسی با کنترل دقیق ابعادی.',
      keyPoints: [
        'شینه‌ها و تسمه‌های مسی: انتقال جریان در تابلوهای برق، پست‌های توزیع و سوییچ‌گیرها',
        'لوله‌های مسی: سیستم‌های سرمایشی، گرمایشی (HVAC)، کندانسورها و مبدل‌های حرارتی',
        'میلگرد و چهارگوش مسی: قطعه‌سازی، صنایع الکتروتکنیک و ساخت الکترودهای جوشکاری',
        'مقاومت فوق‌العاده در برابر خوردگی و قابلیت شکل‌پذیری و جوشکاری عالی'
      ]
    },
    {
      id: 'wire',
      title: 'مفتول مسی',
      image: 'img/WireRod.png',
      nature: 'رشته‌های پیوسته و کلاف‌شده مسی با قطر استاندارد (معمولاً ۸ میلی‌متر) و خلوص بسیار بالا (۹۹.۹۹٪ مس الکترولیتی درجه ETP یا OFHC).',
      production: 'ذوب کاتد مسی و فرآیند ریخته‌گری و نورد پیوسته پی‌درپی (Continuous Casting and Rolling - CCR) به همراه آنیل و شستشوی سطحی برای حذف اکسیدها.',
      keyPoints: [
        'مفتول ETP (اکسیژن کنترل‌شده): پرکاربردترین گرید برای تولید انواع سیم و کابل‌های ساختمانی و صنعتی',
        'مفتول OFHC (بدون اکسیژن): بالاترین درجه هدایت و انعطاف، مناسب صنایع صوتی و تصویری پیشرفته و الکترونیک حساس',
        'صنایع سیم و کابل (تولید هادی‌های برق فشار ضعیف، متوسط و قوی)',
        'ساخت سیم‌های لاکی (مگنت وایر) برای الکتروموتورها، ترانسفورماتورها و پمپ‌ها',
        'سیستم‌های ارتینگ و صاعقه‌گیر ساختمانی و صنعتی'
      ]
    }
  ];

  toggleCard(id: string): void {
    this.expandedCards[id] = !this.expandedCards[id];
  }
}
