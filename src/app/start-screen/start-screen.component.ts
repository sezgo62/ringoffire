import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

constructor(private router: Router) { //Wir importieren unseren rounter ein damit wir auf anderen Seiten weitergeleitet werden können.
}

newGame() {
  this.router.navigateByUrl('/game');
}

}
