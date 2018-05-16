import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RecipesComponent } from './recipes/recipes.component';
import { FormComponent } from './form/form.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule, MatCardModule, MatFormField, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule,
  MatOptionModule, MatTabsModule,
  MatToolbarModule, MatSnackBarModule, MatDividerModule, MatListModule, MatTooltipModule, MatDialogModule
} from '@angular/material';
import {CoreModule} from './core/core.module';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { FilterPipe } from './recipes/filter.pipe';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { DateFormatterPipe } from './shared/date-formatter.pipe';


const appRoutes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent, data: {state: 'welcome'} },
  { path: 'recipes', component: RecipesComponent, data: {state: 'recipes'}},
  {path: 'add', component: FormComponent, data: {state: 'add'}},
  {path: 'details/:id', component: DetailsComponent, data: {state: 'details'}},
  {path: '**', component: WelcomeComponent},

];


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RecipesComponent,
    FormComponent,
    DetailsComponent,
    FilterPipe,
    HelpDialogComponent,
    UserRecipesComponent,
    DateFormatterPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CoreModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes),
    MatFormFieldModule,
    MatOptionModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [HelpDialogComponent, UserRecipesComponent]
})
export class AppModule { }
