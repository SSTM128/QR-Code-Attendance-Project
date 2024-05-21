import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserCredentials } from '../../../User.module';
import { UserService } from '../../../user.service';
import { AttendanceService } from '../../../attendaceRecord.service';

interface AttendanceRecord {
  date: string;
  status: string;
}

interface StudentAttendance {
  student_id: string;
  name: string;
  absent_count: string; // Make absent_days optional
  attendances: AttendanceRecord[];
  [key: string]: any; // To allow dynamic keys for dates
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  displayedColumns: string[] = ['student_id', 'name', 'absent_days'];
  dataSource: StudentAttendance[] = [];
  user: IUserCredentials | null = null;
  course_id: string = '';

  constructor(
    private userService: UserService,
    private attendanceService: AttendanceService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null) {
      this.course_id = idParam;
    } else {
      console.error('Invalid route parameters');
    }

    this.fetchAttendanceRecords();
  }

  fetchAttendanceRecords(): void {
    if (this.user && this.user.id) {
      this.attendanceService.getAttendances(this.user.id, this.course_id).subscribe(
        attendances => {
          this.transformAttendanceData(attendances);
        },
        error => {
          console.error('Error fetching attendances:', error);
        }
      );
    }
  }

  transformAttendanceData(attendances: StudentAttendance[]): void {
    const transformedData: StudentAttendance[] = attendances.map(att => {
      const record: any = {
        student_id: att.student_id,
        name: att.name,
        absent_count: att.absent_count // Ensure absent_days is included and default to '0' if missing
      };

      att.attendances.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).forEach(a => {
        record[a.date] = a.status;
        if (!this.displayedColumns.includes(a.date)) {
          this.displayedColumns.push(a.date);
        }
      });

      return record;
    });

    this.dataSource = transformedData;
    this.cdr.detectChanges(); // Notify Angular of the changes
  }

  sendWarning() {
    this.router.navigate([`lecturer-dashboard/course/${this.course_id}/warning`]);
  }

  generateQrCodePage() {
    this.router.navigate([`lecturer-dashboard/course/${this.course_id}/qr-generation`]);
  }
}
