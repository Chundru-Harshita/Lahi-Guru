import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

interface student {
  className: string;
  name: string;
  mobileNo: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  className: string = "";
  classes: string[] = [];
  dateTime: string = "";
  timings: string[] = [];
  arr: string[] = [];
  month: object;
  addStudentData(student) {
    let studentObj=student.value
    //console.log(studentObj);
    this.us.addStudent(studentObj).subscribe(
      res=>{
        if(res["message"]=="failed"){
          alert("Student already exists");
        }
        if(res["message"]=="success"){
          alert("Successss");
        }
        if(res["message"]=="Unauthorised access"){
          alert("Unauthorised access");
        }
        if(res["message"]=="Session expired. Login again"){
          alert("Session expired. Login again");
        }
      },
      err=>{
        alert("Something went wrong in adding student")
        console.log(err)
      }
    )
  }
  // showDate(ref:object) {
  //   console.log(ref);
  // }
  formatDateTime(ref) {
    this.dateTime = ref["timings"];
    this.timings = this.dateTime.split("T");
    this.arr = this.timings[0].split("-");
    this.month = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12":"Dec"
    }
    ref["timings"] = this.arr[2] + " " + this.month[this.arr[1]] + " " + this.arr[0] + " " + this.timings[1] + " GMT+5:30";
    this.us.sendMessage(ref).subscribe(
      res=>{
        if(res["message"]=="success"){
          alert("Successss");
        }
      },
      err=>{
        alert("Something went wrong in sending message")
        console.log(err)
      }
    )
    //console.log(ref["timings"]);
  }
  logOut(){
    //remover token
    localStorage.clear();
    //navogate to home
    this.router.navigateByUrl("/register")
  }
}
