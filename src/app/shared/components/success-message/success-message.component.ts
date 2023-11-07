import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent implements OnInit {

  @Input() public messageInfo: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private matDialogRef: MatDialogRef<SuccessMessageComponent>,
  private router: Router) { }

  ngOnInit(): void {
    console.log('messageInfo :>> ', this.data.messageInfo);
  }

  back(){
    this.matDialogRef.close();
  }

  goHome(){
    this.back();
    this.router.navigate(['/home'])
  }

}
