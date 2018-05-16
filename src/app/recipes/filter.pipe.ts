import {Pipe, PipeTransform} from '@angular/core';
import {Recipe} from '../interfaces/recipe';
import * as _ from 'lodash';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(recipesRaw: Recipe[], filterBy: string): Recipe[] {
    const recipes = _.flatten(recipesRaw);
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

    return filterBy ? recipes.filter((recipe: Recipe) => {
        return recipe.recipeName.toLocaleLowerCase().indexOf(filterBy) !== -1;
      })

      :
      recipes;
  }

}
