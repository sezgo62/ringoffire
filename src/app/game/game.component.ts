import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game;
  currentCard: string = '';

  constructor(public dialog: MatDialog) { 

  }

  
ngOnInit(): void {
this.newGame();
}

newGame() {
this.game = new Game();
console.log(this.game);
}

  takeCard() {

if(!this.pickCardAnimation) { 

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

  if(name.length > 0) {
  this.game.players.push(name);

  }
 
});
}

}