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
  this.route('collections');

  this.route('weeklies', function() {
    this.route('weekly', { path: '/:weekly_id' }, function() {});
    this.route('new');
  });
});

export default Router;
