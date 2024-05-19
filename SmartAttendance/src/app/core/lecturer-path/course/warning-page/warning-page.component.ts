import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-warning-page',
  templateUrl: './warning-page.component.html',
  styleUrl: './warning-page.component.css'
})
export class WarningPageComponent implements OnInit{
  course_id: string = '';


  warningForm= new FormGroup({
    id: new FormControl('' , Validators.required),
    comments: new FormControl('', Validators.required),
  });

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
  }

constructor(private router: Router,
            private route: ActivatedRoute
) {
}



  SendWarning() {
    this.router.navigate(['lecturer-dashboard/course/:id']);
  }
}
