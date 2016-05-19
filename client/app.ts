import {Component, NgZone, provide} from '@angular/core';

import { bootstrap } from 'angular2-meteor-auto-bootstrap';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common';

import {PartiesList} from './parties-list/parties-list';

import {PartyDetails} from './party-details/party-details';

import '../collections/methods';

import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
// 20160519 加入map api key
import { LazyMapsAPILoaderConfig } from 'angular2-google-maps/services';

import {LoginButtons} from 'angular2-meteor-accounts-ui';

// Accounts.ui.config({
//   passwordSignupFields: 'USERNAME_AND_EMAIL'
// });

@Component({
    selector: 'app',
    templateUrl: '/client/app.html',
    directives: [ROUTER_DIRECTIVES, LoginButtons]
})
@RouteConfig([
    { path: '/', as: 'PartiesList', component: PartiesList },
    { path: '/party/:partyId', as: 'PartyDetails', component: PartyDetails }
])
class Socially { }

//bootstrap(Socially, [ROUTER_PROVIDERS, ANGULAR2_GOOGLE_MAPS_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);
bootstrap(Socially, [ROUTER_PROVIDERS, ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(LazyMapsAPILoaderConfig, {
        useFactory: () => {
            let config = new LazyMapsAPILoaderConfig();
            config.apiKey = 'AIzaSyCK3BF3GVoMqWAh7Bhazn8EmWLmMLO17ok';
            return config;
        }
    })
]);
