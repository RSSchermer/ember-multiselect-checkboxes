import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('primitives-test', { path: '/primitives-test' });
  this.route('plain-objects-test', { path: '/plain-objects-test' });
  this.route('ember-objects-test', { path: '/ember-objects-test' });
  this.route('block-params-test', { path: '/block-params-test' });
  this.route('long-option-list-test', { path: '/long-option-list-test' });
  this.route('immutability-test', { path: '/immutability-test' });
});

export default Router;
