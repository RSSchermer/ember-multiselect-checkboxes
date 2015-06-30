import Ember from 'ember';

export default Ember.Controller.extend({
  cars: Ember.A([
    { make: "BMW", color: "black"},
    { make: "Ferari", color: "red"},
    { make: "Volvo", color: "blue"}
  ]),

  selectedCars: Ember.A()
});
