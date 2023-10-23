import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { LandingComponent } from './components/landing/landing.component';



const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: "page"},
  { path: '', pathMatch: 'full', component:  LandingComponent},
];


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class AddMoneyModule { }
