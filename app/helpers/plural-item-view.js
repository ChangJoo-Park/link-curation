import Ember from 'ember';

/*
  example :
  {{plural-item-view dogs.length "dog" "dogs"}}
  You will get 0 dog, 1 dog, 2 dogs
*/
export function pluralItemView(params) {
  let number = parseInt(params[0]);
  let singular = params[1];
  let plural = params[2];
  if (number > 1) {
    return `${number} ${plural}`;
  } else {
    return `${number} ${singular}`;
  }
}
export default Ember.Helper.helper(pluralItemView);
