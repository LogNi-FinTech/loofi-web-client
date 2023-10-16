import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    public isIdNumberExist: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        // this.signUpForm = this._formBuilder.group({
        //         name      : ['', Validators.required],
        //         email     : ['', [Validators.required, Validators.email]],
        //         password  : ['', Validators.required],
        //         company   : [''],
        //         agreements: ['', Validators.requiredTrue]
        //     }
        // );

        this.initSignUpForm();
        this.checkUniqueIdentifier();
        this.checkUniqueIdNumber();
    }

    initSignUpForm() {
        this.signUpForm = this._formBuilder.group({
            identifier: ['Test', Validators.required],
            firstName: ['Md Ibrahim Khan', Validators.required],
            idNumber: ['0008888', Validators.required],
            idType: ['NID'],
            credential: ['11@asS00000', Validators.required],
            email: ['test@gmail.com'],
        }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (response) => {

                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/confirmation-required');
                },
                (response) => {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Something went wrong, please try again.'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    checkUniqueIdentifier() {
        this.signUpForm.get('identifier').valueChanges.pipe(debounceTime(500)).subscribe(
            data => {
                if (data)
                    this._authService.checkUniqueIdentifier(data).subscribe(isExist => {
                        if (this.signUpForm.get('identifier').hasError('uniqueValueError')) {
                            delete this.signUpForm.get('identifier').errors['uniqueValueError'];
                            this.signUpForm.get('identifier').updateValueAndValidity();
                        }
                        if (isExist) {
                            this.signUpForm.get('identifier').setErrors({ uniqueValueError: true });
                        }
                    }, error => {
                    });
            }
        );
    }

    checkUniqueIdNumber() {
        this.signUpForm.get('idNumber').valueChanges.pipe(debounceTime(500)).subscribe(
            data => {
                if (data)
                    this._authService.checkUniqueIdNumber(data).subscribe(isExist => {
                        if (this.signUpForm.get('idNumber').hasError('uniqueValueError')) {
                            delete this.signUpForm.get('idNumber').errors['uniqueValueError'];
                            this.signUpForm.get('idNumber').updateValueAndValidity();
                        }
                        if (isExist) {
                            this.signUpForm.get('idNumber').setErrors({ uniqueValueError: true });
                        }
                        this.isIdNumberExist = isExist;
                    }, error => {
                        console.log('error :>> ', error);
                    });
            }
        )
    }
}
