import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatGridList, MatSnackBar} from '@angular/material';
import {AuthService} from '../services/auth.service';
import {RecipeService} from '../services/recipe.service';
import {Observable} from 'rxjs/Observable';
import {Recipe} from '../interfaces/recipe';
import * as _ from 'lodash';
import {MatSnackBarModule} from '@angular/material';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({opacity: '0', transform: 'translateY(100px)'}),
          stagger(100, animate('.6s ease-in-out', keyframes([
            style({opacity: '0', transform: 'translateY(-100px)', offset: 0}),
            style({opacity: '1', transform: 'translateY(50px)', offset: .3}),
            style({opacity: '1', transform: 'translateY(0)', offset: 1})
          ])))
        ], {optional: true})
      ])
    ])
  ]
})
export class RecipesComponent implements OnInit, OnDestroy {

  recipeObjects;
  filterBy: string;
  deletedRecipes = [];
  showDiv = true;
  recipeSub;

  constructor(public recipeService: RecipeService, public auth: AuthService, public snackBar: MatSnackBar) {

  }

  ngOnInit() {

    this.recipeSub = this.recipeService.recipes.subscribe(data => {
      // only add if recipe has a name
      const temp = data.filter(val => val.recipeName);
      this.recipeObjects = temp;

    });
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }

  deleteRecipe(id) {
    const sub = this.recipeService.getRecipe(id).subscribe(recipe => {
      if (recipe.recipeName) {
        this.deletedRecipes.push(recipe);
      }
      this.recipeService.deleteRecipe(id).then(() => {
        sub.unsubscribe();
      });
    });
  }

  undoDelete() {
    this.auth.addRecipe(this.deletedRecipes.pop(), false);
  }

  increaseFlag(id, e) {
    let userFlags;
    const sub = this.auth.user.subscribe(user => {
      userFlags = user.recipesFlagged ? user.recipesFlagged : [];
      let idFound = false;
      for (let i = 0; i < userFlags.length; i++) {
        if (userFlags[i] === id) {
          idFound = true;
        }
      }
      if (!idFound) {
        this.recipeService.increaseRecipeFlag(id);
        this.snackBar.open('The recipe has been flagged, Thanks for your feedback', '', {duration: 2000});
      }
      else {
        this.snackBar.open('You\'ve already flagged this recipe!', '', {duration: 2000});
      }
      sub.unsubscribe();
    });

  }
}
