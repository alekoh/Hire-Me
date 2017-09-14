/**
 * Created by aleksandar.mechkaros on 10-Aug-17.
 */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {AppComponent} from "./_components/a-main-component/app.component";
import {Advertisement} from "./_components/list-advertisements-component/advertisement";
import {AdvertisementComponentComponent} from "./_components/list-advertisements-component/advertisement-component.component";
import {MiddleComponent} from "./_components/middle/middle.component";
import {PostAdvertComponent} from "./_components/post-advert/post-advert.component";
import {SearchResultsComponent} from "./_components/search-results/search-results.component";


const routes: Routes = [

    // { path: "**", redirectTo: "/home", pathMatch: "full" },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: MiddleComponent },

    { path: "adverts", component: AdvertisementComponentComponent },

    { path: "search", component: SearchResultsComponent },

    { path: "postAdvert", component: PostAdvertComponent},

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})


export class AppRoutingModule {}
