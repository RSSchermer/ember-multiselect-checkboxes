import Ember from 'ember';

var Person = Ember.Object.extend({
  name: null,

  gender: null
});

export default Ember.Controller.extend({
  persons: Ember.A([
    Person.create({ name: "Lisa", gender: "Female" }),
    Person.create({ name: "Bob", gender: "Male" }),
    Person.create({ name: "John", gender: "Male"})
  ]),

  selectedPersons: Ember.A()
});
