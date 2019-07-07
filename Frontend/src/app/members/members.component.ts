import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { HttpClientService } from '../services/http-client.service';
import { Member } from '../models/member';
import { MemberPage } from '../models/member.page';
import {PageEvent} from '@angular/material/paginator';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { MatDialog,MatPaginator,MatSnackBar } from '@angular/material/';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { AddNewDialogComponent } from '../add-new-dialog/add-new-dialog.component';







@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit,OnDestroy {
  
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

  defaultAvatar = "./assets/images/profile.jpeg";
  members : Member[];
  page : MemberPage;
  startingPage : number = 0;
  membersLength : number = 0;
  columns : number = 4;
  activeMediaQuery: string = "";
  pageSize : number = 8;
  
  watcher: Subscription;

  search: string = "";

  getMembers(): void {
    this.httpClient.getMembers()
        .subscribe( data => {
          this.members = data;
        },
        err => {
          this.openSnackBar("Oops,somethimg went wrong!");
        });
          
}

getMembersPaged(page:number,size:number,search:string): void {
  this.httpClient.getMembersPage(page,size,search)
      .subscribe( data => {
        this.page = data;
        this.membersLength = data.totalElements;
        if(this.membersLength == 0){
          this.openSnackBar("No data for this search criteria!");
        }

        this.paginator.pageSize = this.pageSize;
        if(this.pageSize>this.membersLength){
          this.paginator.pageSize = this.membersLength;
        }

      },
      err => {
        this.openSnackBar("Oops,somethimg went wrong!");
      });
        
}

saveMember(member:Member): void {
  this.httpClient.saveMember(member)
      .subscribe( data => {
        this.openSnackBar("Member sucessfully saved");
        this.getMembersPaged(this.startingPage,this.pageSize,this.search);
        this.paginator.pageIndex = 0;
      },
      err => {
        console.log(err);
        
        this.openSnackBar("Oops,something went wrong! "+ err.error.message);
      });
        
}

editMember(id:number,member:Member): void {
  this.httpClient.editMember(id,member)
      .subscribe( data => {
        this.openSnackBar("Member sucessfully edited");
        this.getMembersPaged(this.startingPage,this.pageSize,this.search);
        this.paginator.pageIndex = 0;
      },
      err => {
        console.log(err);
        
        this.openSnackBar("Oops,somethimg went wrong!");
      });
        
}

deleteMember(id:number): void {
  this.httpClient.deleteMember(id)
      .subscribe( data => {
        this.openSnackBar("Member sucessfully deleted");
        this.getMembersPaged(this.startingPage,this.pageSize,this.search);
        this.paginator.pageIndex = 0;
      },
      err => {
        this.openSnackBar("Oops,somethimg went wrong!");
      });
        
}

filterMembers():void {
 
    this.getMembersPaged(this.startingPage,this.pageSize,this.search);
    this.paginator.pageIndex = 0;
  
}

  paginate(event: PageEvent) {
  this.getMembersPaged(event.pageIndex,this.pageSize,this.search);
  }

  constructor( private httpClient:HttpClientService, private md:MediaObserver,private snackBar: MatSnackBar,public dialog: MatDialog) {

    this.watcher = md.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if ( change.mqAlias == 'xs' || change.mqAlias == 'sm') {
        this.columns=2;
      }else {
        this.columns = 4;
      }
    });

    
    
   }

   openSnackBar(message:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
    duration: 5000,
    horizontalPosition: 'left',
    panelClass: ['snackbar-color'],
    data: message,
    });
  }

  addorEditNewMember(member:Member,event): void {
    const elementId: string = (event.currentTarget as Element).id;
    let data = {
      "tittle" :"Add new member",
      "button": "Save",
      "member": null,
      "show_delete":false
    }
    if(elementId != "add"){
      data.tittle ="Edit member";
      data.button = "Edit";
      data.member = member;
      data.show_delete = true;
    }
    
    const dialogRef = this.dialog.open(AddNewDialogComponent, {
      width: '500px',
      data: data
    });
    

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
       if (typeof result == 'number') {
         this.deleteMember(result);
         
       }else if(result.id == null){
        this.saveMember(result);
      }else{
        this.editMember(result.id,result);
      }
        
  
      }
    });
  }

  ngOnInit() {

   this.getMembersPaged(this.startingPage,this.pageSize,this.search);
  
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }
  

}
