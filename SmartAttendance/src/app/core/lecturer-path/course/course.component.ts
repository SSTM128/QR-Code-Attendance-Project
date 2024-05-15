import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface AttendanceRecord {
  date: string;
  status: string;
}

interface StudentAttendance {
  student_id: string;
  name: string;
  attendances: AttendanceRecord[];
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  displayedColumns: string[] = ['student_id', 'name', '12/5', '14/5', '16/5', '18/5', '20/5', '22/5'];
  dataSource: any[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchAttendanceRecords();
  }

  fetchAttendanceRecords(): void {
    this.http.get<StudentAttendance[]>('http://localhost:3000/attendances/')
      .subscribe(data => {
        console.log('Fetched data:', data);
        this.dataSource = data.map(record => ({
          student_id: record.student_id,
          name: record.name,
          '12/5': record.attendances.find(a => a.date === '12/5')?.status || 'N/A',
          '14/5': record.attendances.find(a => a.date === '14/5')?.status || 'N/A',
          '16/5': record.attendances.find(a => a.date === '16/5')?.status || 'N/A',
          '18/5': record.attendances.find(a => a.date === '18/5')?.status || 'N/A',
          '20/5': record.attendances.find(a => a.date === '20/5')?.status || 'N/A',
          '22/5': record.attendances.find(a => a.date === '22/5')?.status || 'N/A',
        }));
        console.log('Processed dataSource:', this.dataSource);
      }, error => {
        console.error('Failed to fetch attendance records:', error);
      });
  }

  sendWarning() {
    this.router.navigate(['warning']);
  }

  generateQrCodePage() {
    this.router.navigate(['qr-generation']);
  }
}
