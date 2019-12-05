export enum Status {
  Eliminada = 'eliminada',
  Anulada = 'anulada',
  Programada = 'programada',
  Ausentada = 'ausentada',
  Confirmada = 'confirmada'
}

export interface IAttendance {
  id: string;
  current: boolean;
  courseId: string;
  courseName: string;
  lessonId: string;
  lessonDate: Date;
  studentId: string;
  studentName: string;
  studentImage: string;
  status: string;
  comment: string;
}

export class Attendance implements IAttendance {

  public static PATH_URL = 'asistencias';

  public static FIELD_ID = 'id';
  public static FIELD_CURRENT = 'current';
  public static FIELD_COURSE_ID = 'courseId';
  public static FIELD_COURSE_NAME = 'courseName';
  public static FIELD_LESSON_ID = 'lessonId';
  public static FIELD_LESSON_DATE = 'lessonDate';
  public static FIELD_STUDENT_ID = 'studentId';
  public static FIELD_STUDENT_NAME = 'studentName';
  public static FIELD_STUDENT_DISPLAY = 'studentDisplay';
  public static FIELD_STATUS = 'status';
  public static FIELD_COMMENT = 'comment';

  constructor(
    public id: string,
    public current: boolean,
    public courseId: string,
    public courseName: string,
    public lessonId: string,
    public lessonDate: Date,
    public studentId: string,
    public studentName: string,
    public studentImage: string,
    public status: Status,
    public comment: string,
     ) {
  }

  static getAllStatus(): Status[] {
    return [
      Status.Eliminada,
      Status.Anulada,
      Status.Programada,
      Status.Ausentada,
      Status.Confirmada,
    ];
  }

  static toStatus(value: string): Status {
    switch (value) {
      case 'eliminada':
        return Status.Eliminada;
      case 'anulada':
        return Status.Anulada;
      case 'programada':
          return Status.Programada;
      case 'ausentada':
          return Status.Ausentada;
      case 'confirmada':
          return Status.Confirmada;
      default:
          return Status.Programada;
    }
  }

  static getDefaultStatus(): string {
    return Status.Programada;
  }
}
