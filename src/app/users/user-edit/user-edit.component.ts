import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDetails, Rol } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription, Observable } from 'rxjs';
import { Avatar, FileI } from '../../models/image.model';
import Swal from 'sweetalert2';
import { RateService } from '../../services/rates.service';
import { Rate } from 'src/app/models/rate';
import { DatesService } from '../../services/dates.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {

  uploadPercent: Observable<number>;
  // downloadURL: Observable<string>;
  public image: FileI;

  pageTitle = 'Edición de Usuario';
  errorMessage: string;
  userDetailsForm: FormGroup;
  userDetails: UserDetails;
  AVATARES: Avatar[] = Avatar.getAvatares();
  PAYMENT_METHOD_ARRAY = UserDetails.getAllPaymentMethod();
  rates$: Observable<Rate[]>;

  isUser = true;

  private sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private afStorage: AngularFireStorage,
    private route: ActivatedRoute,
    private router: Router,
    private dateSvc: DatesService,
    private rateSvc: RateService,
    private userService: UserService) { }

  ngOnInit() {

    this.rates$ = this.rateSvc.getAllRates();

    this.userDetailsForm = this.fb.group({
        displayName: ['', [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]],
        photoURL: new FormControl('', Validators.required),
        email: [{ value: '', disabled: true }, Validators.email],
        nickName: [''],
        birthday: [''],
        location: ['', Validators.required],
        creationDate: [new Date()],
        isUser: false,
        isAdmin: false,
        isTeacher: false,
        isStudent: false,
        contactPerson: ['', Validators.required],
        contactPersonNif: '',
        telephone: [''],
        address:  [''],
        rateId: ['', Validators.required],
        paymentMethod: ['', Validators.required],
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
      birthday: this.dateSvc.fromFirebaseDate(this.userDetails.birthday),
      location: this.userDetails.location,
      isUser: this.userDetails.isUser,
      isAdmin: this.userDetails.isAdmin,
      isTeacher: this.userDetails.isTeacher,
      isStudent: this.userDetails.isStudent,
      contactPerson: this.userDetails.contactPerson,
      contactPersonNif: this.userDetails.contactPersonNif,
      telephone: this.userDetails.telephone,
      address: this.userDetails.address,
      rateId: (this.userDetails.rateId) ? 'no-aplica' : this.userDetails.rateId,
      paymentMethod: this.userDetails.paymentMethod,
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
    Swal.fire({
      icon: 'success',
      title: 'Datos guardados con éxito',
      text: `Los datos de ${this.userDetails.displayName} se han guardado correctamente`,
      // footer: '<a href>Why do I have this issue?</a>'
    });
    this.router.navigate([`/${UserDetails.PATH_URL}`]);
  }

  gotoList(): void {
    // Reset the form to clear the flags
    this.userDetailsForm.reset();
    this.router.navigate([`/${UserDetails.PATH_URL}`]);
  }

  goBack(): void {
    // Reset the form to clear the flags
    this.userDetailsForm.reset();
    this.router.navigate([`/${UserDetails.PATH_URL}/${this.userDetails.uid}`]);
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = file.name;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            ( imageUrl: string ) => {

              this.userDetails.photoURL = imageUrl;

              // Update the data on the form
              this.userDetailsForm.patchValue({
                photoURL: this.userDetails.photoURL
              });
          });
        })
     )
    .subscribe();
  }

}
