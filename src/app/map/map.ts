import {
  AfterViewInit,
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare const L: any;

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);

  private map: any;

  // مختصات دقیق از روی لینک نشان شما (گلشید شهرقدس)
  readonly lat = 35.696;
  readonly lng = 51.133;
  readonly zoom = 15;

  readonly neshanLink =
    'https://neshan.org/maps/places/_bvgT0Vxx1WS#c35.696-51.133-15z-0p';

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // زمان‌بندی برای اطمینان از قرارگیری کامل HTML در صفحه
    setTimeout(() => {
      this.initMap();
    }, 200);

    this.destroyRef.onDestroy(() => {
      if (this.map) {
        this.map.remove();
      }
    });
  }

  private initMap(): void {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    if (this.map) {
      this.map.remove();
    }

    // ساخت نقشه با تنظیمات استاندارد نشان
    this.map = new L.Map('map', {
      key: 'service.db1282032ae54a68b91504ddae46749c', // کلید API شما
      maptype: 'neshan-default', // استاندارد نقشه نشان
      poi: true,
      traffic: false,
      center: [this.lat, this.lng],
      zoom: this.zoom,
    });

    // افزودن مارکر
    const marker = L.marker([this.lat, this.lng]).addTo(this.map);

    marker
      .bindPopup(
        `
        <div style="direction: rtl; text-align: right; font-family: Vazir, sans-serif; padding: 4px;">
          <strong style="color: #f26522; font-size: 14px;">گروه صنعتی فراصنعت</strong><br>
        </div>
        `
      )
      .openPopup();
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
        this.map.setView([this.lat, this.lng], this.zoom);
      }
    }, 500);
  }
}
