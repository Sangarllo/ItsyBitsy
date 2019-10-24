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
