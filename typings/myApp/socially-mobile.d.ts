declare module "meteor/socially-mobile" {

    import {MeteorComponent} from 'angular2-meteor';
    //export interface MobileLogin extends MeteorComponent { }

    export let APP_COMPONENT_MOBILE_TEMPLATE: string;
    export let MOBILE_IMPORTS: any[];
    // export let MobileLogin:MobileLogin;
    export class MobileLogin extends MeteorComponent { }
}
