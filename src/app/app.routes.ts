import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Brass } from './brass/brass';
import { Copper } from './copper/copper';
import { Zinc } from './zinc/zinc';
import { Scrap } from './scrap/scrap';
import { WeightCalculation } from './weight-calculation/weight-calculation';
import { News } from './news/news';
import { AboutUs } from './about-us/about-us';
import { AssistWithUs } from './assist-with-us/assist-with-us';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'products/brass', component: Brass },
    { path: 'products/copper', component: Copper },
    { path: 'products/zinc', component: Zinc },
    { path: 'products/scrap', component: Scrap },
    { path: 'weight-calculation', component: WeightCalculation },
    { path: 'news', component: News },
    { path: 'about-us', component: AboutUs },
    { path: 'assist-with-us', component: AssistWithUs },
    { path: '**', redirectTo: 'home' }
];
