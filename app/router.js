import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', { path: '/' },function() {});
  this.route('archive');
  this.route('admin', function() {
    this.route('seeder');
  });
});

export default Router;
