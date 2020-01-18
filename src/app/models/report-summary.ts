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
