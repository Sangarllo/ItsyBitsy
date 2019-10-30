import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Avatar } from '../../models/avatar.model';
import { Fare } from '../../models/fare';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.scss']
})
export class StudentNewComponent implements OnInit {

  AVATARES: Avatar[] = Avatar.getAvatares();
  FARES: Fare[] = Fare.getFares();

  studentForm: FormGroup;
  emailMessage: string;

  private validationMessages = {
    required: 'Introduce el email',
    email: 'Introduce un email válido.'
  };

  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      displayName: ['', Validators.required],
      photoURL: [Avatar.getRandom().path, Validators.required],
      email: ['', [Validators.required, Validators.email] ],
      phone: [''],
      contact: [''],
      fare: [Fare.getDefault().name],
    });
  }

  ngOnInit() {
    const emailControl = this.studentForm.get('email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );
  }

  onResetForm() {
    this.studentForm.reset();
    this.studentForm.patchValue({
      photoURL: Avatar.getRandom().path,
    });

  }

  public onSaveForm() {
    console.log('Student Form: ', this.studentForm.value);
    this.studentService.createStudent(this.studentForm.value);
    this.router.navigate(['/estudiantes']);
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

  populateTestData(): void {

    const randomDisplayName = this.randomName(3) + ' ' + this.randomName(4);
    const randomPhone = this.randomPhone();

    this.studentForm.patchValue({
      displayName: randomDisplayName,
      photoURL: Avatar.getRandom().path,
      email: randomDisplayName.replace(' ', '.').toLowerCase() + '@gmail.com',
      phone: randomPhone,
      contact: '',
      fare: Fare.getRandom().name,
    });
  }

  private randomName(length) {
  let name = '';
  const vowels = 'AEIOU';
  const constants = 'BCDFGJKLMNPRSTVY';
  for ( let i = 0; i < length; i++ ) {
    name += constants.charAt(Math.floor(Math.random() * constants.length));
    name += vowels.charAt(Math.floor(Math.random() * vowels.length));
  }
  return name;
}

private randomPhone() {
  let result = '6';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < 8; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

}
