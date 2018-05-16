import {Recipe} from './recipe';
import {RecipeMeta} from './recipeMeta';

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  numOfRecipesPosted?: number;
  recipesFlagged?: string[];
  recipesPosted?: RecipeMeta[];
}
