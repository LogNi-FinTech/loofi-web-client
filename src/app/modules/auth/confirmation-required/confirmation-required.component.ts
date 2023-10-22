import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { WelcomeDetail, WelcomeTitle } from 'app/shared/constant/constant';

@Component({
    selector     : 'auth-confirmation-required',
    templateUrl  : './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthConfirmationRequiredComponent
{
    public welcomeTitle = WelcomeTitle; 
    public welcomeDetail = WelcomeDetail;
    /**
     * Constructor
     */
    constructor()
    {
    }
}
