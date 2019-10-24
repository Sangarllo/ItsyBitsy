export interface IStudent {
  name: string;
  surname: string;
  fare: string;
  contact: string;
  phone: string;
}

export interface IStudentExtended extends IStudent {
  id: string;
}

export class Student implements IStudent {

  constructor(
    public name: string,
    public surname: string,
    public fare: string,
    public contact: string,
    public phone: string ) {
  }
}
