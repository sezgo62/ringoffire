import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, getFirestore } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


import { Observable } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  //firestore: Firestore = getFirestore();

  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  private itemsCollection: AngularFirestoreCollection<any>;

  pickCardAnimation = false;
  game: Game;
  currentCard: string = '';

  aCollection;

  constructor(public dialog: MatDialog, private afs: AngularFirestore) {
    this.aCollection = collection(this.firestore, 'game');
    this.items$ = collectionData(this.aCollection);
  }


  ngOnInit() {
    this.newGame();
   
    this.items$ = this.aCollection.valueChanges().subscribe((game) => {
      debugger;
      console.log('Game update', game);
    });

  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
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