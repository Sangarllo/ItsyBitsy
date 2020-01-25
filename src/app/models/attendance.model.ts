export enum Status {
  Prevista = 'prevista',
  Programada = 'programada',
  Ausente = 'ausente',
  Presente = 'presente'
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
      Status.Prevista,
      Status.Ausente,
      Status.Presente,
    ];
  }

  static toStatus(value: string): Status {
    switch (value) {
      case 'programada':
          return Status.Prevista;
      case 'ausente':
          return Status.Ausente;
      case 'presente':
          return Status.Presente;
      default:
          return Status.Prevista;
    }
  }

  static getDefaultStatus(): string {
    return Status.Prevista;
  }
}
