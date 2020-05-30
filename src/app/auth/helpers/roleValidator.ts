import { User } from '@models/user.model';

export class RoleValidator {

  /*
  isStudent(user: User): boolean {
    return user.roles.includes('ESTUDIANTE');
  }

  isTeacher(user: User): boolean {
    return user.roles.includes('PROFESOR');
  }
  */

  isRevisor(user: User): boolean {
    return user.roles.includes('REVISOR');
  }

  isAdmin(user: User): boolean {
    return user.roles.includes('ADMIN');
  }
}
