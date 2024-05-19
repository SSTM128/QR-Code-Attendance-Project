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

  studentCourses: Course[] = [];

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
