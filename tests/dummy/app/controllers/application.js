import Ember from 'ember';

var Person = Ember.Object.extend({
  name: null,

  gender: null
});

export default Ember.Controller.extend({
  fruits: Ember.A(["apple", "banana", "orange"]),

  selectedFruits: Ember.A(),

  cars: Ember.A([
    { make: "BMW", color: "black"},
    { make: "Ferari", color: "red"},
    { make: "Volvo", color: "blue"}
  ]),

  selectedCars: Ember.A(),

  persons: Ember.A([
    Person.create({ name: "Lisa", gender: "Female" }),
    Person.create({ name: "Bob", gender: "Male" }),
    Person.create({ name: "John", gender: "Male"})
  ]),

  selectedPersons: Ember.A(),

  personsDisabled: false,

  actions: {
    selectAllPersons: function() {
      this.set("selectedPersons", Ember.A(this.get('persons').copy()));
    },

    clearPersons: function() {
      this.set("selectedPersons", Ember.A());
    },

    toggleDisabled: function() {
      this.toggleProperty("personsDisabled");
    }
  }
});
