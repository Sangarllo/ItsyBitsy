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
  courseName: string;
  date: string;
  schedule: string;
  classRoom: string;
  studentNames: string[];
}

export interface RateData {
  name: string;
  type: string;
  price: number;
  studentNames: string[];
}

export interface CourseData {
  name: string;
  type: string;
  schedule: string;
  teacher: string;
  nStudents: number;
}

export interface AttendanceData {
  status: string;
  lessonDate: Date;
  studentName: string;
  courseName: string;
  // comment: string
}
