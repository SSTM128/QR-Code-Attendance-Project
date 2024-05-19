import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = 'https://your-backend-url/upload'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
