import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../services/recipe.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit {

  recipesPosted = [];
  activeRecipes = [];


  constructor(public recipeService: RecipeService, public auth: AuthService) {
  }

  ngOnInit() {
    const sub = this.auth.user.subscribe(user => {
      if (user.recipesPosted) {
        this.recipesPosted = user.recipesPosted;
        for (let i = 0; i < this.recipesPosted.length; i++) {
          const s = this.recipeService.getRecipe(this.recipesPosted[i].recipeID).subscribe(recipe => {
            if (!recipe.recipeName) {
              this.activeRecipes.push({recipeName: '(Recipe was deleted)'});
            }
            else{
              this.activeRecipes.push(this.recipesPosted[i]);
            }
            s.unsubscribe();
          });
        }
      }
      sub.unsubscribe();
    });
  }

}
