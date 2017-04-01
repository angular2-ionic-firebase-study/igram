import {Component, Inject} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';

import {AngularFire, FirebaseApp, FirebaseListObservable} from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import {LoginPage} from "../login/login";
import {Camera} from "ionic-native";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  images: FirebaseListObservable<any[]>;
  base64Image: any;
  storageRef: any;
  guestPicture: any;
  private takenTime: string;

  constructor(@Inject(FirebaseApp) firebaseApp: any, public modalCtrl: ModalController, public navCtrl: NavController, public af: AngularFire, private _auth: AuthService) {
    this.storageRef = firebaseApp.storage().ref();
    this.images = af.database.list('/imagesURLs');
  }

  ionViewWillEnter() {
    if(!this._auth.authenticated) {
      alert('로그인해야만 이용할 수 있습니다');
      this.navCtrl.push(LoginPage);
    }
  }

  upload() {
    const uid = this._auth.uid();
    const userEmail = this._auth.displayName();
    const date = new Date();
    const id = uid+(date.getTime());

    return this.storageRef.child('/images/'+uid+'/'+id+'.png')
      .putString(this.guestPicture, 'base64', {contentType : 'image/png'})
      .then((savedPicture) => {
        this.images.push({
          "uid" : uid,
          "userEmail" : userEmail,
          "date" : date,
          "likeMembers": "",
          "url" : savedPicture.downloadURL
        }).then((success) => {
          alert("URL uploaded : " + success);
        }, (error) => {
          alert("Failed URL upload" + error);
        });
      });
  }

  takePicture(){
    return Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 400,
      targetHeight: 400
    }).then((imageData) => {
      this.base64Image = "data:image/png;base64," + imageData;
      this.guestPicture = imageData;
      this.takenTime = this.format(new Date());
      this.upload();
    }, (err) => {
      alert(err);
    });
  }

  format(date){
    return date.getUTCFullYear()
      +"." + (date.getUTCdateonth()+1)
      +"." + date.getUTCDate()
      +" " + date.getUTCHours()
      +":" + date.getUTCdateinutes()
      +":" + date.getUTCSeconds();
  }

  clickLikeBtn(key, likeMembers){
    if(this.isLiked(likeMembers)){
      this.unlike(key, likeMembers);
    }else{
      this.like(key, likeMembers);
    }
  }

  isLiked(likeMembers) {
    const newLikeMembers = likeMembers || [];
    const uid = this._auth.uid();

    return newLikeMembers
        .filter(likeMember => uid === likeMember)
        .length !== 0;
  }

  like(key, likeMembers) {
    const newLikeMembers = likeMembers || [];
    newLikeMembers.push(this._auth.uid());
    this.images.update(key, {likeMembers: newLikeMembers });
  }

  unlike(key, likeMembers) {
    const newLikeMembers = likeMembers || [];
    const uid = this._auth.uid();
    const filteredLikeMembers = newLikeMembers.filter(likeMember => uid !== likeMember);

    this.images.update(key, {likeMembers: filteredLikeMembers.length > 0? filteredLikeMembers: "" });
  }

  drawLikeIcon(likeMembers){
    return this.isLiked(likeMembers)? 'md-heart' : 'md-heart-outline';
  }

}
