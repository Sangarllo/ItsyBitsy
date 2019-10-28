export interface IAvatar {
  path: string;
  name: string;
}

export class Avatar implements IAvatar {

  constructor(
    public path: string,
    public name: string
  ) {
  }

  public static getDefault(): Avatar {
    return {path: 'assets/avatar/001-man.png', name: 'man-01'};
  }

  public static getAvatares(): Avatar[] {
    return [
    {path: 'assets/avatar/001-man.png', name: 'man-01'},
    {path: 'assets/avatar/002-girl.png', name: 'girl-02'},
    {path: 'assets/avatar/003-boy.png', name: 'boy-03'},
    {path: 'assets/avatar/004-woman.png', name: 'woman-04'},
    {path: 'assets/avatar/005-man-1.png', name: 'man-05'},
    {path: 'assets/avatar/006-woman-1.png', name: 'woman-06'},
    {path: 'assets/avatar/007-boy-1.png', name: 'boy-07'},
    {path: 'assets/avatar/008-clown.png', name: 'clown-08'},
    {path: 'assets/avatar/009-firefighter.png', name: 'firefighter-09'},
    {path: 'assets/avatar/010-girl-1.png', name: 'girl-10'}
  ];

  }
/*
  static AVATARES = [
    'assets/avatar/001-man.png',
    'assets/avatar/002-girl.png',
    'assets/avatar/003-boy.png',
    'assets/avatar/004-woman.png',
    'assets/avatar/005-man-1.png',
    'assets/avatar/006-woman-1.png',
    'assets/avatar/007-boy-1.png',
    'assets/avatar/008-clown.png',
    'assets/avatar/009-firefighter.png',
    'assets/avatar/010-girl-1.png',
    'assets/avatar/011-man-2.png',
    'assets/avatar/012-woman-2.png',
    'assets/avatar/013-woman-3.png',
    'assets/avatar/014-man-3.png',
    'assets/avatar/015-woman-4.png',
    'assets/avatar/016-boy-2.png',
    'assets/avatar/017-girl-2.png',
    'assets/avatar/018-boy-3.png',
    'assets/avatar/019-woman-5.png',
    'assets/avatar/020-man-4.png',
    'assets/avatar/021-girl-3.png',
    'assets/avatar/022-man-5.png',
    'assets/avatar/023-man-6.png',
    'assets/avatar/024-woman-6.png',
    'assets/avatar/025-boy-4.png',
    'assets/avatar/026-girl-4.png',
    'assets/avatar/027-man-7.png',
    'assets/avatar/028-woman-7.png',
    'assets/avatar/029-man-8.png',
    'assets/avatar/030-policewoman.png',
    'assets/avatar/031-policeman.png',
    'assets/avatar/032-girl-5.png',
    'assets/avatar/033-superhero.png',
    'assets/avatar/034-woman-8.png',
    'assets/avatar/035-woman-9.png',
    'assets/avatar/036-man-9.png',
    'assets/avatar/037-arab-woman.png',
    'assets/avatar/038-man-10.png',
    'assets/avatar/039-woman-10.png',
    'assets/avatar/040-man-11.png',
    'assets/avatar/041-woman-11.png',
    'assets/avatar/042-vampire.png',
    'assets/avatar/043-chef.png',
    'assets/avatar/044-farmer.png',
    'assets/avatar/045-man-12.png',
    'assets/avatar/046-woman-12.png',
    'assets/avatar/047-man-13.png',
    'assets/avatar/048-boy-5.png',
    'assets/avatar/049-thief.png',
    'assets/avatar/050-catwoman.png',
    'assets/avatar/051-american-football-player.png',
    'assets/avatar/052-witch.png',
    'assets/avatar/053-concierge.png',
    'assets/avatar/054-woman-13.png',
    'assets/avatar/055-bodybuilder.png',
    'assets/avatar/056-girl-6.png',
    'assets/avatar/057-woman-14.png',
    'assets/avatar/058-death.png',
    'assets/avatar/059-doctor.png',
    'assets/avatar/060-doctor-1.png',
    'assets/avatar/061-nun.png',
    'assets/avatar/062-builder.png',
    'assets/avatar/063-girl-7.png',
    'assets/avatar/064-punk.png',
    'assets/avatar/065-pinup.png',
    'assets/avatar/066-boy-6.png',
    'assets/avatar/067-man-14.png',
    'assets/avatar/068-girl-8.png',
    'assets/avatar/069-woman-15.png',
    'assets/avatar/070-man-15.png' ];
    */
}
