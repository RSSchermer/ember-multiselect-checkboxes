import Ember from 'ember';

var Checkbox = Ember.Object.extend({
  isSelected: Ember.computed('value', 'selection', function (_, checked) {
    if (arguments.length > 1) {
      var selected = this.get('selection').contains(this.get('value'));

      if (checked && !selected) {
        this.get('selection').addObject(this.get('value'));
      } else if (!checked && selected) {
        this.get('selection').removeObject(this.get('value'));
      }
    }

    return this.get('selection').contains(this.get('value'));
  })
});

export default Ember.Component.extend({
  classNames: ['multiselect-checkboxes'],

  tagName: 'ul',

  options: Ember.A(),

  selection: Ember.A(),

  labelProperty: null,

  valueProperty: null,

  disabled: false,

  checkboxes: Ember.computed('options', 'labelProperty', 'valueProperty', 'selection', function () {
    var labelProperty = this.get('labelProperty');
    var valueProperty = this.get('valueProperty');
    var selection = this.get('selection');

    var checkboxes = this.get('options').map((option) => {
      var label, value;

      if (labelProperty) {
        if (typeof option.get === 'function') {
          label = option.get(labelProperty);
        } else {
          label = option[labelProperty];
        }
      } else {
        label = String(option);
      }

      if (valueProperty) {
        if (typeof option.get === 'function') {
          value = option.get(valueProperty);
        } else {
          value = option[valueProperty];
        }
      } else {
        value = option;
      }

      return Checkbox.create({
        label: label,
        value: value,
        selection: selection
      });
    });

    return Ember.A(checkboxes);
  })
});
