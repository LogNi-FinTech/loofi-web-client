import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FeatureGuardComponent } from './components/feature-guard/feature-guard.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { ViewDetailComponent } from './modal/view-detail/view-detail.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        FlexLayoutModule,
        MatTableModule,
        HttpClientModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatDialogModule,
        MatDividerModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        FeatureGuardComponent,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatButtonModule,
        MatCardModule,
        FlexLayoutModule,
        MatTableModule,
        HttpClientModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatDialogModule,
        MatDividerModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        GeneralInfoComponent,
        ViewDetailComponent
    ],
    declarations: [
      FeatureGuardComponent,
      GeneralInfoComponent,
      GeneralInfoComponent,
      ViewDetailComponent
    ]
})
export class SharedModule
{
}
