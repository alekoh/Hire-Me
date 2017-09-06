// Built-in modules
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

// Imported modules
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MaterialModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdAutocompleteModule, MdInputModule } from '@angular/material';
import { MdIconModule, MdMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { FacebookService } from 'ng2-facebook-sdk';
import { ItemsService } from './_services/advertisement.service';
import { AppRoutingModule } from "./app.routing.module";

// Components
import { AppComponent } from './_components/main-component/app.component';
import { FrontSearchComponent } from './_components/front-search-component/front-search.component';
import { MapComponent } from './_components/map/map.component';

import 'hammerjs';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './_services/in-memory-data.service';
import { AdvertisementComponentComponent } from './_components/advertisement-component/advertisement-component.component';

import 'hammerjs';
import { MiddleComponent } from './_components/middle/middle.component';
import { PostAdvertComponent } from './_components/post-advert/post-advert.component';


@NgModule({
    declarations: [
        AppComponent,
        FrontSearchComponent,
        MapComponent,
        AdvertisementComponentComponent,
        MiddleComponent,
        PostAdvertComponent
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
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD8yUPHwmnLEoiwew4fcBohSJBYXpSrwc8'
        }),
        // InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    providers: [
        FacebookService,
        ItemsService
    ],

    schemas: [
        NO_ERRORS_SCHEMA
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
