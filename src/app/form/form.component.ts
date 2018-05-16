import {Component, OnInit} from '@angular/core';
import {Recipe} from '../interfaces/recipe';
import {AuthService} from '../services/auth.service';

import {MatSnackBar} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  ingredientNames: string[] = [];
  recipe: "ngModel";
  recipeNameCtrl: FormControl = new FormControl('', [Validators.required]);
  photoURLCtrl: FormControl = new FormControl('', [Validators.required]);
  authorNameCtrl: FormControl = new FormControl('', [Validators.required]);
  cookingDirectionsCtrl: FormControl = new FormControl('', [Validators.required]);
  ingredientNameCtrl: FormControl = new FormControl('');
  detailsCtrl: FormControl = new FormControl('', [Validators.required]);

  constructor(public authService: AuthService, public snackBar: MatSnackBar) {

  }

  ngOnInit() {

  }

  addItem() {
    const ingredient = this.ingredientNameCtrl.value;
    this.ingredientNameCtrl.setValue('');
    this.ingredientNames.push(ingredient);
  }

  pushRecipe() {
    let poster;

    const sub = this.authService.user.subscribe(data => {
      poster = data.email;
      const ingredients = this.ingredientNames.filter(ing => ing !== '');

      const recipe: Recipe = {
        recipeCreator: this.authorNameCtrl.value,
        recipeName: this.recipeNameCtrl.value,
        instructions: this.cookingDirectionsCtrl.value,
        ingredients,
        photoURL: this.photoURLCtrl.value,
        recipePoster: poster,
        description: this.detailsCtrl.value,
        datePosted: new Date()
      };

      this.authService.addRecipe(recipe, true).then(() => {
        this.submitted(true);
        sub.unsubscribe();
      }).catch(() => {
          this.submitted(false);
          sub.unsubscribe();
        }
      );
    });
  }

  removeItem(index: number) {
    this.ingredientNames.splice(index, 1);
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  submitted(success: boolean) {
    if (success) {
      this.openSnackBar('Successfully added recipe!', 'Thank You!');
      this.recipeNameCtrl.reset();
      this.authorNameCtrl.reset();
      this.cookingDirectionsCtrl.reset();
      this.photoURLCtrl.reset();
      this.detailsCtrl.reset();
      this.ingredientNames = [];
    } else {
      this.openSnackBar('Failed to add recipe', 'Try Again');
    }
  }
}
