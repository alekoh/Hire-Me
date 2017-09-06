import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Advertisement } from '../_components/advertisement-component/advertisement';

@Injectable()
export class ItemsService {
    private advertisementsUrl = 'http://localhost:8000/adverts';
    private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    private body = new URLSearchParams();

    constructor(private http: Http) { }

    getAdvertisements(): Promise<Advertisemenet[]> {
        return this.http.get(this.advertisementsUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getAdvertisementById(id: number): Promise<Advertisement> {
        const url = `${this.advertisementsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Advertisement)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.advertisementsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(advert: Advertisement): Promise<Advertisement> {
        this.body.set("name", advert.name);
        this.body.set("jobType", advert.type);
        this.body.set("location", advert.location);
        this.body.set("company", advert.company);
        this.body.set("description", advert.description);
        this.body.set("website", advert.website);

        return this.http
            .post(this.advertisementsUrl, this.body, {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Advertisement)
            .catch(this.handleError);
    }

    update(advertisement: Advertisement): Promise<Advertisement> {
        const url = `${this.advertisementsUrl}/${advertisement.id}`;
        return this.http
            .put(url, JSON.stringify(advertisement), {headers: this.headers})
            .toPromise()
            .then(() => advertisement)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
