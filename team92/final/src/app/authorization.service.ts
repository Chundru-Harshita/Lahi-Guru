import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    //get token from session storage
    let token=localStorage.getItem("token")
    //token is there only after login, but intercept gets everyrequest even before login
    if(token){
      //add it to header of req object
      let copyReqObj=req.clone({
        headers:req.headers.set("Authorization","Bearer "+token)
      })
      //pass req obj to server
      return next.handle(copyReqObj)
    }
    else{
      return next.handle(req)
    }
  }
}
