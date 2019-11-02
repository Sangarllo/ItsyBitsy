export interface IStudentData {
  displayName: string;
  photoURL: string;
  email: string;
  phone: string;
  contact: string;
  fare: string;
}

export interface IStudent extends IStudentData {
  id: string;
}

export class Student implements IStudent {

  public static PATH_URL = 'estudiantes';

  public static FIELD_ID = 'id';
  public static FIELD_DISPLAY_NAME = 'displayName';
  public static FIELD_PHOTO_URL = 'photoURL';
  public static FIELD_EMAIL = 'email';
  public static FIELD_PHONE = 'phone';
  public static FIELD_CONTACT = 'contact';
  public static FIELD_FARE = 'fare';

  constructor(
    public id: string,
    public displayName: string,
    public photoURL: string,
    public email: string,
    public phone: string,
    public contact: string,
    public fare: string
     ) {
  }
}
