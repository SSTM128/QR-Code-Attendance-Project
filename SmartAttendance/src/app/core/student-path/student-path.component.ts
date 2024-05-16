import {Component, OnInit} from '@angular/core';
import {Course} from "../../course";
import {Student} from "../../Student";
import {Router} from "@angular/router";
import {UserService} from "../../user.service";
import {IUserCredentials} from "../../User.module";

@Component({
  selector: 'app-student-path',
  templateUrl: './student-path.component.html',
  styleUrl: './student-path.component.css'
})
export class StudentPathComponent implements OnInit{

  user: IUserCredentials | null = null;

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  studentCourses: Course[] = [
    new Course(1, "Mathematics", "S/M 9:45-11:15", 101 , 2),
    new Course(2, "Physics", "T/Th 12:30-2:00", 102  , 1),
    new Course(3, "Biology", "W/F 10:00-11:30", 103 , 2),
    new Course(4, "Chemistry",  "T/Th 9:00-10:30", 104 , 3)
  ];
  studentInfo = new Student(12345, "John Doe", "john@example.com", "password123", this.studentCourses);

  absentDays: number[] = [2,5,4,3,4,2]

  constructor(private router:Router,
              private userService: UserService) {}

  sendExcuse() {
    this.router.navigate(['student-dashboard/excuse']);

  }
}
