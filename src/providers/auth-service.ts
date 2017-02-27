import { Injectable } from '@angular/core';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;

  constructor(public auth$: AngularFireAuth) {
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  signup(email: string, password: string) {
    this.auth$.createUser({ email: email, password: password });
  }

  signInWithEmail(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      email: email,
      password: password,
    }, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }

  signOut(): void {
    this.auth$.logout();
  }

  displayName(): string {
    if (this.authState != null) {
      return this.authState.facebook.displayName;
    } else {
      return '';
    }
  }

  email(): string {
    if (this.authState != null) {

      if(this.authState.facebook){
        return this.authState.facebook.email;
      } else if(this.authState.google){
        return this.authState.google.email;
      }

    }

    return '';

  }

}
