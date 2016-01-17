import Ember from 'ember';

let options = [];

for (let i = 0; i < 1000; i++) {
  options.push(i);
}

export default Ember.Controller.extend({
  options: Ember.A(options),

  selectedOptions: Ember.A()
});
