import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member';
import { MemberPage } from '../models/member.page';


import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  url = 'http://localhost:8080/tarmac';

  constructor(private http: HttpClient) { }

  public getMembers(): Observable<Member[]>{
    return this.http.get<Member[]>(this.url+'/members');
  }

  public getMembersPage(page:number,size:number,search:string): Observable<MemberPage>{
    let baseUrl = this.url+'/members/get?page='+page+'&size='+size;
    if(search != ""){
      return this.http.get<MemberPage>(baseUrl+'&search='+search);
    }
    return this.http.get<MemberPage>(baseUrl);
  }

  public saveMember(member:Member): Observable<Member>{
    return this.http.post<Member>(this.url+'/members/',member);
  }

  public editMember(id:number,member:Member): Observable<Member>{
    return this.http.put<Member>(this.url+'/members/'+id,member);
  }
  public deleteMember(id:number): Observable<Member>{
    return this.http.delete<Member>(this.url+'/members/'+id);
  }
  
}
