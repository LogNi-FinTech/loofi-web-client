import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SnakBarService {

  constructor(private _snackBar: MatSnackBar,
    private toastr: ToastrService) { }

  showMessage(message, duration = 600){
    this._snackBar.open(message, '', {
      duration: duration
    });
  }

  showToasterError(errorMessage){
    this.toastr.error("", errorMessage,  { timeOut: 3000, closeButton: true,})
  }
}
