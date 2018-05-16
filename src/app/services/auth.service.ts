import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../interfaces/user';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import {Recipe} from '../interfaces/recipe';
import {reject} from 'q';
import {RecipeMeta} from '../interfaces/recipeMeta';

@Injectable()
export class AuthService {

  user: Observable<User>;
  creds: any;

  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore) {

    this.user = this.fireAuth.authState
      .switchMap(user => {
        if (user) {
          return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const a = new firebase.auth.EmailAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailSignup(email, password, userName) {
    const prom = this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
    prom.then(() => {
      this.updateUserData(firebase.auth().currentUser, userName);
    });
    return prom;
  }

  emailSignIn(email, password) {
    const prom = this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    prom.then(() => {
      this.updateUserData(firebase.auth().currentUser);
    });
    return prom;
  }

  private oAuthLogin(provider) {
    return this.fireAuth.auth.signInWithPopup(provider)
      .then(credential => {
        this.creds = credential.user;
        this.updateUserData(credential.user);
      });
  }

  private updateUserData(user, userName?) {

    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
    const sub = userRef.valueChanges().subscribe(dat => {
      let data: User = {
        uid: user.uid,
        email: user.email,
        displayName: userName ? userName : dat ? dat.displayName : user.displayName ? user.displayName : 'Anonymous',
        photoURL: user.photoURL,
        // heh, nuthin personell
        numOfRecipesPosted: dat ? dat.numOfRecipesPosted ? dat.numOfRecipesPosted : 0 : 0,
        recipesFlagged: dat ? dat.recipesFlagged ? dat.recipesFlagged : [] : [],
        recipesPosted: dat ? dat.recipesPosted ? dat.recipesPosted : [] : []
      };
      userRef.set(data);
      sub.unsubscribe();
    });
  }

  private incrementUserRecipeCount() {
    const sub = this.user.subscribe(dat => {
      const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${dat.uid}`);
      let count = dat.numOfRecipesPosted;
      count = count ? count + 1 : 1;
      userRef.update({numOfRecipesPosted: count});
      sub.unsubscribe();
    });
  }

  addRecipe(recipe: Recipe, incrCounter: boolean) {
    return new Promise((resolve, rej) => {
      if (this.checkIfNullOrEmpty(recipe)) {
        rej(false);
      }
      else {
        this.fireStore.collection('recipes').add(recipe).then(docRef => {
          this.fireStore.collection('recipes').doc(`${docRef.id}`).update({id: docRef.id});
          if (incrCounter) {
            this.incrementUserRecipeCount();
          }
          this.updateUserRecipes(docRef.id, recipe.recipeName);
        }).then(() => resolve(true)).catch(() => rej(false));
      }
    });
  }

  updateUserRecipes(id: string, name: string) {
    const sub = this.user.subscribe(user => {
      const userRef = this.fireStore.collection('users').doc(`${user.uid}`);
      const recipeData: RecipeMeta = {
        recipeID: id,
        recipeName: name,
        postDate: new Date()
      };
      let recipesPosted: RecipeMeta[] = [];
      if (user.recipesPosted) {
        recipesPosted = user.recipesPosted;
      }
      recipesPosted.push(recipeData);
      userRef.update({recipesPosted});
      sub.unsubscribe();
    });
  }

  signOut() {
    this.fireAuth.auth.signOut().then(() => console.log('user signed out')).catch((error) => console.log(error.message));
  }

  checkIfNullOrEmpty(obj): boolean {
    for (let key in obj) {
      if (!obj[key] || obj[key] === '') {
        console.log(key);
        console.log(obj);
        return true;
      }
    }
    return false;
  }
}
