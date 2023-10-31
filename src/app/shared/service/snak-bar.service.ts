import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnakBarService {

  constructor(private _snackBar: MatSnackBar) { }

  showMessage(message, duration = 600){
    this._snackBar.open(message, '', {
      duration: duration
    });
  }
}
