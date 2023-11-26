import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { HomeService } from './services/home.service';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: "page"},
  { path: '', pathMatch: 'full', component:  HomePageComponent},
];

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
