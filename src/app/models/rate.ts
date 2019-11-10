export enum RateType {
  porAsistencia = 'por asistencia',
  cuotaFijaMensual = 'cuota fija mensual'
}

export interface IRate {
  current: boolean;
  name: string;
  type: RateType;
  price: number;
}

export class Rate implements IRate {

  public static PATH_URL = 'tarifas';
  public static IMAGE_DEFAULT = 'assets/section/rate.png';

  public static FIELD_ID = 'id';
  public static FIELD_CURRENT = 'current';
  public static FIELD_NAME = 'name';
  public static FIELD_TYPE = 'type';
  public static FIELD_PRICE = 'price';

  constructor(
    public id: string,
    public current: boolean,
    public name: string,
    public type: RateType,
    public price: number
  ) {
  }

  public static getDefault(): Rate {
    return {
      id: 'INVENT',
      current: true,
      name: '7,5 por asistencia',
      type: RateType.porAsistencia,
      price: 7.5
    };
  }

  // TODO: Debería salir del servicio
    public static getRates(): Rate[] {
      return [
        {
          id: 'INVENT 1',
          current: true,
          name: '7,5 por asistencia',
          type: RateType.porAsistencia,
          price: 7.5
        }, {
          id: 'INVENT 2',
          current: true,
          name: '8 por asistencia',
          type: RateType.porAsistencia,
          price: 8
        }, {
          id: 'INVENT 3',
          current: true,
          name: '30 fijo por mes',
          type: RateType.cuotaFijaMensual,
          price: 30
        }, {
          id: 'INVENT 2',
          current: true,
          name: '32 fijo por mes',
          type: RateType.cuotaFijaMensual,
          price: 32
        }
      ];
    }

  public static getRateTypes() {
    return [
      RateType.porAsistencia,
      RateType.cuotaFijaMensual
    ]
  }

  public static getRandom(): Rate {
    const RATES: Rate[] = Rate.getRates();
    const index = Math.floor(Math.random() * RATES.length);
    return RATES[index];
  }
}
