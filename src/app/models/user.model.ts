export interface User {
  uid: string;
  displayName: string;
  nickName: string;
  email?: string;
  photoURL?: string;
  rol?: string;
  creationDate?: Date;
  lastDate?: Date;
  myCustomData?: string;
}
