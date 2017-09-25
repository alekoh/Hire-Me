import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {isUndefined} from "util";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

    // These numbers will vary according to the search criteria
    lat: number = 41.9973;
    lng: number = 21.4280;

    location: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.getCoordinates();
  }

  public getCoordinates() {
      this.route.queryParams
          .subscribe((params) => {
              this.location = params['location'];
          });

      if (!isUndefined(this.location)) {

          for (let coord in this.coordinates) {

              if (this.location === this.coordinates[coord].name){
                  this.lat =  this.coordinates[coord].lat;
                  this.lng = this.coordinates[coord].lng;
              }
          }
      }
  }

    coordinates = [
        {name: 'Berovo', lat: 41.7061, lng: 22.8552},
        {name: 'Bitola', lat: 41.0297, lng: 21.3292},
        {name: 'Bogdanci', lat: 41.2031, lng: 22.5754},
        {name: 'Valandovo', lat: 41.3170, lng: 22.5618},
        {name: 'Veles', lat: 41.7165, lng: 21.7723},
        {name: 'Vinica', lat: 41.8833, lng: 22.5081},
        {name: 'Gevgelija', lat: 41.1452, lng: 22.4997},
        {name: 'Gostivar', lat: 41.8026, lng: 20.9089},
        {name: 'Debar', lat: 41.5198, lng: 20.5289},
        {name: 'Delcevo', lat: 41.9709, lng: 22.7740},
        {name: 'Demir Kapija', lat: 41.4088, lng: 22.2436},
        {name: 'Demir Hisar', lat: 41.2214, lng: 21.2025},
        {name: 'Dojran', lat: 41.1811, lng: 22.7227},
        {name: 'Kavadarci', lat: 41.4329, lng: 22.0089},
        {name: 'Kicevo', lat: 41.5129, lng: 20.9525},
        {name: 'Kocani', lat: 41.9168, lng: 22.4083},
        {name: 'Kratovo', lat: 42.0800, lng: 22.1803},
        {name: 'Kriva Palanka', lat: 42.2058, lng: 22.3308},
        {name: 'Krusevo', lat: 41.3706, lng: 21.2502},
        {name: 'Kumanovo', lat: 42.1323, lng: 21.7257},
        {name: 'Makedonski Brod', lat: 41.6683, lng: 21.2368},
        {name: 'Makedonska Kamenica', lat: 42.0214, lng: 22.5871},
        {name: 'Negotino', lat: 41.4829, lng: 22.0923},
        {name: 'Ohrid', lat: 41.1231, lng: 20.8016},
        {name: 'Pehcevo', lat: 41.7621, lng: 22.8865},
        {name: 'Probistip', lat: 41.9948, lng: 22.1877},
        {name: 'Radovis', lat: 41.6395, lng: 22.4679},
        {name: 'Resen', lat: 41.0903, lng: 21.0133},
        {name: 'Sveti Nikole', lat: 41.8656, lng: 21.9373},
        {name: 'Skopje', lat: 41.9973, lng: 21.7280},
        {name: 'Stip', lat: 41.7464, lng: 22.1997},
        {name: 'Struga', lat: 41.1778, lng: 20.6783},
        {name: 'Strumica', lat: 41.4378, lng: 22.6427},
        {name: 'Tetovo', lat: 42.0069, lng: 20.9715}
    ];
}
