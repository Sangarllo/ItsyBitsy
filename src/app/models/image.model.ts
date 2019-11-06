export interface IImage {
  path: string;
  name: string;
}

const AVATARES = [
  {path: 'assets/avatar/001-man.png', name: 'Hombre 0'},
  {path: 'assets/avatar/002-girl.png', name: 'Chica 0'},
  {path: 'assets/avatar/003-boy.png', name: 'Chico 0'},
  {path: 'assets/avatar/004-woman.png', name: 'Mujer 0'},
  {path: 'assets/avatar/005-man-1.png', name: 'Hombre 1'},
  {path: 'assets/avatar/006-woman-1.png', name: 'Mujer 1'},
  {path: 'assets/avatar/007-boy-1.png', name: 'Chico 1'},
  {path: 'assets/avatar/008-clown.png', name: 'Payaso'},
  {path: 'assets/avatar/009-firefighter.png', name: 'Bombero'},
  {path: 'assets/avatar/010-girl-1.png', name: 'Chica 1'},
  {path: 'assets/avatar/011-man-2.png', name: 'Hombre 2'},
  {path: 'assets/avatar/012-woman-2.png', name: 'Mujer 2'},
  {path: 'assets/avatar/013-woman-3.png', name: 'Mujer 3'},
  {path: 'assets/avatar/014-man-3.png', name: 'Hombre 3'},
  {path: 'assets/avatar/015-woman-4.png', name: 'Mujer 4'},
  {path: 'assets/avatar/016-boy-2.png', name: 'Chico 2'},
  {path: 'assets/avatar/017-girl-2.png', name: 'Chica 2'},
  {path: 'assets/avatar/018-boy-3.png', name: 'Chico 3'},
  {path: 'assets/avatar/019-woman-5.png', name: 'Mujer 5'},
  {path: 'assets/avatar/020-man-4.png', name: 'Hombre 4'},
  {path: 'assets/avatar/021-girl-3.png', name: 'Chica 3'},
  {path: 'assets/avatar/022-man-5.png', name: 'Hombre 5'},
  {path: 'assets/avatar/023-man-6.png', name: 'Hombre 6'},
  {path: 'assets/avatar/024-woman-6.png', name: 'Mujer 6'},
  {path: 'assets/avatar/025-boy-4.png', name: 'chico 4'},
  {path: 'assets/avatar/026-girl-4.png', name: 'Chica 4'},
  {path: 'assets/avatar/027-man-7.png', name: 'Hombre 7'},
  {path: 'assets/avatar/028-woman-7.png', name: 'Mujer 7'},
  {path: 'assets/avatar/029-man-8.png', name: 'Hombre 8'},
  {path: 'assets/avatar/030-policewoman.png', name: 'Mujer Policía'},
  {path: 'assets/avatar/031-policeman.png', name: 'Mujer Policía'},
  {path: 'assets/avatar/032-girl-5.png', name: 'Chica 5'},
  {path: 'assets/avatar/033-superhero.png', name: 'Super Héroe'},
  {path: 'assets/avatar/034-woman-8.png', name: 'Mujer Policía'},
  {path: 'assets/avatar/035-woman-9.png', name: 'Mujer 9'},
  {path: 'assets/avatar/036-man-9.png', name: 'Hombre 9'},
  {path: 'assets/avatar/037-arab-woman.png', name: 'Musulmana'},
  {path: 'assets/avatar/038-man-10.png', name: 'Hombre 10'},
  {path: 'assets/avatar/039-woman-10.png', name: 'Mujer 10'},
  {path: 'assets/avatar/040-man-11.png', name: 'Hombre 11'},
  {path: 'assets/avatar/041-woman-11.png', name: 'Mujer 11'},
  {path: 'assets/avatar/042-vampire.png', name: 'Vampiro'},
  {path: 'assets/avatar/043-chef.png', name: 'Cocinero'},
  {path: 'assets/avatar/044-farmer.png', name: 'HOmbre Chino'},
  {path: 'assets/avatar/045-man-12.png', name: 'Hombre 12'},
  {path: 'assets/avatar/046-woman-12.png', name: 'Mujer 12'},
  {path: 'assets/avatar/047-man-13.png', name: 'Hombre 13'},
  {path: 'assets/avatar/048-boy-5.png', name: 'Chico 5'},
  {path: 'assets/avatar/049-thief.png', name: 'Ladrón'},
  {path: 'assets/avatar/050-catwoman.png', name: 'CatWoman'},
  {path: 'assets/avatar/051-american-football-player.png', name: 'Jugador Fútbol'},
  {path: 'assets/avatar/052-witch.png', name: 'Bruja'},
  {path: 'assets/avatar/053-concierge.png', name: 'Botones'},
  {path: 'assets/avatar/054-woman-13.png', name: 'Mujer 13'},
  {path: 'assets/avatar/055-bodybuilder.png', name: 'Musculado'},
  {path: 'assets/avatar/056-girl-6.png', name: 'Chica 6'},
  {path: 'assets/avatar/057-woman-14.png', name: 'Mujer 14'},
  {path: 'assets/avatar/058-death.png', name: 'Zombi'},
  {path: 'assets/avatar/059-doctor.png', name: 'Doctor 0'},
  {path: 'assets/avatar/060-doctor-1.png', name: 'Doctor 1'},
  {path: 'assets/avatar/061-nun.png', name: 'Monja'},
  {path: 'assets/avatar/062-builder.png', name: 'Constructor'},
  {path: 'assets/avatar/063-girl-7.png', name: 'Chica 7'},
  {path: 'assets/avatar/064-punk.png', name: 'Punk'},
  {path: 'assets/avatar/065-pinup.png', name: 'Pineup'},
  {path: 'assets/avatar/066-boy-6.png', name: 'Chico 6'},
  {path: 'assets/avatar/067-man-14.png', name: 'Hombre 14'},
  {path: 'assets/avatar/068-girl-8.png', name: 'Chica 8'},
  {path: 'assets/avatar/069-woman-15.png', name: 'Mujer 15'},
  {path: 'assets/avatar/070-man-15.png', name: 'Hombre 15'}
];

const ICONS = [
  {path: 'assets/icons/00-curso.png', name: 'Curso Defecto'},
  {path: 'assets/icons/01-verde.png', name: '01 Verde'},
  {path: 'assets/icons/02-verde.png', name: '02 Verde'},
  {path: 'assets/icons/03-verde.png', name: '03 Verde'},
  {path: 'assets/icons/04-verde.png', name: '04 Verde'},
  {path: 'assets/icons/05-verde.png', name: '05 Verde'},
  {path: 'assets/icons/06-verde.png', name: '06 Verde'},
  {path: 'assets/icons/07-verde.png', name: '07 Verde'},
  {path: 'assets/icons/08-verde.png', name: '08 Verde'},
  {path: 'assets/icons/09-verde.png', name: '09 Verde'},
  {path: 'assets/icons/10-verde.png', name: '10 Verde'},
  {path: 'assets/icons/99-verde.png', name: 'Verde'},
  {path: 'assets/icons/01-azul.png', name: '01 Azul'},
  {path: 'assets/icons/02-azul.png', name: '02 Azul'},
  {path: 'assets/icons/03-azul.png', name: '03 Azul'},
  {path: 'assets/icons/04-azul.png', name: '04 Azul'},
  {path: 'assets/icons/05-azul.png', name: '05 Azul'},
  {path: 'assets/icons/06-azul.png', name: '06 Azul'},
  {path: 'assets/icons/07-azul.png', name: '07 Azul'},
  {path: 'assets/icons/08-azul.png', name: '08 Azul'},
  {path: 'assets/icons/09-azul.png', name: '09 Azul'},
  {path: 'assets/icons/10-azul.png', name: '10 Azul'},
  {path: 'assets/icons/99-azul.png', name: 'Azul'},
];

export class Avatar implements IImage {

  constructor(
    public path: string,
    public name: string
  ) {
  }

  public static getDefault(): Avatar {
    return {path: 'assets/avatar/001-man.png', name: 'man-01'};
  }

  public static getAvatares(): Avatar[] {
    return AVATARES;
  }

  public static getRandom(): Avatar {
    const index = Math.floor(Math.random() * AVATARES.length);
    return AVATARES[index];
  }
}

export class Icon implements IImage {

  constructor(
    public path: string,
    public name: string
  ) {
  }

  public static getDefault(): Avatar {
    return {path: 'assets/icons/00-curso.png', name: 'Curso Defecto'};
  }

  public static getIcons(): Avatar[] {
    return ICONS;
  }

  public static getRandom(): Avatar {
    const index = Math.floor(Math.random() * ICONS.length);
    return ICONS[index];
  }
}
