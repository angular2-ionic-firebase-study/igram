/**
 * Created by jojoldu@gmail.com on 2017. 3. 19.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

import {Component} from "@angular/core";
import {AuthService} from "../../../providers/auth-service";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {ViewController} from "ionic-angular";

@Component({
  selector: 'page-contact',
  templateUrl: 'board-write.html'
})
export class BoardWritePage {
  boards: FirebaseListObservable<any[]>;
  title: '';
  content: '';

  constructor( public viewCtrl: ViewController, public af: AngularFire, private _auth: AuthService) {
    this.boards = af.database.list('boards');
  }

  write() {
    const user = this._auth.displayName();
    const uid = this._auth.uid();
    const title = this.title || '';
    const content = this.content || '';

    this.boards.push({
      'uid':uid,
      'user':user,
      'title': title,
      'content': content
    }).then((success) => this.dismiss())
      .catch((err) => alert('등록에 실패하였습니다.'));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
