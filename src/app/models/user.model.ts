export enum Rol {
  Admin = 'admin',
  Teacher = 'profesor',
  Student = 'estudiante',
  Normal = 'normal',
}

export interface User {
  uid: string;
  displayName: string;
  photoURL?: string;
  email?: string;
}

export interface IUserDetails extends User {
  nickName: string;
  rol?: string;
  creationDate?: Date;
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
  public static FIELD_ROL = 'rol';
  public static FIELD_CREATION_DATE = 'creationDate';

  constructor(
    public uid: string,
    public displayName: string,
    public photoURL: string,
    public email: string,
    public nickName: string,
    public rol: string,
    public creationDate: Date
     ) {
  }
}
