// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA8Io5J3qI2hkfnCW94HiXDqYJ892-8OGs",
    authDomain: "recipe-app-angular.firebaseapp.com",
    databaseURL: "https://recipe-app-angular.firebaseio.com",
    projectId: "recipe-app-angular",
    storageBucket: "recipe-app-angular.appspot.com",
    messagingSenderId: "194686902560"
  }
};
