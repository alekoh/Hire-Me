// Built-in modules
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

// Imported modules
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MaterialModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdAutocompleteModule, MdInputModule } from '@angular/material';
import { MdIconModule, MdMenuModule, MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { FacebookService } from 'ng2-facebook-sdk';
import { AdvertService } from './_services/advertisement.service';
import { AppRoutingModule } from "./app.routing.module";

// Components
import { AppComponent } from './_components/a-main-component/app.component';
import { FrontSearchComponent } from './_components/front-search-component/front-search.component';
import { MapComponent } from './_components/map/map.component';
import { AdvertisementComponentComponent } from './_components/list-advertisements-component/advertisement-component.component';
import { MiddleComponent } from './_components/middle/middle.component';
import { PostAdvertComponent, DialogComponent  } from './_components/post-advert/post-advert.component';
import { Angular2SocialLoginModule } from 'angular2-social-login';
import { SearchResultsComponent } from './_components/search-results/search-results.component';


let providers = {
    'linkedin': {
      'clientId': '78s8xwpk6n2hru'
    },
    'google': {
      'clientId': '903075759019-3q89hsrh5q0p8kjvk4etv9l8d6qflqro.apps.googleusercontent.com'
    },
    'facebook' : {
      'clientId': '1918180375122700',
      'apiVersion': 'v2.9'
    }
};



@NgModule({
    declarations: [
        AppComponent,
        FrontSearchComponent,
        MapComponent,
        AdvertisementComponentComponent,
        MiddleComponent,
        PostAdvertComponent,
        DialogComponent,
        SearchResultsComponent
    ],
    imports: [
        HttpModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MaterialModule,
        MdButtonModule,
        MdCheckboxModule,
        MdAutocompleteModule,
        MdInputModule,
        MdMenuModule,
        MdIconModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD8yUPHwmnLEoiwew4fcBohSJBYXpSrwc8'
        }),
        // InMemoryWebApiModule.forRoot(InMemoryDataService)
        Angular2SocialLoginModule
    ],
    providers: [
        FacebookService,
        AdvertService
    ],

    schemas: [
        NO_ERRORS_SCHEMA
    ],

    bootstrap: [AppComponent],
    entryComponents: [
        DialogComponent,
    ],
})
export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);
