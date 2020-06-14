import { UserDetails } from '@models/user.model';

export enum RateType {
  porAsistencia = 'por asistencia',
  cuotaFijaMensual = 'cuota fija mensual'
}

export interface IRate {
  current: boolean;
  listed: boolean;
  name: string;
  type: RateType;
  price: number;
  image: string;
  students: UserDetails[];
}

export class Rate implements IRate {

  public static PATH_URL = 'tarifas';
  public static IMAGE_DEFAULT = 'assets/rates/rate-default.png';

  constructor(
    public id: string,
    public current: boolean,
    public listed: boolean,
    public name: string,
    public type: RateType,
    public price: number,
    public image: string,
    public students: UserDetails[]
  ) {
  }

  public static getDefault(): Rate {
    return {
      id: 'INVENT',
      current: true,
      listed: true,
      name: '7,5 por asistencia',
      type: RateType.porAsistencia,
      price: 7.5,
      image: 'assets/rates/rate-default.png',
      students: []
    };
  }


  public static getRateTypes() {
    return [
      RateType.porAsistencia,
      RateType.cuotaFijaMensual
    ]
  }

}
