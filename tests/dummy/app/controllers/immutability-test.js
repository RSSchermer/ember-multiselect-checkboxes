import Ember from 'ember';

let Person = Ember.Object.extend({
  name: null,

  gender: null
});

export default Ember.Controller.extend({
  persons: Ember.A([
    Person.create({ name: "Lisa", gender: "Female" }),
    Person.create({ name: "Bob", gender: "Male" }),
    Person.create({ name: "John", gender: "Male"})
  ]),

  activeSelection: Ember.A(),

  selectionHistory: Ember.A(),

  actions: {
    updateSelection: function (newSelection) {
      this.get('selectionHistory').addObject(newSelection);
      this.set('activeSelection', newSelection);
    }
  }
});
