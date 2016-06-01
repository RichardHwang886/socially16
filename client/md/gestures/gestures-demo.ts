import {Component} from '@angular/core';
import {Meteor} from 'meteor/meteor';

@Component({
  moduleId: module.id,
  selector: 'gestures-demo',
  templateUrl: 'gestures-demo.html',
  //styleUrls: ['gestures-demo.css'],
  directives: []
})
export class GesturesDemo {
  dragCount: number = 0;
  panCount: number = 0;
  pressCount: number = 0;
  longpressCount: number = 0;
  swipeCount: number = 0;
  constructor() {
    // 此處需要hammerjs 20160601 richard
    if (Meteor.isClient) {
      require('/node_modules/hammerjs/hammer.min.js');
    }
  }
}
