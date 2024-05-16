import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  constructor(private router: Router, private user: UserService) {}
  signout(){
    this.router.navigate(['log-in']);
    this.user.clearUser();
  }
}
