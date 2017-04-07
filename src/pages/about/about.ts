import { Component, Inject } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

import { FirebaseApp, AngularFire, FirebaseListObservable } from 'angularfire2';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public base64Image: any;
  public guestPicture: any;

  public authorizedData: any;
  public storageRef: any;

  public uid: string;
  public displayName: string;
  private takenTime: string;

  public imgUrls: FirebaseListObservable<any[]>;
  private imgNum: number;

  constructor(@Inject(FirebaseApp) firebaseApp: any, public af: AngularFire, public navCtrl: NavController, public navParams: NavParams, private _auth: AuthService) {
    this.navCtrl = navCtrl;
    this.storageRef = firebaseApp.storage().ref();
    this.uid = af.auth.getAuth().uid;
    // this.imgUrls = af.database.list('/imagesURLs',{ query: { orderByChild: 'uid', equalTo: this.uid} });
    this.imgUrls = af.database.list('/imagesURLs');
    // this.imgUrls = af.database.list('/imagesURLs').map( (arr) => { return arr.reverse(); } );
    this.imgNum = 0;

    this.displayName = af.auth.getAuth().auth.displayName;

    this.base64Image = null;
    this.guestPicture = null;
    this.takenTime = null;

    if (this.navParams.get('auth')) {
      this.authorizedData = this.navParams.get('auth').auth;
    }

    this.countUploadedImages();
  }

  signOut() {
    // this._auth.signOut();
    // this.navCtrl.pop();

    this.af.auth.logout();
    this.navCtrl.pop();
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
    return this.storageRef.child('/images/'+this.uid+'/'+this.getId()+'.png')
      .putString(this.guestPicture, 'base64', {contentType : 'image/png'})
      .then((savedPicture) => {
        this.imgUrls.push({
          "uid" : this.uid,
          "name" : this.displayName,
          "date" : this.takenTime,
          "url" : savedPicture.downloadURL
        }).then((success) => {
          alert("URL uploaded : " + success);
        }, (error) => {
          alert("Failed URL upload" + error);
        });
      });
  }

  private getDate(): string {
    var date = new Date();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  private getId(): string {
    var id = new Date();
    return id.toISOString().slice(0,10) + id.getHours() + id.getMinutes() + id.getSeconds();
  }

  private countUploadedImages(): any{
    return this.imgUrls.map(list => list.length).subscribe(length => this.imgNum = length);
  }

}
