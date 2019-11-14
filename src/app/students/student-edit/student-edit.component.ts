import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { RateService } from '../../services/rates.service';
import { Student } from '../../models/student.model';
import { Rate } from '../../models/rate';
import { Avatar } from '../../models/image.model';
import { UserDetails } from '../../models/user.model';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit, OnDestroy {

  pageTitle = 'Edición de Estudiante';
  errorMessage: string;
  studentForm: FormGroup;

  userDetailsId: string;
  student: Student;
  studentRate: Rate;

  RATES: Rate[];
  AVATARES: Avatar[] = Avatar.getAvatares();

  private sub: Subscription;

  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private rateService: RateService,
    private studentService: StudentsService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      contact: {
        required: 'Una persona de contacto es requerida.'
      },
      rate: {
        required: 'Una tasa es requerida.'
      }
    };
  }

  ngOnInit() {

      this.studentForm = this.fb.group({
        contact: [''],
        rate: [''],
      });

      // Read the student Id from the route parameter
      this.sub = this.route.paramMap.subscribe(
        params => {
          const id = params.get('id');
          this.userDetailsId = id;
          this.getStudent(id);
        }
      );

      this.rateService.getRates()
        .subscribe((rates: Rate[]) => {
          this.RATES = rates;
        });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getStudent(id: string): void {

    this.studentService.getStudent(id)
      .subscribe({
        next: (student: Student) => {

          this.student = ( student ) ? student : this.studentService.initialize();
          this.rateService.getRate(this.student.rate)
            .subscribe( (rate: Rate) => {
              this.studentRate = rate;
              this.displayStudent();
            });
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
      this.pageTitle = `Editando los datos del estudiante`;
    }

    // Update the data on the form
    this.studentForm.patchValue({
      contact: this.student.contact,
      rate: this.student.rate
    });
  }

  deleteStudent(): void {
    if (this.student.id === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Realmente quieres eliminar los datos de este estudiante`)) {
        this.studentService.deleteStudent(this.student.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  onResetForm(): void {
    this.studentForm.reset();
  }

  onSaveForm(): void {
    if (this.studentForm.valid) {
      // if (this.studentForm.dirty) { TODO CHECK WHY DIRTY
        const item = { ...this.student, ...this.studentForm.value };

        if (item.id === '0') {
          this.studentService.createStudent(this.userDetailsId, item)
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
    this.router.navigate([`/${UserDetails.PATH_URL}/${this.userDetailsId}`]);
  }

  gotoDetails(): void {
    // Reset the form to clear the flags
    this.studentForm.reset();
    this.router.navigate([`/${UserDetails.PATH_URL}/${this.userDetailsId}`]);
  }

}
