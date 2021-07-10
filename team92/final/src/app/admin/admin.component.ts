import { Component } from '@angular/core';

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

export class AdminComponent {
  className: string = "";
  classes: string[] = [];
  dateTime: string = "";
  timings: string[] = [];
  arr: string[] = [];
  month: object;
  addStudentData(studentObj: object) {
    console.log(studentObj);
  }
  showDate(ref:object) {
    console.log(ref);
  }
  formatDateTime(ref: object) {
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
    console.log(ref["timings"]);
  }
}
