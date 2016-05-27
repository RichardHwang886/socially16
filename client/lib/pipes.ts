import {Pipe} from '@angular/core';

import {Parties} from '../../collections/parties';

import {MeteorComponent} from 'angular2-meteor';
import { Meteor } from 'meteor/meteor';

@Pipe({
    name: 'displayName'
})
export class DisplayName {
    transform(user: Meteor.User): string {
        if (!user) {
            return '';
        }

        if (user.username) {
            return user.username;
        }

        if (user.emails) {
            return user.emails[0].address;
        }

        return '';
    }
}

@Pipe({
    name: 'rsvp',
    pure: false
})
export class RsvpPipe extends MeteorComponent {
    init: boolean = false;
    total: number = 0;

    transform(party: Party, args: any[]): number {
        let type = args[0];
        if (!type) {
            return 0;
        }
        if (!party || !party._id) return 0;  // 20160519 richard hwang

        if (!this.init) {
            var partId =null;
           // console.log('rsvsp:step 1');
            this.autorun(() => {
                try{
                    //20160523 有時從detail返回,會出現讀取錯誤
                   partId = party._id;
                }
                catch(e) {
                    //console.log('rsvsp:step 2 (partid error)');
            
                }
                
                if (partId) {
                    party = Parties.findOne(partId);
                    if (party) {
                        this.total = party.rsvps ?
                            party.rsvps.filter(rsvp => rsvp.response === type).length : 0;
                      //  console.log('rsvsp:step 3 ['+this.total +']['+party.rsvps+']');
            
                    }
                }

            }, true);
            this.init = true;
        }

        return this.total;
    }
}

