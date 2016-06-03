import {Component} from '@angular/core';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input';
import {MdButton} from '@angular2-material/button/button';
import {MdCard} from '@angular2-material/card/card';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';
import {MdIcon} from '@angular2-material/icon/icon';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {FormBuilder, Control, ControlGroup, Validators} from '@angular/common';

import {Parties} from '../../collections/parties';
import { Meteor } from 'meteor/meteor';

@Component({
    selector: 'parties-form',
    templateUrl: '/client/parties-form/parties-form.html',
     directives: [MdCard, MdCheckbox, MdButton, MdIcon, MdToolbar, MD_INPUT_DIRECTIVES]
})
export class PartiesForm {
    partiesForm: ControlGroup;

    constructor() {
        var fb = new FormBuilder();
        this.partiesForm = fb.group({
            name: ['', Validators.required],
            description: [''],
            location: ['', Validators.required],
            lat:[''],
            lng:[''],
            public: [false]
        });
    }

    addParty(party) {
        if (this.partiesForm.valid) {
            if (Meteor.userId()) {
                Parties.insert({
                    name: party.name,
                    description: party.description,
                    location: {
                        name: party.location,
                        lat:Number(party.lat),
                        lng:Number(party.lng)
                    },
                    public: party.public,
                    owner: Meteor.userId()
                });

                (<Control>this.partiesForm.controls['name']).updateValue('');
                (<Control>this.partiesForm.controls['description']).updateValue('');
                (<Control>this.partiesForm.controls['location']).updateValue('');
                (<Control>this.partiesForm.controls['lat']).updateValue('');
                (<Control>this.partiesForm.controls['lng']).updateValue('');
                (<Control>this.partiesForm.controls['public']).updateValue(false);
            } else {
                alert('Please log in to add a party');
            }
        }
    }
}
