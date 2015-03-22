import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';

var App;

moduleForComponent('multiselect-checkbox-option', 'MultiselectCheckboxOptionComponent', {
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('user the correct label property with a primitive value and no label property', function (assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'value': 'apple' });
  });

  assert.equal(this.$().find('label').text().trim(), 'apple');
});

var car = {
  id: 1,
  color: 'red'
};

test('user the correct label property with a plain js object', function (assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'value': car, 'labelProperty': 'color' });
  });

  assert.equal(this.$().find('label').text().trim(), 'red');
});

var person = Ember.Object.create({
    id: 1,
    name: 'test'
  });

test('uses the correct label property with an ember object', function(assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'value': person, 'labelProperty': 'name' });
  });

  assert.equal(this.$().find('label').text().trim(), 'test');
});

test('adds value to selection when selected', function(assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'value': person, 'labelProperty': 'name' });
  });

  assert.equal(component.get('isSelected'), false);
  assert.equal(component.get('selection.length'), 0);

  Ember.run(function(){
    component.set('isSelected', true);
  });

  assert.equal(component.get('selection.length'), 1);
  assert.equal(component.get('selection.firstObject'), person);
});

test('removes value from selection when deselected', function(assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'value': person, 'labelProperty': 'name', 'selection': [person] });
  });

  assert.equal(component.get('isSelected'), true);
  assert.equal(component.get('selection.length'), 1);

  Ember.run(function(){
    component.set('isSelected', false);
  });

  assert.equal(component.get('selection.length'), 0);
});

test('correctly updates isSelected when changing the selection', function(assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'value': person, 'labelProperty': 'name', 'selection': [] });
  });

  assert.equal(component.get('isSelected'), false);

  Ember.run(function(){
    component.set('selection', [person]);
  });

  assert.equal(component.get('isSelected'), true);

  Ember.run(function(){
    component.set('selection', []);
  });

  assert.equal(component.get('isSelected'), false);
});
