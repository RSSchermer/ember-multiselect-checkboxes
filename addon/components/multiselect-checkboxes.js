import Ember from 'ember';

let Checkbox = Ember.Object.extend({
  isSelected: Ember.computed('value', 'selection.[]', {
    get() {
      return this.get('selection').contains(this.get('value'));
    },

    set(_, checked) {
      let selection = this.get('selection');
      let selected = selection.contains(this.get('value'));
      let onchange = this.get('onchange');
      let updateSelectionValue = this.get('updateSelectionValue');
      let isMutable = typeof selection.addObject === 'function' && typeof selection.removeObject === 'function';

      // Dispatch onchange event to handler with updated selection if handler is specified
      if (onchange) {
        let updated = Ember.A(selection.slice());
        let operation;

        if (checked && !selected) {
          operation = 'added';
          updated.addObject(this.get('value'));
        } else if (!checked && selected) {
          operation = 'removed';
          updated.removeObject(this.get('value'));
        }

        onchange(updated, this.get('value'), operation);
      }

      // Mutate selection if updateSelectionValue is true and selection is mutable
      if (updateSelectionValue !== false && isMutable) {
        if (checked && !selected) {
          selection.addObject(this.get('value'));
        } else if (!checked && selected) {
          selection.removeObject(this.get('value'));
        }

        return checked;
      } else {

        // Only change the checked status of the checkbox when selection is mutated, because if
        // it is not mutated and the onchange handler does not update the bound selection value the
        // displayed checkboxes would be out of sync with bound selection value.
        return !checked;
      }
    }
  })
});

export default Ember.Component.extend({
  classNames: ['multiselect-checkboxes'],

  tagName: 'ul',

  i18n: Ember.inject.service('i18n'),

  checkboxes: Ember.computed('options.[]', 'labelProperty', 'valueProperty', 'selection', 'translate', function () {
    let labelProperty = this.get('labelProperty');
    let valueProperty = this.get('valueProperty');
    let selection = Ember.A(this.get('selection'));
    let onchange = this.get('onchange');
    let updateSelectionValue = this.get('updateSelectionValue') !== undefined ? this.get('updateSelectionValue') : true;
    let options = Ember.A(this.get('options'));
    let translate = this.get('translate');

    let checkboxes = options.map((option) => {
      let label, value;

      if (labelProperty) {
        if (typeof option.get === 'function') {
          label = option.get(labelProperty);
        } else {
          label = option[labelProperty];
        }
      } else {
        label = String(option);
      }

      if (translate && label && this.get('i18n')) {
        label = this.get('i18n').t(label);
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
        option: option,
        label: label,
        value: value,
        selection: selection,
        onchange: onchange,
        updateSelectionValue: updateSelectionValue
      });
    });

    return Ember.A(checkboxes);
  })
});
