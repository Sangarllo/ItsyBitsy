import { ClassRoom } from './classroom';
import { Attendance } from './attendance.model';

// TODO: Type (speaking, examen, repaso, especial...)

export interface ILesson {
  id: string;
  current: boolean;
  courseId: string;
  date: Date;
  teacherId: string;
  classRoom: ClassRoom;
  material: string;
  startTime: string;
  endTime: string;
  attendancesIds: string[];
  attendancesNames: string[];
  courseName?: string;
  courseImage?: string;
  attendances?: Attendance[];
}

export class Lesson implements ILesson {

  public static PATH_URL = 'lessons';

  public static FIELD_ID = 'id';
  public static FIELD_CURRENT = 'current';
  public static FIELD_COURSE_ID = 'courseId';
  public static FIELD_DATE = 'date';
  public static FIELD_TEACHER_ID = 'teacherId';
  public static FIELD_CLASS_ROOM = 'classRoom';
  public static FIELD_MATERIAL = 'material';
  public static FIELD_START_TIME = 'startTime';
  public static FIELD_END_TIME = 'endTime';
  public static FIELD_ATTENDANCES_IDS = 'attendancesIds';

  constructor(
    public id: string,
    public current: boolean,
    public courseId: string,
    public date: Date,
    public teacherId: string,
    public classRoom: ClassRoom,
    public material: string,
    public startTime: string,
    public endTime: string,
    public attendancesIds: string[],
    public attendancesNames: string[],
    public courseName?: string,
    public courseImage?: string,
    public attendances?: Attendance[]
     ) {
  }
}
