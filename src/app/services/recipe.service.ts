import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Recipe} from '../interfaces/recipe';
import * as firebase from 'firebase/app';
import {AuthService} from './auth.service';

@Injectable()
export class RecipeService {

  recipes: Observable<Recipe[]>;
  recipeConstant: Recipe[];

  constructor(private fireStore: AngularFirestore, private auth: AuthService) {
    const recipesCollection = this.fireStore.collection<Recipe>('recipes');
    this.recipes = recipesCollection.valueChanges();
  }

  getRecipe(id): Observable<Recipe> {
    return this.fireStore.collection<Recipe>('recipes').doc<Recipe>(`${id}`).valueChanges();
  }

  forceUpdate(): void {
    this.fireStore.collection('recipes').add({DELET: true}).then(docRef => {
      this.fireStore.collection('recipes').doc(`${docRef.id}`).delete();
    });
  }

  deleteRecipe(id) {
    return this.fireStore.collection('recipes').doc(`${id}`).delete();
  }

  addComment(recipeId, poster, posterEmail, content) {
    const commentRef = this.fireStore.collection('recipes').doc(`${recipeId}`).collection('comments');
    commentRef.add({poster, posterEmail, content, datePosted: new Date()}).then(docRef => {
      commentRef.doc(`${docRef.id}`).update({id: docRef.id});
    });
  }

  deleteComment(recipeId, commentId) {
    return this.fireStore.collection('recipes').doc(`${recipeId}`).collection('comments').doc(`${commentId}`).delete();
  }

  getComments(recipeId) {
    return this.fireStore.collection('recipes').doc(`${recipeId}`).collection('comments').valueChanges();
  }

  increaseRecipeFlag(id) {
    const sub = this.getRecipe(id).subscribe(data => {
      const subU = this.auth.user.subscribe(user => {
        let recipesFlagged: string[] = [];
        if (user.recipesFlagged) {
          recipesFlagged = user.recipesFlagged;
          recipesFlagged.push(data.id);
        }
        else {
          recipesFlagged.push(data.id);
        }
        this.fireStore.doc(`users/${user.uid}`).update({recipesFlagged});
        const count = data.flagRating ? data.flagRating + 1 : 1;
        this.fireStore.collection('recipes').doc(`${id}`).update({flagRating: count});
        subU.unsubscribe();
      });
        sub.unsubscribe();
    });
  }

}
