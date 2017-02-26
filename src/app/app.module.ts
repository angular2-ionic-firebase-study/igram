import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {BrowserModule} from '@angular/platform-browser'
import {AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AuthService } from '../providers/auth-service'

const firebaseConfig = {
  apiKey: "AIzaSyAIWL1TSZzwnad43URMfB9xyaK8pLWfxIM",
  authDomain: "login-for-study.firebaseapp.com",
  databaseURL: "https://login-for-study.firebaseio.com",
  storageBucket: "login-for-study.appspot.com",
  messagingSenderId: "116062770696"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}
