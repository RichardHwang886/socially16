import {Component} from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
//import {RouteParams, RouterLink, ComponentInstruction, CanActivate } from '@angular/router-deprecated';
//import {ComponentInstruction, CanActivate } from '@angular/router-deprecated';
import {  CanDeactivate, OnActivate, Router, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';

import {Parties} from '../../collections/parties';

import { RequireUser, InjectUser } from 'angular2-meteor-accounts-ui';

import {MeteorComponent} from 'angular2-meteor';

import {DisplayName} from '../lib/pipes';

import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, MouseEvent} from 'angular2-google-maps/core';
import {DialogService} from '../util/dialog.service';


// function checkPermissions(next: ComponentInstruction, prev: ComponentInstruction) {
//     var partyId = next.params['partyId'];
//     var party = Parties.findOne(partyId);
//     var userId = Meteor.userId();
//     var b = false;
//     if (userId)
//         b = party.public || (party && party.owner == userId);

//     if (!b)
//         alert('Sorry you have no right !! \r\n pls login now.');
//     return b;

// }

@Component({
    selector: 'party-details',
    pipes: [DisplayName],
    templateUrl: '/client/party-details/party-details.html',
    //directives: [RouterLink, ANGULAR2_GOOGLE_MAPS_DIRECTIVES]
    directives: [ROUTER_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_DIRECTIVES]

})

//@RequireUser()  // 此行會被@CanActivate取代
// 要放在這才可以生效 , 在@Component後
//@CanActivate(checkPermissions)  ==> rc版 , 不適用


//@InjectUser('currentUser')
@InjectUser(null)
//export class PartyDetails extends MeteorComponent {
export class PartyDetails extends MeteorComponent
    implements OnActivate, CanDeactivate {

    party: Party;
    oldParty: Party;
    users: Mongo.Cursor<Object>;
    user: Meteor.User;


    // Default center Palo Alto coordinates.
    centerLat: Number = 37.4292;
    centerLng: Number = -122.1381;

    private curSegment: RouteSegment;

    // constructor(params: RouteParams) {
    //     super();
    //     var partyId = params.get('partyId');
    //     this.subscribe('party', partyId, () => {
    //         this.autorun(() => {
    //             this.party = Parties.findOne(partyId);
    //             this.getUsers(this.party);
    //         }, true);
    //     });

    //     this.subscribe('uninvited', partyId, () => {
    //         this.getUsers(this.party);
    //     }, true);
    // }
    constructor(private router: Router, private dialog: DialogService) {
        super();
        this.user = Meteor.user();
    }

    routerOnActivate(curr: RouteSegment, prev: RouteSegment) {
        this.curSegment = curr;

        //let id = +curr.getParam('id');
        var partyId = curr.getParam('partyId');

        var party = Parties.findOne(partyId);
        var userId = Meteor.userId();

        var b = false;
        if (userId)
            b = party.public || (party && party.owner == userId);

        if (!b) {
            b = (party.invited || []).indexOf(userId) != -1;
        }


        if (!b) {
            //prev.stringifiedUrlSegments
            //var s= prev.urlSegments.toString();
            this.router.navigate(['/']);
            alert('Sorry you have no right !! \r\n pls login now.');
            return;
        }


        this.oldParty = party;


        this.subscribe('party', partyId, () => {
            this.autorun(() => {
                this.party = Parties.findOne(partyId);
                this.getUsers(this.party);
            }, true);
        });

        this.subscribe('uninvited', partyId, () => {
            this.getUsers(this.party);
        }, true);
    }

    routerCanDeactivate(): any {
        let isModified = !(this.oldParty.name === this.party.name);
        if (isModified)
            return this.dialog.confirm('Discard changes?');
        else
            return true;
        // // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged.
        // if (!this.crisis || this.crisis.name === this.editName) {
        //   return true;
        // }
        // // Otherwise ask the user with the dialog service and return its
        // // promise which resolves to true or false when the user decides
        // return this.dialog.confirm('Discard changes?');
    }



    getUsers(party: Party) {
        if (party) {
            this.users = Meteor.users.find({
                _id: {
                    $nin: party.invited || [],
                    $ne: Meteor.userId()
                }
            });
        }
    }

    saveParty(party) {
        
        if (Meteor.userId()) {
            this.oldParty = this.party;
            Parties.update(party._id, {
                $set: {
                    name: party.name,
                    description: party.description,
                    location: party.location
                }
            });
        } else {
            alert('Please log in to change this party');
        }
    }

    invite(user: Meteor.User) {
        this.call('invite', this.party._id, user._id, (error) => {
            if (error) {
                alert(`Failed to invite due to ${error}`);
                return;
            }

            alert('User successfully invited.');
        });
    }

    reply(rsvp: string) {
        this.call('reply', this.party._id, rsvp, (error) => {
            if (error) {
                alert(`Failed to reply due to ${error}`);
            }
            else {
                alert('You successfully replied.');
            }
        });
    }

    get isOwner(): boolean {
        if (this.party && this.user) {
            return this.user._id === this.party.owner;
        }

        return false;
    }

    get isPublic(): boolean {
        if (this.party) {
            return this.party.public;
        }

        return false;
    }

    get isInvited(): boolean {
        if (this.party && this.user) {
            let invited = this.party.invited || [];
            return invited.indexOf(this.user._id) !== -1;
        }

        return false;
    }

    get lat(): Number {
        return this.party && this.party.location.lat;
    }

    get lng(): Number {
        return this.party && this.party.location.lng;
    }

    mapClicked($event: MouseEvent) {
        this.party.location.lat = $event.coords.lat;
        this.party.location.lng = $event.coords.lng;
    }
}
