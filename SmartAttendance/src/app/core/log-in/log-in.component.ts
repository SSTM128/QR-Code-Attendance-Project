import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IUserCredentials } from "../../User.module"; // Ensure this path is correct

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  logInForm = new FormGroup({
    id: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  credentials: IUserCredentials = { id: '', password: '' };

  ngOnInit() { }

  constructor(private http: HttpClient, private router: Router) { }

  logIn() {
    this.credentials.id = this.logInForm.get('id')?.value || '';
    this.credentials.password = this.logInForm.get('password')?.value || '';

    this.http.post<{ role: string }>('http://localhost:3000/api/login', this.credentials).subscribe(
      response => {
        if (response.role === 'lecturer') {
          this.router.navigate(['lecturer-dashboard']);
        } else if (response.role === 'student') {
          this.router.navigate(['student-dashboard']);
        } else {
          alert('Invalid credentials');
        }
      },
      error => {
        console.error('Login error:', error);
        alert('An error occurred. Please try again.');
      }
    );
  }
}
