import {Component, NgZone, provide, Renderer} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes, Router, OnActivate, RouteSegment} from '@angular/router';
//import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, Router} from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common';

import {PartiesList} from './parties-list/parties-list';

import {PartyDetails} from './party-details/party-details';

import '../collections/methods';

import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
// 20160519 加入map api key
import { LazyMapsAPILoaderConfig } from 'angular2-google-maps/services';

import {LoginButtons} from 'angular2-meteor-accounts-ui';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';


// material
import { Dir } from '@angular2-material/core';
import {MdButton, MdAnchor} from '@angular2-material/button/button';
import {MdIcon} from '@angular2-material/icon/icon';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list/list';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {MdIconRegistry} from '@angular2-material/icon/icon-registry';
import {OVERLAY_CONTAINER_TOKEN} from '@angular2-material/core/overlay/overlay';
import {MdLiveAnnouncer} from '@angular2-material/core/live-announcer/live-announcer';
import {createOverlayContainer} from '@angular2-material/core/overlay/overlay-container';

import { ButtonDemo } from './md/button/button-demo';
import { Home2 } from './home2';
//import {LoginButtonsRh} from './loginButtonsRh';
//import {Accounts} from 'meteor/acount-helper';

// Accounts.ui.config({
//   passwordSignupFields: 'USERNAME_AND_EMAIL'
// });
//export var myRouter :Router;

@Component({
    selector: 'app',
    templateUrl: '/client/app.html',
    directives: [ROUTER_DIRECTIVES, LoginButtons,
        Dir,
        MdButton, MdAnchor,
        MdIcon,
        MD_SIDENAV_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MdToolbar
    ]
})
// @RouteConfig([
//     { path: '/', as: 'PartiesList', component: PartiesList },
//     { path: '/home2', component: Home2 },
//     { path: '/party/:partyId', as: 'PartyDetails', component: PartyDetails }
// ])
@Routes([
    { path: '/', component: PartiesList },
    { path: '/PartiesList', component: PartiesList },
    { path: '/button', component: ButtonDemo },

    { path: '/home2', component: Home2 },
    { path: '/PartyDetails/:partyId', component: PartyDetails }
])



class Socially implements OnActivate {
    // constructor(loginBtn:LoginButtons){
    //   //  loginBtn.prototype.
    //      loginBtn.logout =function(){
    //          console.log('logooooout');
    //      }
    // }
    /**
     *
     */

    private currRoteSegment: RouteSegment;
    constructor(private router: Router) {

        // myRouter = router.root;

        // Tracker.autorun(function () {
        //     if (Meteor.userId()) {
        //         console.log('tracker run user login in ....');
        //         //this.router.navigate(['xxx',xxx]); # 有參數
        //         //ex:this.router.navigate([`/heroes`, {id: heroId, foo: 'foo'}]);
        //         myRouter.navigate(['/home']);
        //     } else {
        //         console.log('tracker run user login out ....');
        //           myRouter.navigate(['/home']);
        //     }
        // });
        // Accounts.onPageLoadLogin(() => {
        //     console.log('onPageLoadLogin....');
        // });

        // Accounts.onLogin(() => {
        //     console.log('on login ...');
        // });

        // Accounts.onLoginFailure(() => {
        //     console.log('on login Failure ...');
        // });
    }
    routerOnActivate(curr: RouteSegment, prev: RouteSegment) {
        this.currRoteSegment = curr;
    }
    testGoHome2(sUrl) {
        this.router.navigate([sUrl], this.currRoteSegment);
    }
}

// Accounts.onLogout(function() {
//   console.log('You are logged out.');
// });
//bootstrap(Socially, [ROUTER_PROVIDERS, ANGULAR2_GOOGLE_MAPS_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);



bootstrap(Socially, [ROUTER_PROVIDERS, ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    MdIconRegistry, HTTP_PROVIDERS, MdLiveAnnouncer,
    provide(OVERLAY_CONTAINER_TOKEN, { useValue: createOverlayContainer() }),
    Renderer,
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(LazyMapsAPILoaderConfig, {
        useFactory: () => {
            let config = new LazyMapsAPILoaderConfig();
            config.apiKey = 'AIzaSyCK3BF3GVoMqWAh7Bhazn8EmWLmMLO17ok';
            return config;
        }
    })
]);
