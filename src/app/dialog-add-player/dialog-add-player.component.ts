import { Component, ElementRef, Input, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent {
  userDetailsForm: FormGroup;
 name: string = '';


  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>, private fb: FormBuilder) {
    
    this.userDetailsForm = this.fb.group({
      gender: ['female', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
    console.log(this.userDetailsForm);
    debugger;

    console.log(this.userDetailsForm.value.name);


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitUserDetails() {

    debugger;
    if (this.userDetailsForm.valid) {
      debugger;
      //const genderValue = this.userDetailsForm.value.gender;
      //const nameValue = this.userDetailsForm.value.name;

      //console.log('Gender:', genderValue);
      //console.log('Gender:', nameValue);

    } else {
      // Formular ist ungültig
    }
  }

  
}
