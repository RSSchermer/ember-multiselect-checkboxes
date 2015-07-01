import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('primitivesTest', { path: '/primitives-test' });
  this.route('plainObjectsTest', { path: '/plain-objects-test' });
  this.route('emberObjectsTest', { path: '/ember-objects-test' });
  this.route('blockParamsTest', { path: '/block-params-test' });
});

export default Router;
