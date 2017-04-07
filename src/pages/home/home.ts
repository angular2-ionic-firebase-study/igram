import {Component, Inject} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';

import {AngularFire, FirebaseApp, FirebaseListObservable } from 'angularfire2';
import {AuthService} from '../../providers/auth-service';
import {LoginPage} from "../login/login";
import {Camera} from "ionic-native";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  base64Image: any;
  storageRef: any;
  guestPicture: any;

  public uid: any;
  public userEmail: any;

  private images: FirebaseListObservable<any[]>;
  // public images: any;
  private takenTime: string;

  constructor(@Inject(FirebaseApp) firebaseApp: any, public modalCtrl: ModalController, public navCtrl: NavController, public af: AngularFire, private _auth: AuthService) {
    // this.images = af.database.list('/imagesURLs').map( (arr) => { return arr.reverse(); } );

    if (this._auth.authenticated) {
      this.uid = this._auth.uid();
      this.userEmail = this._auth.displayName();

      this.storageRef = firebaseApp.storage().ref();
      this.images = af.database.list('/imagesURLs');
    }
  }

  ionViewWillEnter() {
    if(!this._auth.authenticated) {
      alert('로그인해야만 이용할 수 있습니다');
      this.navCtrl.setRoot(LoginPage);
      // this.navCtrl.popToRoot();
    }
  }

  takePicture() {
    return Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 400,
      targetHeight: 400
    }).then((imageData) => {
      this.base64Image = "data:image/png;base64," + imageData;
      this.guestPicture = imageData;
      this.takenTime = this.getDate();
      this.uploadImage();
    }, (err) => {
      alert(err);
    });
  }

  selectFromPhotoAlbum() {
    return Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.PNG,
        targetWidth: 400,
        targetHeight: 400
    }).then((imageData) => {
      this.base64Image = "data:image/png;base64," + imageData;
      this.guestPicture = imageData;
      this.takenTime = this.getDate();
      this.uploadImage();
    }, (err) => {
      alert(err);
    });
  }

  uploadImage() {
    // const uid = this._auth.uid();
    // const userEmail = this._auth.displayName();
    // const date = new Date();
    // const id = uid+(date.getTime());

    return this.storageRef.child('/images/'+this.uid+'/'+this.getId()+'.png')
      .putString(this.guestPicture, 'base64', {contentType : 'image/png'})
      .then((savedPicture) => {
        this.images.push({
          "uid" : this.uid,
          "userEmail" : this.userEmail,
          "date" : this.takenTime,
          "likeMembers": "",
          "url" : savedPicture.downloadURL
        }).then((success) => {
          alert("URL uploaded : " + success);
        }, (error) => {
          alert("Failed URL upload" + error);
        });
      });
  }

  signOut() {
    this._auth.signOut();
    this.navCtrl.push(LoginPage);
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

    return newLikeMembers
        .filter(likeMember => this.uid === likeMember)
        .length !== 0;
  }

  like(key, likeMembers) {
    const newLikeMembers = likeMembers || [];
    newLikeMembers.push(this.uid);
    this.images.update(key, {likeMembers: newLikeMembers });
  }

  unlike(key, likeMembers) {
    const newLikeMembers = likeMembers || [];
    const filteredLikeMembers = newLikeMembers.filter(likeMember => this.uid !== likeMember);

    this.images.update(key, {likeMembers: filteredLikeMembers.length > 0? filteredLikeMembers: "" });
  }

  drawLikeIcon(likeMembers){
    return this.isLiked(likeMembers)? 'heart' : 'heart-outline';
  }

  private getDate(): string {
    const date = new Date();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  private getId(): string {
    const id = new Date();
    return id.toISOString().slice(0,10) + id.getHours() + id.getMinutes() + id.getSeconds();
  }

}
