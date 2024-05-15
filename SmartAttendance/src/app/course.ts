export class Course {
  courseID: number;
  courseName: string;
  courseCode: string;
  lecturerID: number;
  section: number;


  constructor(courseID: number, courseName: string, courseCode: string, lecturerID: number, section: number) {
    this.courseID = courseID;
    this.courseName = courseName;
    this.courseCode = courseCode;
    this.lecturerID = lecturerID;
    this.section = section;
  }
}
