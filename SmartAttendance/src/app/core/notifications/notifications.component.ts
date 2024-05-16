import { Component } from '@angular/core';
import {Notification} from "../../notification";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications: Notification[] = [
    new Notification(1 , 2 , 'I was Sick', 'Ahmad Mahmoud' ),
    new Notification(1 , 2 , 'I was Sick', 'Ahmad Mahmoud' ),
    new Notification(1 , 2 , 'I was Sick', 'Ahmad Mahmoud' ),
    new Notification(1 , 2 , 'I was Sick', 'Ahmad Mahmoud' ),
    new Notification(1 , 2 , 'I was Sick', 'Ahmad Mahmoud' ),
    new Notification(1 , 2 , 'I was Sick', 'Ahmad Mahmoud' ),
  ]

}
