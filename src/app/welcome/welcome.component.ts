import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import * as firebase from 'firebase/app';
import {HelpDialogComponent} from '../help-dialog/help-dialog.component';
import {UserRecipesComponent} from '../user-recipes/user-recipes.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  uNameCtrl: FormControl = new FormControl('', [Validators.required]);
  uEmailCtrl: FormControl = new FormControl('', [Validators.required]);
  uPasswordCtrl: FormControl = new FormControl('', [Validators.required]);
  iEmailCtrl: FormControl = new FormControl('', [Validators.required]);
  iPasswordCtrl: FormControl = new FormControl ('', [Validators.required]);


  constructor(public auth: AuthService, public snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit() {
    return;
  }

  signUp() {
    this.auth.emailSignup(this.uEmailCtrl.value, this.uPasswordCtrl.value, this.uNameCtrl.value).then(message => {
      this.snackBar.open('Account created successfully', '', {duration: 2000});
      this.uEmailCtrl.reset();
      this.uPasswordCtrl.reset();
      this.uNameCtrl.reset();
    })
      .catch(message => {
        this.snackBar.open(message.message, '', {duration: 2000});
      });
  }

  signIn() {
    this.auth.emailSignIn(this.iEmailCtrl.value, this.iPasswordCtrl.value).then(message => {
      this.snackBar.open('Signed in successfully', '', {duration: 2000});
      console.log(firebase.auth().currentUser);

    })
      .catch(message => {
        this.snackBar.open(message.message, '', {duration: 2000});
      });
  }

  openHelpDialog(){
    this.dialog.open(HelpDialogComponent, {height: '500px'});
  }

  openUserRecipesDialog(){
    this.dialog.open(UserRecipesComponent);
  }
}
