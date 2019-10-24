export interface Student {
  name: string;
  surname: string;
  fare: string;
  contact: string;
  phono: string;
}

export interface StudentExtended extends Student {
  id: string;
}
