export interface User {
  uid: string;
  displayName: string;
  email?: string;
  photoURL?: string;
}

export interface UserDetails extends User {
  nickName: string;
  rol?: string;
  creationDate?: Date;
  // lastDate?: Date; TODO: Auditoría? Lo quito por superar cuota de escritura
  // myCustomData?: string;
}
