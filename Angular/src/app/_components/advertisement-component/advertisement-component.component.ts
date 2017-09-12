import { Component, OnInit } from '@angular/core';
import { Advertisement } from "./advertisement";
import { AdvertService } from "../../_services/advertisement.service";

@Component({
    selector: 'app-advertisement-component',
    templateUrl: './advertisement-component.component.html',
    styleUrls: ['./advertisement-component.component.css']
})
export class AdvertisementComponentComponent implements OnInit {

    advert: Advertisement;
    listAdverts: Advertisement[];

    constructor(public advertService: AdvertService) { }

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

}
