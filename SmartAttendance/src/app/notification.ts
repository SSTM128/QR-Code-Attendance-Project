export class Notification {
  notificationId: number;
  recipientId: number;
  message: string;
  dateSent: Date;

  constructor(notificationId: number, recipientId: number, message: string) {
    this.notificationId = notificationId;
    this.recipientId = recipientId;
    this.message = message;
    this.dateSent = new Date();
  }
}
