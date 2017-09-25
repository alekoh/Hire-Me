import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Advertisement } from "./advertisement";
import { AdvertService } from "../../_services/advertisement.service";

import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ng2-facebook-sdk';
import { AuthResponse, InitParams } from 'ng2-facebook-sdk';
import {ActivatedRoute, Router} from "@angular/router";
import {isNull, isUndefined} from "util";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-advertisement-component',
    templateUrl: './advertisement-component.component.html',
    styleUrls: ['./advertisement-component.component.css']
})
export class AdvertisementComponentComponent implements OnInit {

    advert: Advertisement;
    listAdverts: Advertisement[];

    private location;
    private jobType;

    jobTypeAgain: string;
    cityCtrl: FormControl;
    filteredCities: any;
    posts: any;



    constructor(public advertService: AdvertService, private fb: FacebookService, private route: ActivatedRoute, private router: Router) {
        this.cityCtrl = new FormControl();
        this.filteredCities = this.cityCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterCities(name));

        const fbParams: InitParams = {
            appId: '286283965207399',
            xfbml: true,
            cookie: true,
            version: 'v2.9'
        };
        this.fb.init(fbParams);
    }

    ngOnInit() {

        this.searchFilterChange();
    }

    searchFilterChange() {
        this.route.queryParams
            .subscribe(params => {
                this.location = params['location'];
                this.jobType = params['jobType'];
            });

        if (isUndefined(this.jobType)) {
            if (isUndefined(this.location)) {
                this.getAdvertisement();
            } else {
                this.getAdvertisementByLocation(this.location);
            }
        } else {
            this.getAdvertisementByJobType(this.jobType);
        }
    }

    public getAdvertisement() {
        this.advertService.getAdvertisements()
            .then((adverts) => this.listAdverts = adverts);
    }

    public getAdvertisementByLocation(location: string) {
        this.advertService.getAdvertisementByLocation(location)
            .then((adverts) => this.listAdverts = adverts);
    }

    public getAdvertisementByJobType(jobType: string) {
        this.advertService.getAdvertisementByJobType(jobType)
            .then((adverts) => this.listAdverts = adverts);
    }

    public getDetail(id: number) {
        this.advertService.getAdvertisementById(id)
            .then((advert) => this.advert = advert);
    }

    filterCities(val: string) {
        return val ? this.cities.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
            : this.cities;
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

    search() {
        console.log(this.jobType + " " + this.cityCtrl.value);

        let location = this.cityCtrl.value;
        let jobType = this.jobType;

        if (isUndefined(jobType) || jobType === '') {
            if (isNull(location) || location === '') {
                this.getAdvertisement();
            } else {
                this.getAdvertisementByLocation(location);
            }
        } else {
            this.getAdvertisementByJobType(jobType);
        }
    }

    cities = [
        'Berovo',
        'Bitola',
        'Bogdanci',
        'Valandovo',
        'Veles',
        'Vinica',
        'Gevgelija',
        'Gostivar',
        'Debar',
        'Delcevo',
        'Demir Kapija',
        'Demir Hisar',
        'Dojran',
        'Kavadarci',
        'Kicevo',
        'Kocani',
        'Kratovo',
        'Kriva Palanka',
        'Krusevo',
        'Kumanovo',
        'Makedonski Brod',
        'Makedonska Kamenica',
        'Negotino',
        'Ohrid',
        'Pehcevo',
        'Prilep',
        'Probistip',
        'Radovis',
        'Resen',
        'Sveti Nikole',
        'Skopje',
        'Stip',
        'Struga',
        'Strumica',
        'Tetovo'
    ];


}
