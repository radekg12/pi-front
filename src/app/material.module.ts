import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatGridListModule,
    MatDividerModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatGridListModule,
    MatDividerModule,
    MatTableModule
  ]
})
export class MaterialModule {
}
