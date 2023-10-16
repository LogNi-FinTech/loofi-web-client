import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnakBarService } from 'app/shared/service/snak-bar.service';
import { UserService } from 'app/shared/service/user.service';
import { RegistrationModalComponent } from '../../modals/registration-modal/registration-modal.component';
import { RegistratioService } from '../../services/registratio.service';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {

  public displayedColumns: string[] = ['identifier', 'firstName', 'idNumber', 'idType', 'mobileNo', 'status'];
  public dataSource;
  public isLoading = false;

  constructor(private registratioService: RegistratioService,
    public dialog: MatDialog,
    private userService: UserService,
    private snakBarService: SnakBarService) { }

  ngOnInit(): void {
    console.log('this.UserService.ge :>> ', this.userService.userId + " " + this.userService.userRole);
    this.fetchRegistrationList();
  }

  openDialog(registration?) {
    this.isLoading = true;
    let dialogRef = this.dialog.open(RegistrationModalComponent, {
      width: '1090px',
      panelClass: 'app-full-bleed-dialog',
      data: {
        registrationData: registration
      },
    });
    dialogRef.afterClosed().subscribe(modalRegistrationData => {
      debugger;
      if(modalRegistrationData){
        if (!registration) {
          this.saveRegistration(modalRegistrationData);
        }
        else if(registration){
          this.changeStatusRegistration(registration, modalRegistrationData);
        }
        else {
          this.isLoading = false;
        }
      }
      else {
        this.isLoading = false;
      }
    });
  }

  saveRegistration(modalRegistrationData){
    modalRegistrationData = {
      ...modalRegistrationData,
      lastModifiedBy: this.userService.userId,
      createdBy: this.userService.userId,
    }
    this.registratioService.saveRegistration(modalRegistrationData).subscribe(async data => {
      this.fetchRegistrationList();
      this.snakBarService.showMessage("Successfully Saved");
    },
      error => {
        this.isLoading = false;
      });
    console.log('modalRegistrationData :>> ', modalRegistrationData);
  }

  changeStatusRegistration(orginalRegistration, modalRegistrationData){
    orginalRegistration = {
      ...orginalRegistration,
      lastModifiedBy: this.userService.userId,
      status : modalRegistrationData,
    }
    this.registratioService.changeStatusRegistration(orginalRegistration).subscribe(async data => {
      this.fetchRegistrationList();
      this.snakBarService.showMessage("Successfully Updated");
    },
      error => {
        this.isLoading = false;
      });
    console.log('modalRegistrationData :>> ', modalRegistrationData);
    console.log('orginalRegistration :>> ', orginalRegistration);
  }

  fetchRegistrationList() {
    this.isLoading = true;
    this.registratioService.fetchRegistrationList().subscribe(data => {
      debugger;
      this.dataSource = data;
      this.isLoading = false;
      console.log('data :>> ', data);
    },
      error => {
        this.isLoading = false;
        this.snakBarService.showMessage("An error has occured");
      });
  }

}
