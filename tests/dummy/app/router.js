import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('primitivesTest', { path: '/primitives-test' });
  this.route('plainObjectsTest', { path: '/plain-objects-test' });
  this.route('emberObjectsTest', { path: '/ember-objects-test' });
  this.route('blockParamsTest', { path: '/block-params-test' });
  this.route('longOptionListTest', { path: '/long-option-list-test' });
  this.route('immutabilityTest', { path: '/immutability-test' });
});

export default Router;
