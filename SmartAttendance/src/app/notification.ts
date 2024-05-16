export class Notification {
  notificationId: number;
  recipientId: number;
  recipientName: string;
  message: string;
  dateSent: string;

  constructor(notificationId: number, recipientId: number, message: string , recipientName: string ) {
    this.notificationId = notificationId;
    this.recipientId = recipientId;
    this.recipientName = recipientName;
    this.message = message;
    this.dateSent = this.formatDate(new Date());
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
