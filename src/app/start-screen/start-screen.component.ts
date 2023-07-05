import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  aCollection;

constructor(private router: Router, private afs: AngularFirestore) { //Wir importieren unseren rounter ein damit wir auf anderen Seiten weitergeleitet werden können.
this.aCollection = afs.collection('games');
}

newGame() {
  let game = new Game;

  this.aCollection.add(game.toJson())
  .then((gameInfo: any) => {
    console.log(gameInfo);
  })
  ;

  this.router.navigateByUrl('/game');
}

}
