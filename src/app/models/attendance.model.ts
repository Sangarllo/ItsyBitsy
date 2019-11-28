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
  studentId: string;
  studentName: string;
  studentImage: string;
  lessonId: string;
  status: string;
  comment: string;
}

export class Attendance implements IAttendance {

  public static PATH_URL = 'asistencias';

  public static FIELD_ID = 'id';
  public static FIELD_CURRENT = 'current';
  public static FIELD_LESSON_ID = 'lessonId';
  public static FIELD_STUDENT_ID = 'studentId';
  public static FIELD_STUDENT_NAME = 'studentName';
  public static FIELD_STUDENT_DISPLAY = 'studentDisplay';
  public static FIELD_STATUS = 'status';
  public static FIELD_COMMENT = 'comment';

  constructor(
    public id: string,
    public current: boolean,
    public lessonId: string,
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
