import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, getFirestore } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';


import { Observable } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  //firestore: Firestore = getFirestore();

  firestore: Firestore = inject(Firestore);
  game$: Observable<any[]>;

  //private itemsCollection: AngularFirestoreCollection<any>;

  game: Game;
  

  aCollection;

  gameId: string;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private afs: AngularFirestore) { //ActivatedRoute muss importiert werden damit wir auf die route zugreifen können.
    this.aCollection = afs.collection('games');
    this.game$ = collectionData(this.aCollection);
  }


  ngOnInit() {
    //this.newGame();
    this.game = new Game();

    this.route.params.subscribe((params) => { // Hier können wir uns die URL Parameter abonnieren.
      console.log(params['gameid']);

      this.gameId = params['gameid'];

      this.aCollection
        .doc(params['gameid']) //Wir bekommen Zugriff auf das document mit der jeweiligen id.
        .valueChanges() //Diese Funktion tritt in Kraft wenn es eine Änderung in der Datenbank gibt.
        .subscribe((actualGame) => { // Die subscribe() wird oft ausgeführt, falls eine Änderung geschieht, wohingegen die then() Methode nur einmal ausgeführt wird.
          console.log('Game update', actualGame);


          //Hier wird das aktuelle Spiel in der Datenbank aktualisiert.
          this.game.currentPlayer = actualGame.currentPlayer;
          this.game.playedCards = actualGame.playedCards;
          this.game.players = actualGame.players;
          this.game.stack = actualGame.stack;
          this.game.currentCard = actualGame.currentCard;
          this.game.pickCardAnimation = actualGame.pickCardAnimation;
        });
    });
  }

  saveGame() {
   
    this.aCollection
    .doc(this.gameId)
    .update(this.game.toJson());
   
  }

  newGame() {
    this.game = new Game();

    //this.aCollection.add(this.game.toJson());
  }

  takeCard() {

    if (!this.game.pickCardAnimation) {

      //Durch die Funktion pop() können wir das Element an der letzten stelle des arrays entnehmen.
      this.game.currentCard = this.game.stack.pop();
      console.log(this.game.currentCard);
      console.log(this.game.playedCards);
      this.game.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false; // pickCardAnimation wird nach 1.5 Sekunden auf false gesetzt, weswegen wir erst nach 1.5 Sekunden wird eine Karte ziehen können und wir überhaupt wieder eine Karte ziehen können.
        this.saveGame();

        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length
        this.saveGame();

      }, 1000);

    }


    /*if(this.game.currentPlayer == this.game.players.length){
     debugger;
      this.game.currentPlayer = 0;
      
    }*/
  }




   openDialog(): void {
   const dialogRef = this.dialog.open(DialogAddPlayerComponent);


    dialogRef.afterClosed().subscribe(name => {
      console.log('The dialog was closed', name);

      if (name.length > 0) {
        this.game.players.push(name);

      }
      this.saveGame();
    });
  }



}