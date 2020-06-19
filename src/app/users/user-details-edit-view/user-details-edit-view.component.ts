import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDetails, User } from '@models/user.model';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@services/user.service';
import { Subscription, Observable } from 'rxjs';
import { Avatar, FileI } from '@models/image.model';
import Swal from 'sweetalert2';
import { RateService } from '@services/rates.service';
import { Rate } from '@models/rate';
import { DatesService } from '@services/dates.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-user-details-edit-view',
  templateUrl: './user-details-edit-view.component.html',
  styleUrls: ['./user-details-edit-view.component.scss']
})
export class UserDetailsEditView implements OnInit, OnDestroy {

  uploadPercent: Observable<number>;
  // downloadURL: Observable<string>;
  public image: FileI;

  pageTitle = 'Edición de Usuario';
  errorMessage: string;
  userDetailsForm: FormGroup;
  userDetails: UserDetails;
  userChecked: User; // UserChecked
  AVATARES: Avatar[] = Avatar.getAvatares();
  PAYMENT_METHOD_ARRAY = UserDetails.getAllPaymentMethod();
  rates$: Observable<Rate[]>;

  public canAdmin: boolean = false;
  isUser = true;

  private sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private afStorage: AngularFireStorage,
    public authSvc: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dateSvc: DatesService,
    private rateSvc: RateService,
    private userSvc: UserService) { }

  ngOnInit() {

    // Watch auth User to scope the visibility
    this.authSvc.user$.subscribe(
      ( user ) => {
        this.canAdmin = user.roles?.includes('ADMIN');
    });

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
        isTeacher: false,
        isStudent: false,
        contactPerson: [''],
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
          this.getUserChecked(id);
        }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getUserDetails(id: string): void {
    this.userSvc.getUserDetails(id)
      .subscribe({
        next: (userDetails: UserDetails) => {
          this.userDetails = userDetails;
          this.displayUserDetails();
        },
        error: err => this.errorMessage = err
      });
  }

  getUserChecked(id: string): void {
    this.userSvc.getUser(id)
      .subscribe({
        next: (user: User) => {
          this.userChecked = user;
          this.displayUserChecked();
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
      isTeacher: this.userDetails.isTeacher,
      isStudent: this.userDetails.isStudent,
      contactPerson: this.userDetails.contactPerson ?? '',
      contactPersonNif: this.userDetails.contactPersonNif ?? '',
      telephone: this.userDetails.telephone ?? '',
      address: this.userDetails.address ?? '',
      rateId: this.userDetails.rateId ?? 'no-aplica',
      paymentMethod: this.userDetails.paymentMethod ?? UserDetails.getDefaultPaymentMethod(),
      creationDate: this.userDetails.creationDate
    });
  }

  displayUserChecked(): void {
    console.log(`changeEnable()
      ${JSON.stringify(this.userChecked, null, '\t')}
    `);
  }

  deleteUserDetails(): void {
    if (this.userDetails.uid === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Realmente quieres eliminar: ${this.userDetails.displayName}?`)) {
        this.userSvc.deleteUserDetails(this.userDetails.uid)
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

        console.log(`Usuario: ${JSON.stringify(item)}`);

        if (item.uid === '0') {
          this.userSvc.createUserDetails(item)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.userSvc.updateUserDetails(item)
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

  changeUser( dataUser: string ) {

    switch ( dataUser ) {

      case 'ADMIN':
      case 'REVISOR':

        if ( !this.userChecked.roles ) {
          this.userChecked.roles = [dataUser];
        } else if ( !this.userChecked.roles.includes(dataUser) ) {
          this.userChecked.roles.push(dataUser);
        } else {
          const pos = this.userChecked.roles.indexOf(dataUser);
          this.userChecked.roles.splice(pos, 1);
        }
        break;

      case 'ENABLE':
        this.userChecked.enable = !this.userChecked.enable;
    }

    this.userSvc.updateUser(this.userChecked)
      .subscribe( user => {
        this.userChecked = user;
        console.log(`changeUser()
        ${JSON.stringify(this.userChecked, null, '\t')}
      `);
    });
  }

  viewUserDetail() {
    console.log(`viewUserDetail ${JSON.stringify(this.userDetails, null, '\t')}
    `);
  }

}
