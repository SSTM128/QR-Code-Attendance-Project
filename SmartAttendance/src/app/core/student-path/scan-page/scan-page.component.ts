import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import {IUserCredentials} from "../../../User.module";
import {QrCodeService} from "../../../qr-code.service";
import {UserService} from "../../../user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router"; // Assuming you have a user service to get the student ID

@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.css']
})
export class ScanPageComponent implements OnInit {
  passcode = ''
  course_id= ''
  date= ''

  updateForm = new FormGroup({
    student_id: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qrCodeService: QrCodeService
  ) {

  }

  ngOnInit(): void {
    this.passcode = this.route.snapshot.queryParamMap.get('passcode') || '';
    this.course_id = this.route.snapshot.queryParamMap.get('course_id') || '';
    this.date = this.route.snapshot.queryParamMap.get('date') || '';
  }

  submit() {
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;
      if (formData && formData.student_id) {
      this.qrCodeService.updateAttendance(formData.student_id, this.course_id, this.date, this.passcode).subscribe(
        response => {
          console.log('Submission successful', response);
          // Redirect or show a success message
        },
        error => {
          console.error('Submission failed', error);
        }
      );
    }
  }
  }
}
