import { NgModule } from '@angular/core';

import {
  MatMenuModule,
  MatCheckboxModule,
  MatRadioModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatListModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatGridListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule,
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS,

  //NativeDateAdapter,
} from "@angular/material";

import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD', //como debemos escribirla en el input
  },
  display: {
    dateInput: 'll',// como se muestra en el input: 31 de dic. de 2099
    monthYearLabel: 'MMM YYYY', //como se muestra en la cabezera del datepicker
    dateA11yLabel: 'll',
    monthYearA11yLabel: 'MMM YYYY',
  }
};

@NgModule({
  imports: [
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,

  ],
  exports: [
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,

  ],

  providers: [
   
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
  ]
})
export class AngularMaterialModule { }
