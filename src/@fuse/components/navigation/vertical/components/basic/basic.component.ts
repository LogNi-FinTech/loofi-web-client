import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseVerticalNavigationComponent } from '@fuse/components/navigation/vertical/vertical.component';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { FuseUtilsService } from '@fuse/services/utils/utils.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector       : 'fuse-vertical-navigation-basic-item',
    templateUrl    : './basic.component.html',
    styleUrls      : ['./basic.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseVerticalNavigationBasicItemComponent implements OnInit, OnDestroy, AfterViewInit
{
    @ViewChild('navigationItem') navigationItem: ElementRef;
    @Input() item: FuseNavigationItem;
    @Input() name: string;
    routeActivated: boolean = false;

    isActiveMatchOptions: IsActiveMatchOptions;
    private _fuseVerticalNavigationComponent: FuseVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseUtilsService: FuseUtilsService,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    )
    {
        // Set the equivalent of {exact: false} as default for active match options.
        // We are not assigning the item.isActiveMatchOptions directly to the
        // [routerLinkActiveOptions] because if it's "undefined" initially, the router
        // will throw an error and stop working.
        this.isActiveMatchOptions = this._fuseUtilsService.subsetMatchOptions;
        this.registerCustomSVGIcons();
    }

    ngAfterViewInit() {
        const element = this.navigationItem.nativeElement;

        setTimeout(() => {
            if (element.classList.contains('fuse-vertical-navigation-item-active')) {
                this.routeActivated = true;
            } else {
                this.routeActivated = false;
            }
            this._changeDetectorRef.markForCheck();
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Set the "isActiveMatchOptions" either from item's
        // "isActiveMatchOptions" or the equivalent form of
        // item's "exactMatch" option
        this.isActiveMatchOptions =
            this.item.isActiveMatchOptions ?? this.item.exactMatch
                ? this._fuseUtilsService.exactMatchOptions
                : this._fuseUtilsService.subsetMatchOptions;

        // Get the parent navigation component
        this._fuseVerticalNavigationComponent = this._fuseNavigationService.getComponent(this.name);

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Subscribe to onRefreshed on the navigation component
        this._fuseVerticalNavigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
       // console.log('item :>> ', this.item);
    }

    registerCustomSVGIcons(){
        this.matIconRegistry.addSvgIcon(
          'AddMoney',
          this.domSanitizer.bypassSecurityTrustResourceUrl('assets/SvgIcon/AddMoney.svg')
        );
        this.matIconRegistry.addSvgIcon(
          'AddMoney_White',
          this.domSanitizer.bypassSecurityTrustResourceUrl('assets/SvgIcon/AddMoney_White.svg')
        );
        this.matIconRegistry.addSvgIcon(
          'SendMoney_White',
          this.domSanitizer.bypassSecurityTrustResourceUrl('assets/SvgIcon/SendMoney_White.svg')
        );
        this.matIconRegistry.addSvgIcon(
          'SendMoney',
          this.domSanitizer.bypassSecurityTrustResourceUrl('assets/SvgIcon/SendMoney.svg')
        );
        this.matIconRegistry.addSvgIcon(
          'PayBill_White',
          this.domSanitizer.bypassSecurityTrustResourceUrl('assets/SvgIcon/PayBill_White.svg')
        );
        this.matIconRegistry.addSvgIcon(
          'PayBill',
          this.domSanitizer.bypassSecurityTrustResourceUrl('assets/SvgIcon/PayBill.svg') 
        );
        // this.matIconRegistry.addSvgIcon(
        //   'BankTransfer_White',
        //   this.domSanitizer.bypassSecurityTrustResourceUrl('assets/SvgIcon/BankTransfer_White.svg')
        // );
        // this.matIconRegistry.addSvgIcon(
        //   'BankTransfer', 
        //   this.domSanitizer.bypassSecurityTrustResourceUrl('assets/SvgIcon/BankTransfer.svg')
        // );
        this.matIconRegistry.addSvgIcon(
          'Payment_White', 
          this.domSanitizer.bypassSecurityTrustResourceUrl('assets/SvgIcon/Payment_White.svg')
        );
        this.matIconRegistry.addSvgIcon(
          'Payment',
          this.domSanitizer.bypassSecurityTrustResourceUrl('assets/SvgIcon/Payment.svg')
        );
        this.matIconRegistry.addSvgIcon(
          'Wealth_White', 
          this.domSanitizer.bypassSecurityTrustResourceUrl('assets/SvgIcon/Wealth_White.svg')
        );
        this.matIconRegistry.addSvgIcon(
          'Wealth',
          this.domSanitizer.bypassSecurityTrustResourceUrl('assets/SvgIcon/Wealth.svg')
        );
      }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
