import { DocumentReference } from '@angular/fire/firestore';

export type Roles = 'REVISOR' | 'ADMIN';

export enum PaymentMethod {
  NoAplica = 'No Aplica',
  Recibo = 'Recibo',
  Domiciliación = 'Domiciliación'
}

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  password?: string;
  displayName?: string;
  photoURL?: string;
  roles?: Roles[];
  enable?: boolean;
}

export interface IUserDetails extends User {
  current?: boolean;
  nickName?: string;
  birthday?: Date;
  location?: string;
  creationDate?: Date;

  isTeacher: boolean;
  isStudent: boolean;

  // lastDate?: Date; TODO: Auditoría? Lo quito por superar cuota de escritura
  // myCustomData?: string;
  // StudentData
  rateId?: string;
  telephone?: string;
  contactPerson?: string;
  contactPersonNif?: string;
  paymentMethod?: PaymentMethod;
  address?: string;

  // Necesario para el AttendancesSummary
  numAttendances?: number;
  paymentAmmout?: number;

  coursesEnrolled?: string;
  deletedReason?: string;
}

export class UserDetails implements IUserDetails {

  public static PATH_URL = 'usuarios';

  constructor(
    public uid: string,
    public current: boolean,
    public displayName: string,
    public photoURL: string,
    public email: string,
    public nickName: string,
    public birthday: Date,
    public location: string,
    public creationDate: Date,
    public isTeacher: boolean,
    public isStudent: boolean,
    public rateId: string,
    public telephone: string,
    public contactPerson: string,
    public contactPersonNif: string,
    public paymentMethod: PaymentMethod,
    public emailVerified: boolean,
    public address?: string,
    public numAttendances?: number,
    public numExpectedAttendances?: number,
    public paymentAmmout?: number,
    public coursesEnrolled?: string,
    public deletedReason?: string
     ) {
  }

  static getAllPaymentMethod(): PaymentMethod[] {
    return [
      PaymentMethod.NoAplica,
      PaymentMethod.Recibo,
      PaymentMethod.Domiciliación
    ];
  }

  static getDefaultPaymentMethod(): PaymentMethod {
    return PaymentMethod.NoAplica;
  }

}
