import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {IUserCredentials} from "../../User.module";
import {UserService} from "../../user.service";
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{
  logInForm= new FormGroup({
    id: new FormControl('' , Validators.required),
    password: new FormControl('' , Validators.required),

  });

  credentials:IUserCredentials = {id : '' , password : ''};
  ngOnInit() {
  }

  constructor(private UserService: UserService,
              private http: HttpClient,
              private router: Router
  ) {

  }

  logIn() {
    this.router.navigate(['lecturer-dashboard']);
    // this.UserService.login(this.credentials).subscribe(
      // {next: (user) => {
      //     if (user.role === 'student') {
      //       this.router.navigate(['/student']);
      //     } else if (user.role === 'lecturer') {
      //       this.router.navigate(['/lecturer']);
      //     }
      //   },
      //   error: (error) => {
      //     console.error('Login error:', error);
      //   }
      // }
    // )
  }
}
