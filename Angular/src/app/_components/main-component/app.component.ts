import { Component, ViewChild } from '@angular/core';
import { MdMenuTrigger } from '@angular/material';
import { AuthResponse, InitParams, FacebookService, LoginResponse, LoginOptions } from 'ng2-facebook-sdk';
import {GoogleSignInSuccess} from 'angular-google-signin';
import { AuthService } from 'angular2-social-login';

import {Router} from "@angular/router";

declare var IN: any;
declare var gapi: any;


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public myClientId: string = '903075759019-3q89hsrh5q0p8kjvk4etv9l8d6qflqro.apps.googleusercontent.com';
    public user;
    @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

    constructor(private fb: FacebookService,
                private router: Router,
                public auth: AuthService) {
        const fbParams: InitParams = {
            appId: '1918180375122700',
            xfbml: true,
            cookie: true,
            version: 'v2.9'
        };
        this.fb.init(fbParams);
    }

    public loginFb() {
        this.trigger.closeMenu();
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

    onGoogleSignInSuccess(event: GoogleSignInSuccess) {
        console.log("Google sign in");
        let googleUser: gapi.auth2.GoogleUser = event.googleUser;
        let id: string = googleUser.getId();
        let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
        console.log('ID: ' + profile .getId());
        console.log('Name: ' + profile.getName());
    }

    logout() {
        this.auth.logout().subscribe(
        (data) => {
            console.log(data);
            this.user = null;
            console.log('Logged out');
        }
        )
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
