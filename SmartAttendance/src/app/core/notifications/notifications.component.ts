import {Component, OnInit} from '@angular/core';
import {Notification} from "../../notification";
import {NotificationService} from "../../notification.service";
import {UserService} from "../../user.service";
import {IUserCredentials} from "../../User.module";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
  notifications: Notification[] = []
  user : IUserCredentials | null = null;

  constructor(private notificationService: NotificationService,
              private userService: UserService,) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();

    if (this.user && this.user.id) {
      this.notificationService.getNotifications(this.user.id).subscribe(
        notifications => {
          this.notifications = notifications;
        },
        error => {
          console.error('Error fetching attendances:', error);
        }
      );
    }
  }
}
