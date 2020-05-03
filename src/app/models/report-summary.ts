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
