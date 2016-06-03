import {Component} from '@angular/core';
import { Meteor  } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {Parties} from '../../collections/parties';

import {PartiesForm} from '../parties-form/parties-form';

import {ROUTER_DIRECTIVES, Router, RouteTree, CanDeactivate} from '@angular/router';
//import {RouterLink,Router} from '@angular/router-deprecated';

import { InjectUser } from 'angular2-meteor-accounts-ui';

import { ReactiveVar } from 'meteor/reactive-var';
import { Counts } from 'meteor/tmeasday:publish-counts';
import {MeteorComponent} from 'angular2-meteor';

import {PaginationService, PaginatePipe, PaginationControlsCmp} from 'angular2-pagination';

import {RsvpPipe} from '../lib/pipes';

import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker';


import {MdButton} from '@angular2-material/button/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card/card';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list/list';
import {MdIcon} from '@angular2-material/icon/icon';

export var myRouter: Router;


@Component({
    selector: 'parties-list',
    viewProviders: [PaginationService],
    templateUrl: '/client/parties-list/parties-list.html',
    //directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, PartiesForm, RouterLink,  PaginationControlsCmp],
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, ROUTER_DIRECTIVES,
        PartiesForm, PaginationControlsCmp,
        MD_CARD_DIRECTIVES, MdButton, MD_LIST_DIRECTIVES, MdIcon],
    pipes: [PaginatePipe, RsvpPipe]
})
//@InjectUser('currentUser')
@InjectUser(null)
export class PartiesList extends MeteorComponent implements CanDeactivate {
    parties: Mongo.Cursor<Party>;
    pageSize: number = 10;
    curPage: ReactiveVar<number> = new ReactiveVar<number>(1);
    nameOrder: ReactiveVar<number> = new ReactiveVar<number>(1);
    partiesSize: number = 0;
    location: ReactiveVar<string> = new ReactiveVar<string>(null);
    user: Meteor.User;

    constructor(private router: Router) {
        super();
        this.autorun(() => {
            let options = {
                limit: this.pageSize,
                skip: (this.curPage.get() - 1) * this.pageSize,
                sort: { name: this.nameOrder.get() }
            };
            this.subscribe('parties', options, this.location.get(), () => {
                this.parties = Parties.find({}, { sort: { name: this.nameOrder.get() } });
            }, true);
        });

        this.autorun(() => {
             this.user = Meteor.user();  // monitor user
            this.partiesSize = Counts.get('numberOfParties');
        }, true);

       // this.user = Meteor.user();


        myRouter = router;

        Tracker.autorun(function () {
            
            if (Meteor.userId()) {
               // console.log('tracker run user login in ....');
                //this.router.navigate(['xxx',xxx]); # 有參數
                //ex:this.router.navigate([`/heroes`, {id: heroId, foo: 'foo'}]);
                 
            } else {
               // console.log('tracker run user login out ....');
                    myRouter.navigate(['/']);
            }
        });
        // Accounts.onPageLoadLogin(() => {
        //    // console.log('onPageLoadLogin....');
        // });

        Accounts.onLogin(() => {
            console.log('on login ...');
            myRouter.navigate(['/']); // refresh it
        });

        Accounts.onLoginFailure(() => {
            console.log('on login Failure ...');
        });

    }
    routerCanDeactivate(currTree?: RouteTree, futureTree?: RouteTree): any {
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged.
        // if (!this.crisis || this.crisis.name === this.editName) {
        //     return true;
        // }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        // return this.dialog.confirm('Discard changes?');



       // var partyId = currTree.root.getParam('partyId');
       //  var party = Parties.findOne(partyId);
        var userId = Meteor.userId();
        var b = userId ;
        //     var b = false;
        //     if (userId)
        //         b = party.public || (party && party.owner == userId);

        if (!b)
            alert(' pls login now.');
        return b;

    }

    btnClick() {
        console.log('tbn click');
        this.router.navigate(['/home2']);
        // myRouter.navigate(['/home2']);
    }
    removeParty(party) {
        Parties.remove(party._id);
    }

    search(value: string) {
        this.curPage.set(1);
        this.location.set(value);
    }

    onPageChanged(page: number) {
        this.curPage.set(page);
    }

    changeSortOrder(nameOrder: string) {
        this.nameOrder.set(parseInt(nameOrder));
    }

    isOwner(party: Party): boolean {
        if (this.user) {
            return this.user._id === party.owner;
        }

        return false;
    }
}
