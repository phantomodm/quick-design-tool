import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ProductOptionsComponent } from './product-options/product-options.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Injector } from '@angular/core';

const firebase = {
  apiKey: "AIzaSyCZH5clhiOV3Ia38MiQQwvSMSegHL4qU_g",
  authDomain: "nystix-ui-web-data.firebaseapp.com",
  databaseURL: "https://nystix-ui-web-data.firebaseio.com",
  projectId: "nystix-ui-web-data",
  storageBucket: "nystix-ui-web-data.appspot.com",
  messagingSenderId: "243122665158",
  appId: "1:243122665158:web:c7c24a321610e16bc209c7",
  measurementId: "G-3G0Z0KDLP7",
}


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductOptionsComponent,
    ImageCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    NgbModule,
  ],
  providers: [],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private injector:Injector){}

  ngDoBootstrap(){
    const el = createCustomElement( MainComponent,{injector: this.injector} )
    customElements.define('nystix-quick-design-tool', el)
  };

}


