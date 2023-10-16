import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'app/shared/service/user.service';

@Component({
  selector: 'app-feature-guard',
  templateUrl: './feature-guard.component.html',
  styleUrls: ['./feature-guard.component.scss']
})
export class FeatureGuardComponent implements OnInit {

  @Input() feature: string;
  showContent: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let featurelist = this.userService.featureList();
    if (featurelist.includes(this.feature))
      this.showContent = true;
  }

}
