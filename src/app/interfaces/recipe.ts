import {RecipeComment} from './comment';

export interface Recipe {
  recipeCreator: string;
  recipePoster: string;
  recipeName: string;
  ingredients: string[];
  instructions: string;
  photoURL: string;
  description?: string;
  id?: string;
  flagRating?: number;
  showFlag?: boolean;
  datePosted?: Date;
}
