import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {AngularFire, FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'page-contact',
  templateUrl: 'board.html'
})
export class BoardPage {

  boards: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public af: AngularFire, private _auth: AuthService) {
    this.boards = af.database.list('boards');
  }

  write() {
    this.boards.push({'title':'hello', 'content':'테스트입니다'});
  }
}
