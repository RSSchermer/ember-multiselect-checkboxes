import Ember from 'ember';
import delay from 'ember-delay/delay';

var Person = Ember.Object.extend({
  name: null,

  gender: null
});

export default Ember.Controller.extend({
  persons: [
    Person.create({
      name: delay(5000).then(() => 'Lisa'),
      gender: "Female"
    }),
    Person.create({
      name: delay(5000).then(() => 'Bob'),
      gender: "Male"
    }),
    Person.create({
      name: delay(5000).then(() => 'John'),
      gender: "Male"
    })
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
