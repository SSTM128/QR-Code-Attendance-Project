import {Component, OnInit} from '@angular/core';
import {Course} from "../../course";
import {Student} from "../../Student";
import {Router} from "@angular/router";
import {UserService} from "../../user.service";
import {IUserCredentials} from "../../User.module";
import {studentService} from "./student.service";

@Component({
  selector: 'app-student-path',
  templateUrl: './student-path.component.html',
  styleUrl: './student-path.component.css'
})
export class StudentPathComponent implements OnInit{

  user: IUserCredentials | null = null;
  studentCourses: Course[] = [];

  ngOnInit() {
    this.user = this.userService.getUser();
    if (this.user && this.user.id) {
      this.studentService.getCourses(this.user.id).subscribe(
        courses => {
          this.studentCourses = courses;
        },
        error => {
          console.error('Error fetching courses:', error);
        }
      );
    }
  }


  constructor(private studentService : studentService,
              private router:Router,
              private userService: UserService) {}

  sendExcuse() {
    this.router.navigate(['student-dashboard/excuse']);

  }
}
