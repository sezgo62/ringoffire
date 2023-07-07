import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'game/:gameid', component: GameComponent }, //nach dem game/ übergeben wir einen Parameter um eine individuelle URL zu erschaffen.

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
