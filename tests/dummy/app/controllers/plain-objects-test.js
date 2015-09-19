import Ember from 'ember';

export default Ember.Controller.extend({
  cars: [
    { make: "BMW", color: "black"},
    { make: "Ferari", color: "red"},
    { make: "Volvo", color: "blue"}
  ],

  selectedCars: []
});
