import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  url: attr('string'),
  title: attr('string'),
  createdAt: attr('date'),
  updated: attr('at')
});
