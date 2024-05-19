// src/app/attendance.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AttendanceRecord {
  date: string;
  status: string;
}

interface StudentAttendance {
  student_id: string;
  name: string;
  attendances: AttendanceRecord[];
}
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:3000/api/lecturer-course-attendance'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getAttendances(lecturer_id: string, course_id: string): Observable<StudentAttendance[]> {
    return this.http.get<StudentAttendance[]>(`${this.apiUrl}/${lecturer_id}/${course_id}`);
  }
}
