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

  phones: ['apple', 'samsung', 'nokia'],

  selectedPhones: [],

  controls: ['Select All', 'Unselect All'],

  selectedControls: [],

  actions: {
    updateSelection: function (newSelection, value, operation) {
      this.set('selection', newSelection);
      if (value === 'Select All') {
        this.set('selectedPhones', this.get('phones').copy());
      }else if (value === 'Unselect All') {
        this.set('selectedPhones', []);
      }
    }
  }
});
