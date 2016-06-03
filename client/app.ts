import {Component, NgZone, provide, Renderer} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes, Route, Router, OnActivate, RouteSegment} from '@angular/router';
//import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, Router} from '@angular/router-deprecated';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';

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

// DI services
import { DialogService }         from './util/dialog.service';
//import { Media } from './util/media';

// material design
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
import {MdGestureConfig} from '@angular2-material/core/gestures/MdGestureConfig';


import {CardDemo} from './md/card/card-demo';
import {ButtonDemo} from './md/button/button-demo';
import {CheckboxDemo} from './md/checkbox/checkbox-demo';
import {GesturesDemo} from './md/gestures/gestures-demo';
import {GridListDemo} from './md/grid-list/grid-list-demo';
import {IconDemo} from './md/icon/icon-demo';
import {InputDemo} from './md/input/input-demo';
import {ListDemo} from './md/list/list-demo';
import {LiveAnnouncerDemo} from './md/live-announcer/live-announcer-demo';
//import {OverlayDemo} from './md/overlay/overlay-demo';
import {PortalDemo} from './md/portal/portal-demo';
import {ProgressBarDemo} from './md/progress-bar/progress-bar-demo';
import {ProgressCircleDemo} from './md/progress-circle/progress-circle-demo';
import {RadioDemo} from './md/radio/radio-demo';
import {SidenavDemo} from './md/sidenav/sidenav-demo';
import {SlideToggleDemo} from './md/slide-toggle/slide-toggle-demo';
import {TabsDemo} from './md/tabs/tab-group-demo';
import {ToolbarDemo} from './md/toolbar/toolbar-demo';
import {MeteorComponent,MeteorApp} from 'angular2-meteor';

import { Demo2App } from './md/demo2/demo2';
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
    providers: [DialogService],
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
    //{ path: '/', component: Demo2App },
    new Route({ path: '/', component: PartiesList }),
    new Route({ path: '/PartiesList', component: PartiesList }),
    new Route({ path: '/home2', component: Home2 }),
    new Route({ path: '/PartyDetails/:partyId', component: PartyDetails }),

    new Route({ path: '/demo2', component: Demo2App }),

    new Route({ path: '/button', component: ButtonDemo }),
    new Route({ path: '/card', component: CardDemo }),
    new Route({ path: '/checkbox', component: CheckboxDemo }),
    new Route({ path: '/gestures', component: GesturesDemo }),
    new Route({ path: '/grid-list', component: GridListDemo }),
    new Route({ path: '/icon', component: IconDemo }),
    new Route({ path: '/input', component: InputDemo }),
    new Route({ path: '/radio', component: RadioDemo }),
    new Route({ path: '/sidenav', component: SidenavDemo }),
    new Route({ path: '/slide-toggle', component: SlideToggleDemo }),
    new Route({ path: '/progress-circle', component: ProgressCircleDemo }),
    new Route({ path: '/progress-bar', component: ProgressBarDemo }),
    new Route({ path: '/portal', component: PortalDemo }),
    // new Route({ path: '/overlay', component: OverlayDemo }),
    new Route({ path: '/toolbar', component: ToolbarDemo }),
    new Route({ path: '/list', component: ListDemo }),
    new Route({ path: '/live-announcer', component: LiveAnnouncerDemo }),
    new Route({ path: '/tabs', component: TabsDemo })
])



class Socially  extends MeteorComponent implements OnActivate{
    // constructor(loginBtn:LoginButtons){
    //   //  loginBtn.prototype.
    //      loginBtn.logout =function(){
    //          console.log('logooooout');
    //      }
    // }
    /**
     *
     */
    mySideNavMode: string;  //`mode` | `"over"|"push"|"side"` | 
    mySideNavOpened: boolean; //`opened` | `boolean`
    private currRoteSegment: RouteSegment;
  //  constructor(private router: Router, private _zone: NgZone) {
     // private  _zone:NgZone ;
      //private router: Router
      
    constructor( private router: Router) {
        super();
        const mql: MediaQueryList = window.matchMedia('(min-width: 600px)');

        //this.mySideNavMode = 'side';  //`mode` | `"over"|"push"|"side"` | 
        //this.mySideNavOpened=true;
        this.mySideNavOpened = mql.matches;
        this.mySideNavMode = mql.matches ? 'side' : 'over';  //`mode` | `"over"|"push"|"side"` | 
        
        let _zone=MeteorApp.ngZone();

        mql.addListener((mql: MediaQueryList) => {
            // document.body.querySelector('#element').innerHTML = this.getText(mql);

           _zone.run(() => {
                //  var mySideNav= document.body.querySelector('#start');
                //   if (mySideNav.ha)
                this.mySideNavOpened = mql.matches;
                this.mySideNavMode = mql.matches ? 'side' : 'over';  //`mode` | `"over"|"push"|"side"` | 
                //console.log('detect -->' + this.mySideNavMode);
            });

        });

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



bootstrap(Socially, [
    ROUTER_PROVIDERS, HTTP_PROVIDERS, Renderer,
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(LocationStrategy, { useClass: HashLocationStrategy }),


    //material
    MdIconRegistry, MdLiveAnnouncer,
    provide(OVERLAY_CONTAINER_TOKEN, { useValue: createOverlayContainer() }),
    provide(HAMMER_GESTURE_CONFIG, { useClass: MdGestureConfig }),
    //google map
    ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    provide(LazyMapsAPILoaderConfig, {
        useFactory: () => {
            let config = new LazyMapsAPILoaderConfig();
            config.apiKey = 'AIzaSyCK3BF3GVoMqWAh7Bhazn8EmWLmMLO17ok';
            return config;
        }
    })
]);
