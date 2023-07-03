import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { GameInfoComponent } from './game-info/game-info.component';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
//import { environment } from '../environments/environment';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';


import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

const environment = {
  production: false,
  firebase: {
    projectId: 'fir-multiplayer-fc117',
    appId: '1:1085515121593:web:0b8063a951823de5de2c68',
    storageBucket: 'fir-multiplayer-fc117.appspot.com',
    apiKey: 'AIzaSyCOnKr2sLyOhsdtzWA-VF9qn7GlzRA52W0',
    authDomain: 'fir-multiplayer-fc117.firebaseapp.com',
    messagingSenderId: '1085515121593',
    measurementId: 'G-7XTQ71BFJ7',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    GameComponent,
    PlayerComponent,
    DialogAddPlayerComponent,
    GameInfoComponent
  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;

  constructor() {
    /*const aCollection = collection(this.firestore, 'games')
    this.items$ = collectionData(aCollection);
    console.log('array wurde geladen', this.items$);

    this.items$.subscribe( (newTodos) => {
      //console.log('Neue todos sind', newTodos);
      //newTodos = newTodos;
      //this.todos = newTodos;
      });*/
  }

}

