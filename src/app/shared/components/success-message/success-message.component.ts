import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackMessage } from 'app/shared/constant/constant';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent implements OnInit {

  @Input() public messageInfo: any;
  @Output() messageEvent = new EventEmitter<string>();
  public Home = BackMessage.Home;
  public Page = BackMessage.Page;
  constructor() { }

  ngOnInit(): void {
    console.log('messageInfo :>> ', this.messageInfo);
  }

  back(value){
    this.messageEvent.emit(value);
  }


}
