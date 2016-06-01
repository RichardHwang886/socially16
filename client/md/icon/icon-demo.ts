import {Component, ViewEncapsulation} from '@angular/core';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon/icon';

@Component({
  moduleId: module.id,
  selector: 'md-icon-demo',
  templateUrl: 'icon-demo.html',
 // styleUrls: ['icon-demo.css'],
  directives: [MdIcon],
  viewProviders: [MdIconRegistry],
  encapsulation: ViewEncapsulation.None,
})



export class IconDemo {
  constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry
        //   其使用的路徑,是要將所要的svg檔,放置在public的下面 20160601 richard hwang
        .addSvgIcon('thumb-up', '/assets/thumbup-icon.svg')
        .addSvgIconSetInNamespace('core', '/assets/core-icon-set.svg')
        .registerFontClassAlias('fontawesome', 'fa');
  }
}
