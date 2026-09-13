import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageBanner } from '../shared/page-banner/page-banner';
import { Footer } from '../footer/footer';

export interface ZincProduct {
  id: string;
  title: string;
  image: string;
  nature: string;
  production: string;
  keyPoints: string[];
}

@Component({
  selector: 'zinc',
  standalone: true,
  imports: [CommonModule, PageBanner ,Footer],
  templateUrl: './zinc.html',
  styleUrls: ['./zinc.scss']
})
export class Zinc {
  expandedCards: { [key: string]: boolean } = {};

  products: ZincProduct[] = [
    {
      id: 'zinc-shg',
      title: 'شمش روی SHG (خلوص فوق‌العاده بالا)',
      image: 'img/zinc-shg.jpg',
      nature: 'شمش روی گرید فوق‌خالص (Special High Grade) با حداقل خلوص ۹۹.۹۹۵٪ و درصد ناخالصی بسیار ناچیز آهن، سرب و کادمیم مطابق استاندارد بین‌المللی ASTM B6.',
      production: 'فرآیند هیدرومتالورژی و الکترووینینگ (لیچینگ، تصفیه محلول سولفات روی، الکترولیز و ذوب و قالب‌ریزی شمش در کوره‌های القایی).',
      keyPoints: [
        'خوراک اصلی در صنایع تولید آلیاژهای پیشرفته زاماک (Zamak) و قطعات دایکست تحت فشار',
        'ماده اولیه ممتاز برای گالوانیزاسیون پیوسته ورق‌های فولادی خودرویی و لوازم خانگی حساس',
        'تولید اکسید روی با گرید دارویی، بهداشتی و کاتالیست‌های شیمیایی دقیق',
        'شکل‌پذیری و جریان‌پذیری عالی مذاب بدون ایجاد تردی یا حباب در ریخته‌گری دقیق'
      ]
    },
    {
      id: 'zinc-hg',
      title: 'شمش روی HG (خلوص بالا)',
      image: 'img/zinc-hg.jpg',
      nature: 'شمش روی گرید خالص (High Grade) با درجه خلوص حداقل ۹۹.۹۵٪، دارای مقاومت به خوردگی و خواص مکانیکی بسیار مطلوب.',
      production: 'تولید از طریق فرآیند الکترولیتیک با مراحل خالص‌سازی کنترل‌شده یا بازیافت و تصفیه پیشرفته خاک و کنسانتره روی.',
      keyPoints: [
        'کاربرد گسترده در خطوط گالوانیزه گرم لوله‌ها، پروفیل‌ها، نبشی‌ها و سازه‌های صنعتی',
        'ماده اولیه اصلی برای تولید آلیاژهای برنج (ترکیب با مس) و برنزهای پایه روی',
        'تولید ورق و صفحات روی جهت محافظت کاتدی و باتری‌سازی',
        'تعادل عالی میان قیمت اقتصادی و کیفیت عملکردی در صنایع پوشش‌دهی فلزات'
      ]
    },
    {
      id: 'zinc-standard',
      title: 'شمش روی (گرید عمومی و بازیافتی)',
      image: 'img/zinc-standard.jpg',
      nature: 'شمش روی صنعتی استاندارد (Good Ordinary Brand - GOB) با خلوص ۹۸.۵٪ الی ۹۹.۵٪، شامل مقادیر کنترل‌شده سرب جهت افزایش سیالیت مذاب.',
      production: 'فرآیند پیرومتالورژی (کوره‌های قالکاری و تقطیر) یا بازیافت شلاکه و سرباره‌های خطوط گالوانیزه و ذوب مجدد.',
      keyPoints: [
        'گالوانیزاسیون عمومی قطعات ضخیم فولادی، گاردریل‌ها، تیرهای برق و پایه‌های روشنایی',
        'تولید ترکیبات شیمیایی غیردارویی نظیر سولفات روی کشاورزی و اکسید روی صنعتی (صنایع لاستیک و کاشی)',
        'ساخت آندهای فداشونده روی جهت حفاظت کاتدی اسکله‌ها، بدنه کشتی‌ها و لوله‌های مدفون',
        'کاهش هزینه‌های تمام‌شده تولید در پروژه‌های عمرانی و ساختمانی با بازدهی بالا'
      ]
    }
  ];

  toggleCard(id: string): void {
    this.expandedCards[id] = !this.expandedCards[id];
  }
}
