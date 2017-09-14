import { Component, OnInit, ViewChild } from '@angular/core';
import { Advertisement } from "./advertisement";
import { AdvertService } from "../../_services/advertisement.service";

import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ng2-facebook-sdk';
import { AuthResponse, InitParams } from 'ng2-facebook-sdk';



@Component({
    selector: 'app-advertisement-component',
    templateUrl: './advertisement-component.component.html',
    styleUrls: ['./advertisement-component.component.css']
})
export class AdvertisementComponentComponent implements OnInit {

    advert: Advertisement;
    listAdverts: Advertisement[];
    // @ViewChild('card') cardEl;

    constructor(public advertService: AdvertService, private fb: FacebookService) {
        const fbParams: InitParams = {
            appId: '1918180375122700',
            xfbml: true,
            cookie: true,
            version: 'v2.9'
        };
        this.fb.init(fbParams);
    }

    ngOnInit() {
        this.getAdvertisment();
    }

    public getAdvertisment() {
        this.advertService.getAdvertisements()
            .then((adverts) => this.listAdverts = adverts);
    }

    public getDetail(id: number) {
        this.advertService.getAdvertisementById(id)
            .then((advert) => this.advert = advert);
    }

      share() {

    const options: UIParams = {
      method: 'share',
      href: 'https://github.com/alekoh/Hire-Me'
    };

    this.fb.ui(options)
      .then((res: UIResponse) => {
        console.log('Got the users profile', res);
      })
      .catch(this.handleError);

  }

  private handleError(error) {
        console.error('Error processing action', error);
    }

}
