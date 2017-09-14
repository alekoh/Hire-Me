import { Component, ViewChild } from '@angular/core';
import { MdMenuTrigger } from '@angular/material';
import { AuthResponse, InitParams, FacebookService, LoginResponse, LoginOptions } from 'ng2-facebook-sdk';
import { AuthService } from 'angular2-social-login';

import { Router } from "@angular/router";

declare var IN: any;


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public myClientId: string = '903075759019-3q89hsrh5q0p8kjvk4etv9l8d6qflqro.apps.googleusercontent.com';
    public user: string;;
    @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
    @ViewChild('fbLogin') fbUser;
    @ViewChild('liLogin') liUser;
    @ViewChild('logoutAll') logoutUser;
    @ViewChild('currentUser') currentUser;
    sub: any;

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

        setTimeout(() => { this.logoutUser._elementRef.nativeElement.style.display = 'none' }, 2000);
    }

    public loginFb() {
        this.user = 'Login';
        this.trigger.closeMenu();
        this.fb.login()
            .then((res: LoginResponse) => {
                console.log('Logged in', res);
                console.log(this.fb.getAuthResponse());
                if (res.status === 'connected') {
                    console.log(res.authResponse.accessToken);
                    this.fb.api('/me')
                        .then((res: any) => {
                            console.log('Got the users profile from Facebook inside ', res.name);
                            this.user = res.name.split(' ')[0];
                            this.currentUser._elementRef.nativeElement.innerText = this.user;
                        })
                }
            })
            .catch(this.handleError);

        this.login('facebook');
    }

    onLinkedInLoad() {
        // this.user = 'Login';
        IN.UI.Authorize().params({ 'scope': ['r_basicprofile'] }).place();
        IN.Event.on(IN, 'auth', this.onLinkedInAuth);

        this.login('linkedin');
    }

    onLinkedInAuth() {
        IN.API.Profile('me')
            .result(
            this.displayProfiles,
            function (result) {
            })
            .error(this.handleError);


    }


    logout() {
        this.auth.logout().subscribe(
            (data) => {
                console.log(data);
                this.user = undefined;;
                console.log('Logged out');
                console.log(this.user + " the user on logout");
                console.log(this.currentUser);
            }
        )
        this.currentUser._elementRef.nativeElement.innerText = 'Login';
        setTimeout(() => { this.fbUser._elementRef.nativeElement.style.display = 'block' }, 2000);
        setTimeout(() => { this.liUser._elementRef.nativeElement.style.display = 'block' }, 2000);
        setTimeout(() => { this.logoutUser._elementRef.nativeElement.style.display = 'none' }, 2000);
        console.log('logged out');
    }

    displayProfiles(profiles) {
        // this.user = 'Login';
        const linkedinmember = profiles.values[0];
        console.log(JSON.stringify(linkedinmember));
        console.log(linkedinmember.firstName + ' ' + linkedinmember.lastName);
        this.user = linkedinmember.firstName;
        console.log(this.user + " user from linked");
        setTimeout(() => {console.log(this.currentUser)}, 3000);
        this.currentUser._elementRef.nativeElement.innerText = this.user;
    }

    postJob() {
        this.router.navigate(['/postAdvert']);
    }

    private handleError(error) {
        console.error('Error processing action', error);
    }

    login(provider) {
        console.log(this.currentUser._elementRef);

        this.sub = this.auth.login(provider).subscribe(
            (data) => {
                console.log('Logged in from other');
                console.log(data);
                // this.currentUser._elementRef.nativeElement.innerText = data.name;
            }
        )
        this.currentUser._elementRef.nativeElement.innerText = this.user;
        console.log(this.user + ' the user\'s name');
        // console.log(this.logoutUser);
        // setTimeout(() => { this.fbUser._elementRef.nativeElement.style.display = 'none' }, 2000);
        setTimeout(() => { this.fbUser._elementRef.nativeElement.style.display = 'none' }, 2000);
        setTimeout(() => { this.liUser._elementRef.nativeElement.style.display = 'none' }, 2000);
        setTimeout(() => { this.logoutUser._elementRef.nativeElement.style.display = 'block' }, 2000);
    }
}
