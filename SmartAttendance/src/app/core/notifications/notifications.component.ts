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
  notifications: Notification[] = [];
  user : IUserCredentials | null = null;

  constructor(private notificationService: NotificationService,
              private userService: UserService,) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (this.user){
    const recipient_id = this.user.id; // Replace with actual recipient_id
    this.notificationService.getNotifications(recipient_id).subscribe(
      notifications => {
        this.notifications = notifications;
      },
      error => {
        console.error('Error fetching notifications:', error);
      });
    }
  }

  downloadFile(filename: string): void {
    this.notificationService.getFile(filename).subscribe(
      response => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
      },
      error => {
        console.error('Error downloading file:', error);
      }
    );
  }
}
