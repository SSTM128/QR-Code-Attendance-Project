import { Component } from '@angular/core';
import {IUserCredentials} from "../../../../User.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-warning-page',
  templateUrl: './warning-page.component.html',
  styleUrl: './warning-page.component.css'
})
export class WarningPageComponent {

  warningForm= new FormGroup({
    id: new FormControl('' , Validators.required),
    name: new FormControl('', Validators.required),
    comments: new FormControl('', Validators.required),
  });

constructor(private router: Router) {
}

  SendWarning() {
    this.router.navigate(['lecturer-dashboard/course/:id/:section']);
  }
}
