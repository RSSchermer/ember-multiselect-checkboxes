import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['multiselect-checkbox-option'],

  tagName: 'li',

  value: null,

  selection: [],

  labelProperty: null,

  isSelected: function () {
    return this.get('selection').contains(this.get('value'));
  }.property('value', 'selection'),

  label: function () {
    return this.get('value').get(this.get('labelProperty'));
  }.property('value', 'labelProperty'),

  isSelectedChanged: function () {
    if (this.get('isSelected') && !this.get('selection').contains(this.get('value'))) {
      this.get('selection').addObject(this.get('value'));
    } else {
      this.get('selection').removeObject(this.get('value'));
    }
  }.observes('isSelected')
});
