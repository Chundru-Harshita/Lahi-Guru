import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }

  userRegister(userObj):Observable<any>{
    return this.hc.post("/teacher/register",userObj);
  }
  userLogin(userObj):Observable<any>{
    return this.hc.post("/teacher/login",userObj);
  }
  addStudent(userObj):Observable<any>{
    //console.log(userObj)
    return this.hc.post("/teacher/add",userObj);
  }
  sendMessage(userObj):Observable<any>{
    return this.hc.post("/teacher/send",userObj);
  }

}
