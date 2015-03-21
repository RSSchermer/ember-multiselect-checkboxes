import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['multiselect-checkbox-option'],
  classNameBindings: ['isSelected:checked'],

  tagName: 'li',

  value: null,

  selection: [],

  labelProperty: null,

  disabled: false,

  isSelected: function (_, checked) {
    if (arguments.length > 1) {
      var selected = this.get('selection').contains(this.get('value'));

      if (checked && !selected) {
        this.get('selection').addObject(this.get('value'));
      } else if (!checked && selected) {
        this.get('selection').removeObject(this.get('value'));
      }
    }

    return this.get('selection').contains(this.get('value'));
  }.property('value', 'selection'),

  label: function () {
    var labelProperty = this.get('labelProperty');
    var value = this.get('value');

    if (labelProperty) {
      if (typeof value.get === 'function') {
        return value.get(labelProperty);
      } else {
        return value[labelProperty];
      }
    } else {
      return String(value);
    }
  }.property('value', 'labelProperty')
});
