import { Teacher } from './teacher.model';

export interface ICourse {
  current: boolean;
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  teacher: Teacher;
}

export interface ICourseExtended extends ICourse {
  id: string;
}

export class Course implements ICourse {

  public static PATH_URL = 'cursos';

  public static FIELD_CURRENT = 'current';
  public static FIELD_NAME = 'name';
  public static FIELD_START_DATE = 'startDate';
  public static FIELD_END_DATE = 'endDate';
  public static FIELD_START_TIME = 'startTime';
  public static FIELD_END_TIME = 'endTime';
  public static FIELD_TEACHER = 'teacher';

  constructor(
    public current: boolean,
    public name: string,
    public startDate: string,
    public endDate: string,
    public startTime: string,
    public endTime: string,
    public teacher: Teacher
     ) {
  }
}