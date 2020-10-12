export interface ReportSummary {
  info: string;
  nAttendances: number;
  nAttendancesConfirmed: number;
  courses?: string[];
}

export interface ReceiptData {
  studentName: string;
  paymentAmmout: string;
  month: string;
  year: string;
}

export interface WeekLessonsData {
  teacherName: string;
  date: string;
  schedule: string;
  courseName: string;
  classRoom: string;
  studentNames: string[];
}

export interface RateData {
  name: string;
  type: string;
  price: number;
  studentNames: string[];
}

export interface RateUsersData {
  name: string;
  type: string;
  price: number;
  studentNames: string[];
}

export interface CourseData {
  type: string;
  name: string;
  scheduleDay: string;
  scheduleTime: string;
  teacher: string;
  nStudents: number;
}

export interface AttendanceData {
  status: string;
  lessonDate: Date;
  studentName: string;
  courseName: string;
  comment: string;
}

export interface CommentData {
  lessonDate: Date;
  courseName: string;
  studentName: string;
  comment: string;
}
