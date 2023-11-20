import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from 'app/core/user/user.service';
import { accountServiceBaseUrl, authServiceBaseUrl, kycServiceBaseUrl } from 'app/shared/constant/constant';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    private checkUniqueidentifierUrl = accountServiceBaseUrl + "api/v1/account/";
    private checkUniqueIdNumberrUrl = kycServiceBaseUrl + "api/customerkyc/idNumber/";
    private registrationByCustomerUrl = kycServiceBaseUrl + "api/customerkyc/registrationbycustomer";

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        if(localStorage.getItem('accessToken') == "undefined"){
            return null;
        }
        return localStorage.getItem('accessToken') ?? null;
    }

    set userRole(roleName: string)
    {
        localStorage.setItem('role', roleName);
    }

    set userIdentifier(identifier: string)
    {
        localStorage.setItem('identifier', identifier);
    }

    get userIdentifier(): string
    {
        if(localStorage.getItem('identifier') == "undefined"){
            return null;
        }
        return localStorage.getItem('identifier') ?? null;
    }

    set userId(id: string)
    {
        localStorage.setItem('id', id);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    public ob : Observable<{username: string, password: string, role: string}>;
    signIn(credentials: { identifier: string; credential: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        // const subject = new Subject();
        // setTimeout(()=>{
        //     //this.accessToken = "xxxxx.yyyyy.zzzzz";
        //     this.userRole = "USER";
        //     this.userId = "1";
        //     this._authenticated = true;
        //     this.userIdentifier = credentials.identifier;
        //     subject.next({userId: "1", accessToken: "xxxxx.yyyyy.zzzzz", role: "CHECKER"});
        // },10);
        // return subject.asObservable(); 

        return this._httpClient.post(`${authServiceBaseUrl}api/check/auth`, credentials, {responseType: 'text'}).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response;
                // Set the authenticated flag to true
                this._authenticated = true;
                return this._httpClient.get(`${authServiceBaseUrl}api/user-info`).pipe(
                    switchMap((resObject: any)=>{
                        this.userRole = resObject.roles[0].name;
                        this.userIdentifier = credentials.identifier;
                        this.userId = resObject.id;
                        return of(null);
                    })
                );
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post(this.registrationByCustomerUrl, user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken)
        {
            return of(false);
        }

        //Check the access token expire date
        // if ( AuthUtils.isTokenExpired(this.accessToken) )
        // {
        //     return of(false);
        // }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    checkUniqueIdentifier(identifier){
        return this._httpClient.get<boolean>(this.checkUniqueidentifierUrl + identifier, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
        }).pipe(catchError(err => {
          return throwError(err);
        }));
      }
    
      checkUniqueIdNumber(idNumber){
        return this._httpClient.get<boolean>(this.checkUniqueIdNumberrUrl + idNumber, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
        }).pipe(catchError(err => {
          return throwError(err);
        }));
      }
}
