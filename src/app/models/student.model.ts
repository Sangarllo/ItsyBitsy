export interface IStudent {
  displayName: string;
  photoURL: string;
  email: string;
  phone: string;
  contact: string;
  fare: string;
}

export interface IStudentExtended extends IStudent {
  id: string;
}

export class Student implements IStudent {

  public static FIELD_DISPLAY_NAME = 'displayName';
  public static FIELD_PHOTO_URL = 'photoURL';
  public static FIELD_EMAIL = 'email';
  public static FIELD_PHONE = 'phone';
  public static FIELD_CONTACT = 'contact';
  public static FIELD_FARE = 'fare';

  constructor(
    public displayName: string,
    public photoURL: string,
    public email: string,
    public phone: string,
    public contact: string,
    public fare: string
     ) {
  }
}
