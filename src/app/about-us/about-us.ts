import { Component } from '@angular/core';
import { PageBanner } from '../shared/page-banner/page-banner';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-about-us',
  imports: [PageBanner,Footer],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {}
