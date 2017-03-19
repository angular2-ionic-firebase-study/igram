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

  public base64Image: string;
  public storageRef: any;
  public dbRef: any;
  public guestPicture: any;

  public items: FirebaseListObservable<any[]>;

  constructor(@Inject(FirebaseApp) firebaseApp: any, public af: AngularFire, private _auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
    this.storageRef = firebaseApp.storage().ref();
    this.guestPicture = null;

    this.dbRef = af.database.list('/imagesURLs');
  }

  uploadImage(name, data) {
    // var blob = new Blob(["food"], {type: 'image/png'});
    // return this.storageRef.child('/images/sample.png').put(blob).then(function(snapshot) {
    //   alert("uploaded");
    // });

    return this.storageRef.child('/images/new_sample.png')
      .putString(this.guestPicture, 'base64', {contentType : 'image/png'})
      .then((savedPicture) => {
        alert(savedPicture);

        this.dbRef.push({
          "img_title" : "josh",
          "url" : savedPicture
        });
        alert("URL uploaded");
      });
  }

  takePicture(){
    return Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.PNG,
        targetWidth: 400,
        targetHeight: 400
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/png;base64," + imageData;
      this.guestPicture = imageData;

      alert("The photo was taken");
    }, (err) => {
        console.log(err);
    });
  }

}
