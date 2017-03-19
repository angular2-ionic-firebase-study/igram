import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { BoardPage } from '../pages/board/board';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UploadPage } from '../pages/upload/upload';

import { FormsModule } from '@angular/forms';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from '../providers/auth-service';
import {BoardWritePage} from "../pages/board/modal/board-write";

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyArJZ75oF81Ezb3oimXuKb0GrIWhPTSj98',
  authDomain: 'igram-f57b5.firebaseapp.com',
  databaseURL: 'https://igram-f57b5.firebaseio.com/',
  storageBucket: 'gs://igram-f57b5.appspot.com'
  // messagingSenderId: '<your-messaging-sender-id>'
};

export const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    BoardPage,
    BoardWritePage,
    HomePage,
    LoginPage,
    UploadPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    BoardPage,
    BoardWritePage,
    HomePage,
    LoginPage,
    UploadPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}
