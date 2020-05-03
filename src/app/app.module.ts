import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { UsersModule } from './users/users.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './home/home.component';
import { Page401Component } from './page401/page401.component';
import { Page403Component } from './page403/page403.component';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { SharedModule } from './shared/shared.module';
import { ShAddStudentDialogComponent } from './shared/sh-add-student-dialog/sh-add-student-dialog.component';
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    Page403Component,
    Page401Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'itsy-bitsy'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireAuthGuardModule, // used for AngularFireAuthGuard
    AngularFireStorageModule, // imports firebase/storage only needed for storage features

    UsersModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
  { provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ShAddStudentDialogComponent
 ]
})
export class AppModule { }
