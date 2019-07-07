import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { MaterialModule } from './angularmaterial.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { AddNewDialogComponent } from './add-new-dialog/add-new-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    SnackBarComponent,
    AddNewDialogComponent
  ],
  entryComponents: [
    SnackBarComponent,
    AddNewDialogComponent
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
