import {Component, OnInit} from '@angular/core';
import {Course} from "../../course";
import {Router} from "@angular/router";
import {IUserCredentials} from "../../User.module";
import {UserService} from "../../user.service";
import {LecturerService} from "./lecturer.service";

@Component({
  selector: 'app-lecturer-path',
  templateUrl: './lecturer-path.component.html',
  styleUrl: './lecturer-path.component.css'
})
export class LecturerPathComponent implements OnInit{
  user: IUserCredentials | null = null;
  lecturerCourses: Course[] = [];

  ngOnInit() {
    this.user = this.userService.getUser();

    if (this.user && this.user.id) {
      this.lecturerService.getCourses(this.user.id).subscribe(
        courses => {
          this.lecturerCourses = courses;
          console.log(this.lecturerCourses[0].name);
        },
        error => {
          console.error('Error fetching courses:', error);
        }
      );
    }
  }




  constructor(private lecturerService : LecturerService
              , private router:Router,
              private userService: UserService
  ) {
  }
  goToCourse(course: Course) {
    this.router.navigate([`lecturer-dashboard/course/${course.course_id}`]);
  }
}
