import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Plugins
import { File } from "@ionic-native/file/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { Network } from "@ionic-native/network/ngx";



// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';




export const firebaseConfig = {
  apiKey: "AIzaSyBbtbgvb6N5VFVWILArqr2snKlweBEUjFk",
  authDomain: "glucodiario-3cdbc.firebaseapp.com",
  databaseURL: "https://glucodiario-3cdbc.firebaseio.com",
  projectId: "glucodiario-3cdbc",
  storageBucket: "glucodiario-3cdbc.appspot.com",
  messagingSenderId: "69476793065"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  exports: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    File,
    Network,
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
