import { Teacher } from './teacher.model';
import { UserDetails } from './user.model';

export interface ICourse {
  current: boolean;
  name: string;
  image: string;
  // startDate: string;
  // endDate: string;
  startTime: string;
  endTime: string;
  teacher: Teacher;
  studentList: UserDetails[];
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
  public static FIELD_START_TIME = 'startTime';
  public static FIELD_END_TIME = 'endTime';
  public static FIELD_TEACHER = 'teacher';
  public static FIELD_STUDENT_LIST = 'studentList';

  constructor(
    public id: string,
    public current: boolean,
    public name: string,
    public image: string,
    public startTime: string,
    public endTime: string,
    public teacher: Teacher,
    public studentList: UserDetails[]
     ) {
  }
}
