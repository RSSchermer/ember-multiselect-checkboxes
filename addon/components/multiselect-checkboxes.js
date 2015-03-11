import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['multiselect-checkboxes'],

  tagName: 'ul',

  options: null,

  selection: null,

  labelProperty: null,

  setupActionHandler: function () {
    function actionHandler (param) {
      this.sendAction('action', param);
    }
    var action = this.get('action');
    if (action) {
      this.set('_actions.' + action, actionHandler);
    }
  }.on('init'),

  actions: {

  }
});
