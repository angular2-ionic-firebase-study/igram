import { Component, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseApp } from 'angularfire2';
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

  constructor(@Inject(FirebaseApp) firebaseApp: any, public af: AngularFire, private _auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
    this.storageRef = firebaseApp.storage().ref();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  uploadImage() {
    var file = new Blob(["food"], {type: 'image/png'});
    this.storageRef.child('/images/sample.png').put(file).then(function(snapshot) {
      alert("uploaded");
    });
  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

}
