import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { BoardPage } from '../pages/board/board';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { FormsModule } from '@angular/forms';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from '../providers/auth-service';

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
    HomePage,
    LoginPage
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
    HomePage,
    LoginPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}
