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
  PrimariaStarters = 'primaria starters',
  PrimariaMovers = 'primaria movers',
  PrimariaFlyers = 'primaria flyers',
  Ket = 'ket',
  Pet = 'pet',
  Fce = 'fce',
  Advanced = 'advanced',
  Repaso = 'repaso',
  RepasoPrimaria = 'repaso primaria',
  RepasoSecundaria = 'repaso secundaria',
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
      CourseType.PrimariaStarters,
      CourseType.PrimariaMovers,
      CourseType.PrimariaFlyers,
      CourseType.Ket,
      CourseType.Pet,
      CourseType.Fce,
      CourseType.Advanced,
      CourseType.Repaso,
      CourseType.RepasoPrimaria,
      CourseType.RepasoSecundaria,
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
