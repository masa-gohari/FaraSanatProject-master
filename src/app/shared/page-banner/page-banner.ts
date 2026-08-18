import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-banner',
  imports: [RouterLink],
  templateUrl: './page-banner.html',
  styleUrl: './page-banner.scss',
})
export class PageBanner {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() image = 'img/farasanaat-logo.png';
}
