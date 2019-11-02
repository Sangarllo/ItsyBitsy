export interface User {
  uid: string;
  displayName: string;
  email?: string;
  photoURL?: string;
  rol?: string;
  lastDate?: Date;
  myCustomData?: string;
}
