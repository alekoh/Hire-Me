import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../list-advertisements-component/advertisement';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdvertService} from "../../_services/advertisement.service";
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router} from "@angular/router";

@Component({
    selector: 'app-post-advert',
    templateUrl: './post-advert.component.html',
    styleUrls: ['./post-advert.component.css'],
    providers: [MdDialog]
})
export class PostAdvertComponent implements OnInit {

    public form: FormGroup;
    public submited: boolean;

    constructor(private fb: FormBuilder, private advertService: AdvertService,
                public dialog: MdDialog, private router: Router) { }

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

        this.dialog.open(DialogComponent);
        this.form.reset();
        this.router.navigate(['/home']);
  }
}


@Component({
  selector: 'post-advert-dialog-component',
  template: `
    <h1 md-dialog-title>Thank you</h1>
    <div md-dialog-content>New advertisement was created!</div>
    <div md-dialog-actions>
      <button md-button md-dialog-close>Ok!</button>
    </div>
  `
})
export class DialogComponent {
}