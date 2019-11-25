import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(usersDetails: any, arg: any): any {

    if (arg === '' || arg.length < 1) {
      return usersDetails;
    }

    const resultValues = [];
    for (const userDetails of usersDetails) {

      const filterText = arg.toLowerCase();
      switch (filterText) {

        case 'registrado':
          if (userDetails.isUser){
            resultValues.push(userDetails);
          }
          break;

        case 'administrador':
          if (userDetails.isAdmin){
            resultValues.push(userDetails);
          }
          break;

        case 'profesor':
          if (userDetails.isTeacher){
            resultValues.push(userDetails);
          }
          break;

        case 'estudiante':
          if (userDetails.isStudent){
            resultValues.push(userDetails);
          }
          break;

        default:
            if (userDetails.displayName.toLowerCase().indexOf(filterText) > -1) {
              resultValues.push(userDetails);
            }
      }
    }

    return resultValues;
  }
}
