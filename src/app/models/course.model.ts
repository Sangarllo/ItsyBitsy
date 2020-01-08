import { UserDetails } from './user.model';
import { ClassRoom } from './classroom';

export enum WeekDay {
  Lunes = 'lunes',
  Martes = 'martes',
  Miércoles = 'miércoles',
  Jueves = 'jueves',
  Viernes = 'viernes',
  Sábado = 'sábado',
  Domingo = 'domingo'
}

export enum CourseType {
  Infantil = 'infantil',
  Primaria = 'primaria',
  Ket = 'ket',
  Pet = 'pet',
  Fce = 'fce',
  Advanced = 'advanced',
  Repaso = 'repaso',
  Otros = 'otro'
}


export interface ICourse {
  current: boolean;
  name: string;
  type: CourseType;
  image: string;
  weekDay: WeekDay;
  startTime: string;
  endTime: string;
  teacherId: string;
  classRoom: ClassRoom;
  studentList: UserDetails[];
  lastLessonStatus?: string;
  lastLesson?: Date;
  lastLessonId?: string;
  nextLessonStatus?: string;
  nextLesson?: Date;
  nextLessonId?: string;
}

export class Course implements ICourse {

  public static PATH_URL = 'cursos';

  public static FIELD_ID = 'id';
  public static FIELD_CURRENT = 'current';
  public static FIELD_NAME = 'name';
  public static FIELD_TYPE = 'type';
  public static FIELD_IMAGE = 'image';
  public static FIELD_WEEK_DAY = 'weekDay';
  public static FIELD_START_TIME = 'startTime';
  public static FIELD_END_TIME = 'endTime';
  public static FIELD_TEACHER_ID = 'teacherId';
  public static FIELD_CLASS_ROOM = 'classRoom';
  public static FIELD_STUDENT_LIST = 'studentList';
  public static FIELD_LAST_LESSON = 'lastLesson';
  public static FIELD_NEXT_LESSON = 'nextLesson';

  constructor(
    public id: string,
    public current: boolean,
    public name: string,
    public type: CourseType,
    public image: string,
    public weekDay: WeekDay,
    public startTime: string,
    public endTime: string,
    public teacherId: string,
    public classRoom: ClassRoom,
    public studentList: UserDetails[],
    public lastLessonStatus?: string,
    public lastLesson?: Date,
    public lastLessonId?: string,
    public nextLessonStatus?: string,
    public nextLesson?: Date,
    public nextLessonId?: string
     ) {
  }

  static getAllWeekDay(): WeekDay[] {
    return [
      WeekDay.Lunes,
      WeekDay.Martes,
      WeekDay.Miércoles,
      WeekDay.Jueves,
      WeekDay.Viernes,
      WeekDay.Sábado,
      WeekDay.Domingo
    ];
  }

  static getDefaultWeekDay(): WeekDay {
    return WeekDay.Lunes;
  }

  static getWeekDayNumber(weekday: WeekDay): number {
    switch (weekday) {
      case WeekDay.Lunes:
        return 1;
      case WeekDay.Martes:
        return 2;
      case WeekDay.Miércoles:
        return 3;
      case WeekDay.Jueves:
        return 4;
      case WeekDay.Viernes:
        return 5;
      case WeekDay.Sábado:
        return 6;
      case WeekDay.Domingo:
      default:
        return 0;
    }
  }

  static getAllCourseType(): CourseType[] {
    return [
      CourseType.Infantil,
      CourseType.Primaria,
      CourseType.Ket,
      CourseType.Pet,
      CourseType.Fce,
      CourseType.Advanced,
      CourseType.Repaso,
      CourseType.Otros,
    ];
  }

  static getDefaultCourseType(): CourseType {
    return CourseType.Otros;
  }


  static getAllClassRoom(): ClassRoom[] {
    return [
      ClassRoom.A1,
      ClassRoom.A2,
      ClassRoom.A3
    ];
  }

  static getDefaultClassRoom(): ClassRoom {
    return ClassRoom.A1;
  }

}
