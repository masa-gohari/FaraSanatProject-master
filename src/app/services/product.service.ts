import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/products';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private productsList = signal<Product[]>([
        {
            id: 'zinc',
            nameFa: 'روی',
            image: 'img/zinc.jpg',
            accentColor: '#848789'
        },
        {
            id: 'copper',
            nameFa: 'مس',
            image: 'img/copper.png',
            accentColor: '#b87333'
        },
        {
            id: 'brass',
            nameFa: 'برنج',
            image: 'img/brass.jpg',
            accentColor: '#b5a642'
        },
        {
            id: 'scrap',
            nameFa: 'ضایعات',
            image: 'img/scrap.jpg',
            accentColor: '#e67e22'
        }
    ]);

    get products() {
        return this.productsList.asReadonly();
    }
}
