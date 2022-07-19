import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(userCredentialsObj){

      this.us.userLogin(userCredentialsObj).subscribe(
        res=>{
          if(res["message"]=="Invalid username"){
            alert("Invalid username")
          }
          if(res["message"]=="Invalid password"){
            alert("Invalid password")
          }
          if(res["message"]=="login success"){
            //store jwt in broswer memory
            localStorage.setItem("token",res["jwt"])
            let userObj=JSON.stringify(res["userObj"])
            localStorage.setItem("user",userObj)
            //navigate to user dashboard
            this.router.navigateByUrl("/admin")
          }
        },
        err=>{
          alert("something went wrong with user login")
        }
      )
  }

}
