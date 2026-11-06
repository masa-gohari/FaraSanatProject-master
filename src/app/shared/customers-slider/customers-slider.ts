import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../translate.pipe';
import { TranslationService } from '../../services/translation.service';

interface CustomerLogo {
  name: string;
  image: string;
}

@Component({
  selector: 'app-customers-slider',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './customers-slider.html',
  styleUrl: './customers-slider.scss',
})
export class CustomersSlider {
  readonly translations = inject(TranslationService);

  readonly customers: CustomerLogo[] = [
    { name: 'Shouder', image: 'img/customers/shouder.png' },
    { name: 'Vatan Shemsh', image: 'img/customers/vatan-shemsh.png' },
    { name: 'Zard Shemshal', image: 'img/customers/zard-shemshal.png' },
    { name: 'Rasan', image: 'img/customers/rasan.png' },
  ];

}
