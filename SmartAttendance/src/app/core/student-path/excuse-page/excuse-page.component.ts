import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Course} from "../../../course";
import {FileUploadService} from "./file-upload.service";
import {UserService} from "../../../user.service";
import {IUserCredentials} from "../../../User.module";
import {studentService} from "../student.service";

@Component({
  selector: 'app-excuse-page',
  templateUrl: './excuse-page.component.html',
  styleUrl: './excuse-page.component.css'
})
export class ExcusePageComponent implements OnInit{
  selectedFile :File | null=  null;
  user : IUserCredentials | null = null;
  courses : Course[] = []


  ngOnInit() {
    this.user = this.userService.getUser();
    if (this.user && this.user.id) {
      this.studentService.getCourses(this.user.id).subscribe(
        courses => {
          this.courses = courses;
          console.log('here');
        },
        error => {
          console.error('Error fetching courses:', error);
        }
      );
    }
  }


  excuseForm= new FormGroup({
    course_id : new FormControl("", [Validators.required]),
    date: new FormControl('' , Validators.required),
    reason: new FormControl("", [Validators.required]),
  });

  constructor(private router: Router,
              private uploadService: FileUploadService,
              private userService: UserService,
              private studentService : studentService
              ) {
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      this.selectedFile = target.files[0] ?? null;
    } else {
      this.selectedFile = null;
    }
  }

  sendWarning() {
    if (this.excuseForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('course_id', this.excuseForm.get('course_id')?.value ?? '');
      formData.append('date', this.excuseForm.get('date')?.value ?? '');
      formData.append('reason', this.excuseForm.get('reason')?.value ?? '');
      // formData.append('file', this.selectedFile);

      this.uploadService.uploadFile(formData).subscribe(
        response => {
          console.log('Upload successful', response);
        },
        error => {
          console.error('Upload failed', error);
        });
    } else {
      console.warn('Form is invalid or no file selected');
    }
    this.router.navigate(['student-dashboard']);
  }
}
