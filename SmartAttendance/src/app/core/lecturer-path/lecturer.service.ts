import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Course} from "../../course";


@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  private apiUrl = 'http://192.168.1.39:3000/api/lecturer-courses'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getCourses(lecturer_id: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/${lecturer_id}`);
  }
}
