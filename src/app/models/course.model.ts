import { Teacher } from './teacher.model';
import { UserDetails } from './user.model';

export enum WeekDay {
  Lunes = 'lunes',
  Martes = 'martes',
  Miercoles = 'miercoles',
  Jueves = 'jueves',
  Viernes = 'viernes',
  Sábado = 'sábado',
  Domingo = 'domingo'
}


export interface ICourse {
  current: boolean;
  name: string;
  image: string;
  weekDay: WeekDay;
  startTime: string;
  endTime: string;
  teacherId: string;
  studentList: UserDetails[];
  lastLesson?: string;
  nextLesson?: string;
}

export interface ICourseExtended extends ICourse {
  id: string;
}

export class Course implements ICourse {

  public static PATH_URL = 'cursos';

  public static FIELD_ID = 'id';
  public static FIELD_CURRENT = 'current';
  public static FIELD_NAME = 'name';
  public static FIELD_IMAGE = 'image';
  public static FIELD_WEEK_DAY = 'weekDay';
  public static FIELD_START_TIME = 'startTime';
  public static FIELD_END_TIME = 'endTime';
  public static FIELD_TEACHER_ID = 'teacherId';
  public static FIELD_STUDENT_LIST = 'studentList';
  public static FIELD_LAST_LESSON = 'lastLesson';
  public static FIELD_NEXT_LESSON = 'nextLesson';

  constructor(
    public id: string,
    public current: boolean,
    public name: string,
    public image: string,
    public weekDay: WeekDay,
    public startTime: string,
    public endTime: string,
    public teacherId: string,
    public studentList: UserDetails[],
    public lastLesson: string,
    public nextLesson: string
     ) {
  }

  static getAllWeekDay(): WeekDay[] {
    return [
      WeekDay.Lunes,
      WeekDay.Martes,
      WeekDay.Miercoles,
      WeekDay.Jueves,
      WeekDay.Viernes,
      WeekDay.Sábado,
      WeekDay.Domingo
    ];
  }

  static getDefaultWeekDay(): WeekDay {
    return WeekDay.Lunes;
  }
}
