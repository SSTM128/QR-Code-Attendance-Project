import { Component } from '@angular/core';
import {Course} from "../../course";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lecturer-path',
  templateUrl: './lecturer-path.component.html',
  styleUrl: './lecturer-path.component.css'
})
export class LecturerPathComponent {
  lecturerCourses: Course[] = [
    new Course(1, "Mathematics", "S/M 9:45-11:15", 101, 2 ),
    new Course(2, "Physics", "T/Th 12:30-2:00", 102,2 ),
    new Course(3, "Biology", "W/F 10:00-11:30", 103 , 3),
    new Course(4, "Chemistry",  "T/Th 9:00-10:30", 104 , 4)
  ];

  constructor(private router:Router) {
  }
  goToCourse() {
    this.router.navigate(['course']);
  }
}
