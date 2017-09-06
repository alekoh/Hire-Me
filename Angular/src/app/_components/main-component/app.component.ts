import { Component } from '@angular/core';
import { MdMenuTrigger } from '@angular/material';
import { AuthResponse, InitParams, FacebookService, LoginResponse, LoginOptions } from 'ng2-facebook-sdk';
import {Router} from "@angular/router";

declare var IN: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor(private fb: FacebookService, private router: Router) {
        const fbParams: InitParams = {
            appId: '1918180375122700',
            xfbml: true,
            cookie: true,
            version: 'v2.9'
        };
        this.fb.init(fbParams);
    }

    loginFb() {
        this.fb.login()
            .then((res: LoginResponse) => {
                console.log('Logged in', res);
                console.log(this.fb.getAuthResponse());
                if (res.status === 'connected') {
                    console.log(res.authResponse.accessToken);
                }
            })
            .catch(this.handleError);
    }

    onLinkedInLoad() {
        IN.UI.Authorize().params({'scope': ['r_basicprofile']}).place();
        IN.Event.on(IN, 'auth', this.onLinkedInAuth);
    }

    onLinkedInAuth() {
        IN.API.Profile('me')
            .result(
                this.displayProfiles,
                function(result) {
                })
            .error(this.handleError);
    }

    displayProfiles(profiles) {
        const linkedinmember = profiles.values[0];
        console.log(JSON.stringify(linkedinmember));
        console.log(linkedinmember.firstName + ' ' + linkedinmember.lastName);
    }

    postJob() {
        this.router.navigate(['/postAdvert']);
    }

    private handleError(error) {
        console.error('Error processing action', error);
    }
}
