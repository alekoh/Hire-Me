/**
 * Created by aleksandar.mechkaros on 10-Aug-17.
 */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {AppComponent} from "./_components/main-component/app.component";
import {Advertisement} from "./_components/advertisement-component/advertisement";
import {AdvertisementComponentComponent} from "./_components/advertisement-component/advertisement-component.component";
import {MiddleComponent} from "./_components/middle/middle.component";
import {PostAdvertComponent} from "./_components/post-advert/post-advert.component";


const routes: Routes = [

    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: MiddleComponent },
    { path: "adverts", component: AdvertisementComponentComponent },
    { path: "search", component: AdvertisementComponentComponent },
    { path: "postAdvert", component: PostAdvertComponent},
    { path: "**", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})


export class AppRoutingModule {}
