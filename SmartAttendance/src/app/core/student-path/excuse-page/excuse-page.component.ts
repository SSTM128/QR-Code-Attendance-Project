import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Course} from "../../../course";
import {FileUploadService} from "./file-upload.service";

@Component({
  selector: 'app-excuse-page',
  templateUrl: './excuse-page.component.html',
  styleUrl: './excuse-page.component.css'
})
export class ExcusePageComponent {
  selectedFile :File | null=  null;


  excuseForm= new FormGroup({
    id: new FormControl('' , Validators.required),
    name: new FormControl('' , Validators.required),
    date: new FormControl('' , Validators.required),
  });

  constructor(private router: Router
  ,private uploadService: FileUploadService) {
  }

  studentCourses: Course[] = [
    new Course(1, "Mathematics", "S/M 9:45-11:15", 101 , 2 ),
    new Course(2, "Physics", "T/Th 12:30-2:00", 102 , 1),
    new Course(3, "Biology", "W/F 10:00-11:30", 103 , 3),
    new Course(4, "Chemistry",  "T/Th 9:00-10:30", 104 , 4)
  ];

  onFileSelected(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target && target.files) {
        this.selectedFile = target.files[0] ?? null;
      }
      else {
        this.selectedFile = null;
      }
  }

  onUpload() {
    if (this.selectedFile) {
      this.uploadService.uploadFile(this.selectedFile).subscribe(
        response => {
        }
      )
    }
  }

  sendWarning() {
    this.router.navigate(['student-dashboard']);
  }
}
