import {
  AfterViewInit,
  Component,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import Map from '@neshan-maps-platform/ol/Map';
import View from '@neshan-maps-platform/ol/View';
import { fromLonLat } from '@neshan-maps-platform/ol/proj';
import Feature from '@neshan-maps-platform/ol/Feature';
import Point from '@neshan-maps-platform/ol/geom/Point';
import { Style, Icon } from '@neshan-maps-platform/ol/style';
import { Vector as VectorSource } from '@neshan-maps-platform/ol/source';
import { Vector as VectorLayer } from '@neshan-maps-platform/ol/layer';
import { defaults as defaultControls } from '@neshan-maps-platform/ol/control';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements AfterViewInit {
  map!: Map;

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  private initMap(): void {
    const longitude = 51.1272;
    const latitude = 35.6956;
    const coordinates = fromLonLat([longitude, latitude]);

    this.map = new Map({
      target: 'map',
      key: 'web.ad57ecce78694ea6aa953905352cbc05',
      mapType: 'dreamy',
      controls: defaultControls({
        attribution: false
      }),
      view: new View({
        center: coordinates,
        zoom: 17
      })
    });

    const marker = new Feature({
      geometry: new Point(coordinates)
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'img/marker.png',
          scale: 0.9
        })
      })
    );

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker]
      })
    });

    this.map.addLayer(vectorLayer);

    this.map.on('pointermove', (event) => {
      const pixel = this.map.getEventPixel(event.originalEvent);
      const hit = this.map.hasFeatureAtPixel(pixel);
      this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });

    this.map.on('click', (event) => {
      const markerPixel = this.map.getPixelFromCoordinate(coordinates);

      const offsetX = event.pixel[0] - markerPixel[0];
      const offsetY = event.pixel[1] - markerPixel[1];

      const isMarkerClicked = Math.sqrt(offsetX * offsetX + offsetY * offsetY) <= 30;

      if (isMarkerClicked) {
        this.openNeshanMap();
      }
    });

    setTimeout(() => {
      this.map.updateSize();
    }, 300);
  }

  private openNeshanMap(): void {
    const url ="https://neshan.org/maps/places/_bvgT0Vxx1WS#c35.698-51.130-15z-0p"
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
