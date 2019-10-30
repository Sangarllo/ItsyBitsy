export interface IFare {
  name: string;
  price: number;
}

export class Fare implements IFare {

  constructor(
    public name: string,
    public price: number
  ) {
  }

  public static getDefault(): Fare {
    return {name: 'NORMAL', price: 10 };
  }

  public static getFares(): Fare[] {
    return [
        {name: 'NORMAL', price: 10 },
        {name: 'REDUCIDA', price: 8 },
    ];
  }

public static getRandom(): Fare {
  const FARES: Fare[] = Fare.getFares();
  const index = Math.floor(Math.random() * FARES.length);
  return FARES[index];
}
}
