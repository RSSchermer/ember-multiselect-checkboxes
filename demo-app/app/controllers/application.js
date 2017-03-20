import Ember from 'ember';

var Person = Ember.Object.extend({
  name: null,

  gender: null
});

export default Ember.Controller.extend({
  fruits: ["apple", "banana", "orange"],

  selectedFruits: Ember.A(),

  cars: [
    { make: "BMW", color: "black"},
    { make: "Ferari", color: "red"},
    { make: "Volvo", color: "blue"}
  ],

  selectedCars: Ember.A(),

  persons: [
    Person.create({ name: "Lisa", gender: "Female" }),
    Person.create({ name: "Bob", gender: "Male" }),
    Person.create({ name: "John", gender: "Male"})
  ],

  selectedPersons: Ember.A(),

  phones: ['Apple', 'Samsung', 'Nokia'],

  selectedPhones: Ember.A(),

  actions: {
    selectAllPhones: function () {
      this.set('selectedPhones', this.get('phones').copy());
    },

    deselectAllPhones: function () {
      this.set('selectedPhones', []);
    }
  }
});
