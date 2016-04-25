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
      });
    });

  });
});

export default Router;
