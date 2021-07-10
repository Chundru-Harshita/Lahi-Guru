import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(formRef){
    let userObj=formRef.value;
    this.us.userRegister(userObj).subscribe(
      res=>{
        if(res["message"]=="failed"){
          alert("Username is already existed");
        }
        if(res["message"]=="success"){
          alert("Successss");
          //navigate to login component
          this.router.navigateByUrl("/login")
        }
      },
      err=>{
        alert("Something went wrong in registeration")
        console.log(err)
      }
    )
  }

}
