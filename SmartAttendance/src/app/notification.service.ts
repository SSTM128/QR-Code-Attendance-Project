import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from './notification'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/api/notifications'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getNotifications(recipient_id: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/${recipient_id}`);
  }
}
