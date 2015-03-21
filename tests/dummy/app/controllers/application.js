import Ember from 'ember';

var Person = Ember.Object.extend({
  name: null,

  gender: null
});

export default Ember.Controller.extend({
  fruits: ["apple", "banana", "orange"],

  selectedFruits: [],

  cars: [
    { make: "BMW", color: "black"},
    { make: "Ferari", color: "red"},
    { make: "Volvo", color: "blue"}
  ],

  selectedCars: [],

  persons: [
    Person.create({ name: "Lisa", gender: "Female" }),
    Person.create({ name: "Bob", gender: "Male" }),
    Person.create({ name: "John", gender: "Male"})
  ],

  selectedPersons: [],

  personsDisabled: false,

  actions: {
    selectAllPersons: function() {
      this.set("selectedPersons", this.get('persons').copy());
    },

    clearPersons: function() {
      this.set("selectedPersons", []);
    },

    toggleDisabled: function() {
      this.set("personsDisabled", !this.get("personsDisabled"));
    }
  }
});
