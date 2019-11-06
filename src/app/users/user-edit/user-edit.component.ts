import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDetails, Rol } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { Avatar } from '../../models/image.model';
import { RandomGenerator } from '../../shared/random-generator';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {

  pageTitle = 'Edición de Usuario';
  errorMessage: string;
  userDetailsForm: FormGroup;

  userDetails: UserDetails;
  AVATARES: Avatar[] = Avatar.getAvatares();

  private sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
      this.userDetailsForm = this.fb.group({
        displayName: ['', [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]],
        photoURL: ['', Validators.required],
        email: ['', Validators.email],
        nickName: [''],
        rol: [Rol.Normal],
        creationDate: [new Date()],
    });

      // Read the student Id from the route parameter
      this.sub = this.route.paramMap.subscribe(
        params => {
          const id = params.get('id');
          this.getUserDetails(id);
        }
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getUserDetails(id: string): void {
    this.userService.getUserDetails(id)
      .subscribe({
        next: (userDetails: UserDetails) => {
          this.userDetails = userDetails;
          this.displayUserDetails();
        },
        error: err => this.errorMessage = err
      });
  }

  displayUserDetails(): void {

    if (this.userDetailsForm) {
      this.userDetailsForm.reset();
    }

    if (this.userDetails.uid === '0') {
      this.pageTitle = 'Creando un nuevo usuario';
    } else {
      this.pageTitle = `Editando el usuario: ${this.userDetails.displayName}`;
    }

    // Update the data on the form
    this.userDetailsForm.patchValue({
      displayName: this.userDetails.displayName,
      photoURL: this.userDetails.photoURL,
      email: this.userDetails.email,
      nickName: this.userDetails.nickName,
      rol: this.userDetails.rol,
      creationDate: this.userDetails.creationDate
    });
  }

  deleteUserDetails(): void {
    if (this.userDetails.uid === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Realmente quieres eliminar: ${this.userDetails.displayName}?`)) {
        this.userService.deleteUserDetails(this.userDetails.uid)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  onRandomPopulateForm(): void {

    this.userDetails.displayName = RandomGenerator.randomDisplayName();
    this.userDetails.email = this.userDetails.displayName.replace(' ', '.').toLowerCase() + '@gmail.com';
    this.userDetails.photoURL = Avatar.getRandom().path;
    this.userDetails.nickName = this.userDetails.displayName.split(' ')[0];
    this.userDetails.rol = UserDetails.getRolRandom();

    this.displayUserDetails();
  }

  onResetForm(): void {
    this.userDetailsForm.reset();
  }

  onSaveForm(): void {
    if (this.userDetailsForm.valid) {

        const item = { ...this.userDetails, ...this.userDetailsForm.value };

        if (item.uid === '0') {
          this.userService.createUserDetails(item)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.userService.updateUserDetails(item)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
    } else {
      this.errorMessage = 'Por favor, corrige los mensajes de validación.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.userDetailsForm.reset();
    this.router.navigate([`/${UserDetails.PATH_URL}`]);
  }

  gotoList(): void {
    // Reset the form to clear the flags
    this.userDetailsForm.reset();
    this.router.navigate([`/${UserDetails.PATH_URL}`]);
  }
}