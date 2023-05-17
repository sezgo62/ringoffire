import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']

  
})
export class DialogAddPlayerComponent {

 name: string = '';

 constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>){

 }

 onNoClick(): void {
  this.dialogRef.close();
}

}
