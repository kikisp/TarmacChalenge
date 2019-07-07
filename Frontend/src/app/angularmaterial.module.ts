import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatPaginatorModule,
  MatInputModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatDialogModule
  
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})

export class MaterialModule {}