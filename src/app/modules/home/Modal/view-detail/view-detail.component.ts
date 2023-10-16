import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {

  public summaryList = [
    {
      transferName: "Send Money", 
      value: 200
    },
    {
      transferName: "Mobile Recharge", 
      value: 50
    },
    {
      transferName: "Payment", 
      value: 0
    },
    {
      transferName: "PayBill", 
      value: 526
    },
    {
      transferName: "Cash Out", 
      value: 5000
    },
    {
      transferName: "Fund Transfer", 
      value: 600
    }
  ]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ViewDetailComponent>) { }

  ngOnInit(): void {
  }

  public closeDialog(){
    this.dialogRef.close();
  }

}
