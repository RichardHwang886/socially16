
declare module "meteor/socially-browser" {
    import {MeteorComponent} from 'angular2-meteor';
    // export interface BrowserLogin extends MeteorComponent {
    //     login(credentials): void;
    // }

    export let APP_COMPONENT_BROWSER_TEMPLATE: string;
    export class BrowserLogin extends MeteorComponent { }
}



