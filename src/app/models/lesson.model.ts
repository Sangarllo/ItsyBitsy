import { Teacher } from './teacher.model';

export enum Status {
  Eliminada = 'eliminada',
  Suspendida = 'suspendida',
  Realizada = 'realizada',
  Planificada = 'planificada',
  Futura = 'futura'
}

// TODO: Type (speaking, examen, repaso, especial...)

export interface ILesson {
  courseId: string;
  name: string;
  status: string;
  teacher: string;
  material: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ILessonExtended extends ILesson {
  id: string;
}

export class Lesson implements ILesson {

  public static PATH_URL = 'lessons';

  public static FIELD_ID = 'id';
  public static FIELD_COURSE_ID = 'courseId';
  public static FIELD_NAME = 'name';
  public static FIELD_STATUS = 'status';
  public static FIELD_TEACHER = 'teacher';
  public static FIELD_MATERIAL = 'material';
  public static FIELD_DATE = 'date';
  public static FIELD_START_TIME = 'startTime';
  public static FIELD_END_TIME = 'endTime';

  constructor(
    public id: string,
    public courseId: string,
    public name: string,
    public status: Status,
    public teacher: string,
    public material: string,
    public date: string,
    public startTime: string,
    public endTime: string,
     ) {
  }

  static getAllStatus(): Status[] {
    return [
      Status.Eliminada,
      Status.Suspendida,
      Status.Realizada,
      Status.Planificada,
      Status.Futura,
    ];
  }

  static getDefaultStatus(): string {
    return Status.Planificada;
  }
}
