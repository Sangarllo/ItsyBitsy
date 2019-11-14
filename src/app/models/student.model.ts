import { Rate } from './rate';

export interface IStudentData {
  contact: string;
  rate: string;
}

export interface IStudent extends IStudentData {
  id: string;
}

export class Student implements IStudent {

  public static PATH_URL = 'estudiantes';

  public static FIELD_CONTACT = 'contact';
  public static FIELD_RATE = 'rate';

  constructor(
    public id: string,
    public contact: string,
    public rate: string
     ) {
  }
}
