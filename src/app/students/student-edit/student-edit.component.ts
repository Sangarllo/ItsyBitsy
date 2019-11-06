import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/student.model';
import { Fare } from '../../models/fare';
import { Avatar } from '../../models/image.model';
import { GenericValidator } from '../../shared/generic-validator';
import { RandomGenerator } from '../../shared/random-generator';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit, OnDestroy {

  pageTitle = 'Edición de Estudiante';
  errorMessage: string;
  studentForm: FormGroup;

  student: Student;
  FARES: Fare[] = Fare.getFares();
  AVATARES: Avatar[] = Avatar.getAvatares();

  private sub: Subscription;

  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentsService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      studentDisplayName: {
        required: 'El nombre es requerido.',
        minlength: 'El nombre debe tener al menos 3 caracteres.',
        maxlength: 'El nombre no puede exceder de 50 characters.'
      },
      photoURL: {
        required: 'Una imagen o foto es requerida.'
      },
      email: {
        email: 'El formato del email no es correcto.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.studentForm = this.fb.group({
      displayName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      photoURL: ['', Validators.required],
      email: ['', Validators.email],
      phone: [''],
      contact: [''],
      fare: [''],
    });

    // Read the student Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getStudent(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getStudent(id: string): void {
    this.studentService.getStudent(id)
      .subscribe({
        next: (student: Student) => {
          this.student = student;
          this.displayStudent();
        },
        error: err => this.errorMessage = err
      });
  }

  displayStudent(): void {

    if (this.studentForm) {
      this.studentForm.reset();
    }

    if (this.student.id === '0') {
      this.pageTitle = 'Creando un nuevo estudiante';
    } else {
      this.pageTitle = `Editando el estudiante: ${this.student.displayName}`;
    }

    // Update the data on the form
    this.studentForm.patchValue({
      displayName: this.student.displayName,
      photoURL: this.student.photoURL,
      email: this.student.email,
      phone: this.student.phone,
      contact: this.student.contact,
      fare: this.student.fare
    });
  }

  deleteStudent(): void {
    if (this.student.id === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Realmente quieres eliminar: ${this.student.displayName}?`)) {
        this.studentService.deleteStudent(this.student.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  onRandomPopulateForm(): void {

    this.student.displayName = RandomGenerator.randomDisplayName();
    this.student.phone = RandomGenerator.randomPhone();
    this.student.email = this.student.displayName.replace(' ', '.').toLowerCase() + '@gmail.com';
    this.student.photoURL = Avatar.getRandom().path;
    this.student.fare = Fare.getRandom().name;

    this.displayStudent();
  }

  onResetForm(): void {
    this.studentForm.reset();
  }

  onSaveForm(): void {
    if (this.studentForm.valid) {
      // if (this.studentForm.dirty) { TODO CHECK WHY DIRTY
        const item = { ...this.student, ...this.studentForm.value };

        if (item.id === '0') {
          this.studentService.createStudent(item)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.studentService.updateStudent(item)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      /* TODO CHECK WHY DIRTY
      } else {
        this.onSaveComplete();
      } */
    } else {
      this.errorMessage = 'Por favor, corrige los mensajes de validación.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.studentForm.reset();
    this.router.navigate([`/${Student.PATH_URL}`]);
  }

  gotoList(): void {
    // Reset the form to clear the flags
    this.studentForm.reset();
    this.router.navigate([`/${Student.PATH_URL}`]);
  }

}
