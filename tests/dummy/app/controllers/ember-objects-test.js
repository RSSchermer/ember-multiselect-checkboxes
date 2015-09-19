import Ember from 'ember';

var Person = Ember.Object.extend({
  name: null,

  gender: null
});

export default Ember.Controller.extend({
  persons: [
    Person.create({ name: "Lisa", gender: "Female" }),
    Person.create({ name: "Bob", gender: "Male" }),
    Person.create({ name: "John", gender: "Male"})
  ],

  selectedPersons: [],

  personsDisabled: false,

  actions: {
    selectAllPersons: function() {
      this.set("selectedPersons", this.get('persons').slice());
    },

    clearPersons: function() {
      this.set("selectedPersons", []);
    },

    toggleDisabled: function() {
      this.toggleProperty("personsDisabled");
    }
  }
});
