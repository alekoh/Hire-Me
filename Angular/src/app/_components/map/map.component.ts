import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

    // These numbers will vary according to the search criteria
    lat: number = 41.9973;
    lng: number = 21.4280;


  constructor() { }

  ngOnInit() {


  }

}
