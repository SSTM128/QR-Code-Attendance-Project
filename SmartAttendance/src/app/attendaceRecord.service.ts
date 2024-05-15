import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AttendanceRecordService {
  private apiUrl = 'https://api.yourdomain.com/attendance';  // URL to web API
  dates: any[] = ['name', 'position'];  // Array to store dates with static entries
  recordData: any[] = [];  // Array to store formatted attendance records


  constructor(private http: HttpClient) { }

  // getAllDates(): Observable<any[]> {
  //   return this.http.get<any[]>(${this.apiUrl}/dates).pipe(
  //   map(dates => {
  //     // Assuming the API returns an array of date strings
  //     this.dates = [...this.dates, ...dates.sort()]; // Concatenating and sorting dates
  //     return this.dates;
  //   })
  // );
  // }

  // getAttendanceRecords(): Observable<any[]> {
  //   return this.http.get<any[]>(${this.apiUrl}/records).pipe(
  //   map(records => {
  //     this.recordData = records.map((record, index) => ({
  //       position: index + 1,  // Assuming 1-based index for position
  //       name: record.name,
  //       ...record.statuses // Assuming 'statuses' is an object with date keys and status values
  //     }));
  //     return this.recordData;
  //   })
  // );
  // }

  // fetchAndStoreAllData(): void {
  //   this.getAllDates().subscribe(dates => {
  //     this.getAttendanceRecords().subscribe();
  //   }, error => {
  //     console.error('Error fetching dates:', error);
  //   });
  // }
}
