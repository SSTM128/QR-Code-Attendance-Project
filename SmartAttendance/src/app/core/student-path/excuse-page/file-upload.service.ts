import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = 'https://your-backend-url/upload';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders().append('Content-Type', 'multipart/form-data');

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
