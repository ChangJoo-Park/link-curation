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

  this.route('collections', function(){
    this.route('new');
    this.route('show', { path: '/:collection_id'}, function() {
      this.route('weeklies', function(){
        this.route('new');
        this.route('show', { path: '/:weekly_id'});
        this.route('edit', { path: '/:weekly_id/edit'});
      });
    });

  });

  this.route('register', function() {
    this.route('new');
  });

  this.route('session', function() {
    this.route('new');
  });
});

export default Router;
