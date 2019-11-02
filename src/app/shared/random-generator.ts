export class RandomGenerator {


  public static randomPhone(): string {
    let result = '6';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < 8; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public static randomDisplayName(): string {
    return this.randomName(2) + ' ' + this.randomName(3);
  }

  private static randomName(length) {
    let name = '';
    const vowels = 'AEIOU';
    const constants = 'BCDFGJKLMNPRSTVY';
    for ( let i = 0; i < length; i++ ) {
      name += constants.charAt(Math.floor(Math.random() * constants.length));
      name += vowels.charAt(Math.floor(Math.random() * vowels.length));
    }
    return name;
  }

}
