import { DocumentReference } from '@angular/fire/firestore';

export enum Rol {
  Normal, // 'normal',
  Admin, // Admin = 'admin',
  Teacher, // Teacher = 'profesor',
  Student, // Student = 'estudiante',
}

export interface User {
  uid: string;
  displayName: string;
  photoURL?: string;
  email?: string;
}

export interface IUserDetails extends User {
  nickName: string;
  creationDate?: Date;
  isUser: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  // lastDate?: Date; TODO: Auditoría? Lo quito por superar cuota de escritura
  // myCustomData?: string;
}

export class UserDetails implements IUserDetails {

  public static PATH_URL = 'usuarios';

  public static FIELD_UID = 'uid';
  public static FIELD_DISPLAY_NAME = 'displayName';
  public static FIELD_PHOTO_URL = 'photoURL';
  public static FIELD_EMAIL = 'email';
  public static FIELD_NICK_NAME = 'nickName';
  public static FIELD_CREATION_DATE = 'creationDate';
  public static FIELD_IS_USER = 'isUser';
  public static FIELD_IS_ADMIN = 'isAdmin';
  public static FIELD_IS_TEACHER = 'isTeacher';
  public static FIELD_IS_STUDENT = 'isStudent';

  constructor(
    public uid: string,
    public displayName: string,
    public photoURL: string,
    public email: string,
    public nickName: string,
    public creationDate: Date,
    public isUser: boolean,
    public isAdmin: boolean,
    public isTeacher: boolean,
    public isStudent: boolean,
     ) {
  }
}
