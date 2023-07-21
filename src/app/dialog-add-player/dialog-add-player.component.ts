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
  gender: String = '';

  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>, private fb: FormBuilder) {

    this.userDetailsForm = this.fb.group({
      maleGender: ['', [Validators.required]],
      femaleGender: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
    console.log(this.userDetailsForm);
    debugger;
    console.log(this.userDetailsForm.value.name);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCheckboxChange() {
    const femaleCheckbox = this.userDetailsForm.get('femaleGender');
    const maleCheckbox = this.userDetailsForm.get('maleGender');
  
    if (femaleCheckbox.value) {
      maleCheckbox.disable();
    } else {
      maleCheckbox.enable();
    }
  
    if (maleCheckbox.value) {
      femaleCheckbox.disable();
    } else {
      femaleCheckbox.enable();
    }
  }
    
  /*onSubmitUserDetails() {

    debugger;
    if (this.userDetailsForm.valid) {
      debugger;
      this.gender = this.userDetailsForm.value ? "female" : "male";
      const nameValue = this.userDetailsForm.value.name;

      console.log('Gender:', this.gender);
      console.log('Gender:', nameValue);

    } else {
      // Formular ist ungültig
    }
  }*/



  onSubmitUserDetails() {
    if (this.userDetailsForm.valid) {
      const femaleGenderValue = this.userDetailsForm.value.femaleGender;
      const maleGenderValue = this.userDetailsForm.value.maleGender;
  
      if (femaleGenderValue) {
        this.gender = "female";
      } else if (maleGenderValue) {
        this.gender = "male";
      } else {
        // Kein Geschlecht ausgewählt
        // Hier können Sie entsprechende Maßnahmen ergreifen
        return;
      }
  
      const nameValue = this.userDetailsForm.value.name;
      console.log('Gender:', this.gender);
      console.log('Name:', nameValue);
  
    } else {
      // Formular ist ungültig
    }
  }
  


}
