import Ember from 'ember';

export default Ember.Controller.extend({
  fruits: Ember.A(["apple", "banana", "orange"]),

  selectedFruits: Ember.A()
});
