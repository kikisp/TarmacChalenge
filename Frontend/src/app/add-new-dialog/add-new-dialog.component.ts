import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Member } from '../models/member';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";

@Component({
  selector: 'app-add-new-dialog',
  templateUrl: './add-new-dialog.component.html',
  styleUrls: ['./add-new-dialog.component.scss']
})
export class AddNewDialogComponent implements OnInit{
 
  tittle:string ="";
  buttonLabel:string="";
  memberForm:FormGroup;
  existingMember:Member;
  showDelete:boolean=false;

  constructor(
    private dialogRef: MatDialogRef<AddNewDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any
    ) {
     
     this.tittle = data.tittle;
     this.buttonLabel = data.button;
     this.showDelete= data.show_delete;
     this.existingMember = new Member();
    if(data.member != null){
      this.existingMember = data.member;
    }
     

    }

   cancel(): void {
      this.dialogRef.close();
    }

    save() {
      if (this.memberForm.valid) {
       let member = new Member();
       member.id = this.memberForm.value.id;
       member.name = this.memberForm.value.name;
       member.role = this.memberForm.value.role;
       member.city = this.memberForm.value.city;
       member.picture_url = this.memberForm.value.picture_url;
       this.dialogRef.close(member);
      }
    }

    delete(): void {
      this.dialogRef.close(this.memberForm.value.id);
    }

    ngOnInit() {
      this.memberForm = this.fb.group({
        id: [this.existingMember.id],
        name: [this.existingMember.name, Validators.required],
        role: [this.existingMember.role, Validators.required],
        city: [this.existingMember.city,Validators.required],
        picture_url: [this.existingMember.picture_url,Validators.required]
    });
    }

}
