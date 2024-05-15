export class AttendanceRecord {
  recordID: number;
  studentID: number;
  courseID: number;
  dateOfAttendance: Date;
  status: string;

  constructor(recordID: number, studentID: number, courseID: number, dateOfAttendance: Date, status: string) {
    this.recordID = recordID;
    this.studentID = studentID;
    this.courseID = courseID;
    this.dateOfAttendance = dateOfAttendance;
    this.status = status;
  }
}
