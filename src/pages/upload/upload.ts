import { Component, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseApp, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';

import { Camera } from 'ionic-native';

/*
  Generated class for the Upload page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {

  public base64Image: any;
  public storageRef: any;
  public dbRef: any;
  public guestPicture: any;

  public items: FirebaseListObservable<any[]>;
  public uid: string;
  public displayName: string;
  private takenTime: string;

  constructor(@Inject(FirebaseApp) firebaseApp: any, public af: AngularFire, private _auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
    this.storageRef = firebaseApp.storage().ref();
    this.dbRef = af.database.list('/imagesURLs');

    this.uid = af.auth.getAuth().uid;
    this.displayName = af.auth.getAuth().auth.displayName;

    this.base64Image = null;
    this.guestPicture = null;
    this.takenTime = null;

    // console.log("uid : ", this.uid);
  }

  uploadImage() {
    // var blob = new Blob(["food"], {type: 'image/png'});
    // return this.storageRef.child('/images/sample.png').put(blob).then(function(snapshot) {
    //   alert("uploaded");
    // });

    return this.storageRef.child('/images/'+this.uid+'/new_sample.png')
      .putString(this.guestPicture, 'base64', {contentType : 'image/png'})
      .then((savedPicture) => {
        // alert(savedPicture);
        this.dbRef.push({
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

  // Choose the picture from the Photo Library
  // sourceType : Camera.PictureSourceType.PHOTOLIBRARY,

  takePicture(){
    return Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        // encodingType: Camera.EncodingType.PNG,
        targetWidth: 400,
        targetHeight: 400
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.guestPicture = imageData;
      this.takenTime = this.getDate();

      // alert("The photo was taken");
    }, (err) => {
      alert(err);
    });
  }

  private getDate(): string {
    var date = new Date();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

}
