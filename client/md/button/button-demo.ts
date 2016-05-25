import {Component} from '@angular/core';
import {MdButton, MdAnchor} from '@angular2-material/button/button';
import {MdIcon} from '@angular2-material/icon/icon';

@Component({
    selector: 'button-demo',
    templateUrl: '/client/md/button/button-demo.html',
    //styleUrls: ['/client/md/button/button-demo.css'],  #在main.scss中import
    directives: [MdButton, MdAnchor, MdIcon]
})
export class ButtonDemo {
  isDisabled: boolean = false;
  clickCounter: number = 0;
}
