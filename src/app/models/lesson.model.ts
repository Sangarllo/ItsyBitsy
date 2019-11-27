import { Attendance } from './attendance.model';

export enum Status {
  Eliminada = 'eliminada',
  Programada = 'programada',
  Anulada = 'anulada',
  Realizada = 'realizada',
}

// TODO: Type (speaking, examen, repaso, especial...)

export interface ILesson {
  current: boolean;
  courseId: string;
  status: string;
  date: Date;
  teacherId: string;
  material: string;
  startTime: string;
  endTime: string;
  attendanceList: Attendance[];
}

export interface ILessonExtended extends ILesson {
  id: string;
}

export class Lesson implements ILesson {

  public static PATH_URL = 'lessons';

  public static FIELD_ID = 'id';
  public static FIELD_CURRENT = 'current';
  public static FIELD_COURSE_ID = 'courseId';
  public static FIELD_STATUS = 'status';
  public static FIELD_DATE = 'date';
  public static FIELD_TEACHER_ID = 'teacherId';
  public static FIELD_MATERIAL = 'material';
  public static FIELD_START_TIME = 'startTime';
  public static FIELD_END_TIME = 'endTime';
  public static FIELD_ATTENDANCE_LIST = 'attendanceList';

  constructor(
    public id: string,
    public current: boolean,
    public courseId: string,
    public date: Date,
    public status: Status,
    public teacherId: string,
    public material: string,
    public startTime: string,
    public endTime: string,
    public attendanceList: Attendance[]
     ) {
  }

  static getAllStatus(): Status[] {
    return [
      Status.Eliminada,
      Status.Programada,
      Status.Anulada,
      Status.Realizada
    ];
  }

  static getDefaultStatus(): string {
    return Status.Programada;
  }
}
