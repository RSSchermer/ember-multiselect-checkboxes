import EmberObject from '@ember/object';
import Controller from '@ember/controller';
import { A } from '@ember/array';

let Person = EmberObject.extend({
  name: null,

  gender: null
});

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.persons = A([
      Person.create({ name: "Lisa", gender: "Female" }),
      Person.create({ name: "Bob", gender: "Male" }),
      Person.create({ name: "John", gender: "Male"})
    ]);
    this.activeSelection = A();
    this.selectionHistory = A();
  },

  actions: {
    updateSelection: function (newSelection) {
      this.get('selectionHistory').addObject(newSelection);
      this.set('activeSelection', newSelection);
    }
  }
});
