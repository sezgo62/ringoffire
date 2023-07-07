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

  pickCardAnimation = false;
  game: Game;
  currentCard: string = '';

  aCollection;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private afs: AngularFirestore) { //ActivatedRoute muss importiert werden damit wir auf die route zugreifen können.
    this.aCollection = afs.collection('games');
    this.game$ = collectionData(this.aCollection);
  }


  ngOnInit() {
    //this.newGame();
    this.game = new Game();

    debugger;
    this.route.params.subscribe((params) => { // Hier können wir uns die URL Parameter abonnieren.
      console.log(this.route);

      this.aCollection
        .doc(params['gameid'])
        .valueChanges()
        .subscribe((actualGame) => {
          console.log('Game update', actualGame);

          this.game.currentPlayer = actualGame.currentPlayer;
          this.game.playedCards = actualGame.playedCards;
          this.game.players = actualGame.players;
          this.game.stack = actualGame.stack;
        });

    });



  }

  newGame() {
    this.game = new Game();

    //this.aCollection.add(this.game.toJson());
  }

  takeCard() {

    if (!this.pickCardAnimation) {

      //Durch die Funktion pop() können wir das Element an der letzten stelle des arrays entnehmen.
      this.currentCard = this.game.stack.pop();
      console.log(this.currentCard);
      console.log(this.game.playedCards);
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false; // pickCardAnimation wird nach 1.5 Sekunden auf false gesetzt, weswegen wir erst nach 1.5 Sekunden wird eine Karte ziehen können und wir überhaupt wieder eine Karte ziehen können.

        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length

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

    });
  }

}