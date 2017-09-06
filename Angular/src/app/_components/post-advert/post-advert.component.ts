import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../advertisement-component/advertisement';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ItemsService} from "../../_services/advertisement.service";

@Component({
    selector: 'app-post-advert',
    templateUrl: './post-advert.component.html',
    styleUrls: ['./post-advert.component.css']
})
export class PostAdvertComponent implements OnInit {

    public form: FormGroup;
    public submited: boolean;

    constructor(private fb: FormBuilder, private advertService: ItemsService) { }

    ngOnInit() {
        this.form = this.fb.group({
            company: new FormControl(''),
            website: new FormControl(''),
            name: new FormControl(''),
            location: new FormControl(''),
            type: new FormControl(''),
            description: new FormControl('')
        });
    }

    createNewAdvert(model:Advertisement){
        this.advertService.create(model)
            .then((res) => console.log(res));
    }

}
