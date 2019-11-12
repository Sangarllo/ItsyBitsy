export interface ITeacher {
  displayName: string;
  photoURL: string;
  email: string;
  phone: string;
}

export interface ITeacherExtended extends ITeacher {
  id: string;
}

export class Teacher implements ITeacher {

  public static PATH_URL = 'profesores';

  public static FIELD_DISPLAY_NAME = 'displayName';
  public static FIELD_PHOTO_URL = 'photoURL';
  public static FIELD_EMAIL = 'email';
  public static FIELD_PHONE = 'phone';

  public static getDefault(): Teacher {
    return {
      displayName: 'Lourdes Menor',
      photoURL: 'assets/avatar/001-man.png',
      email: 'lourdes.menor@gmail.com',
      phone: '666777888'
    };
  }

  constructor(
    public displayName: string,
    public photoURL: string,
    public email: string,
    public phone: string
     ) {
  }
}
