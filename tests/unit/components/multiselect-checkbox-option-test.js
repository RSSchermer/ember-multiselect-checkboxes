import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';

var App;

moduleForComponent('multiselect-checkbox-option', 'MultiselectCheckboxOptionComponent', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('user the correct label property with a primitive value and no label property', function () {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'value': 'apple' });
  });

  equal(this.$().find('label').text().trim(), 'apple');
});

var car = {
  id: 1,
  color: 'red'
};

test('user the correct label property with a plain js object', function () {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'value': car, 'labelProperty': 'color' });
  });

  equal(this.$().find('label').text().trim(), 'red');
});

var person = Ember.Object.create({
    id: 1,
    name: 'test'
  });

test('uses the correct label property with an ember object', function() {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'value': person, 'labelProperty': 'name' });
  });

  equal(this.$().find('label').text().trim(), 'test');
});

test('adds value to selection when selected', function() {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'value': person, 'labelProperty': 'name' });
  });

  equal(component.get('isSelected'), false);
  equal(component.get('selection.length'), 0);

  Ember.run(function(){
    component.set('isSelected', true);
  });

  equal(component.get('selection.length'), 1);
  equal(component.get('selection.firstObject'), person);
});

test('removes value from selection when deselected', function() {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'value': person, 'labelProperty': 'name', 'selection': [person] });
  });

  equal(component.get('isSelected'), true);
  equal(component.get('selection.length'), 1);

  Ember.run(function(){
    component.set('isSelected', false);
  });

  equal(component.get('selection.length'), 0);
});

test('correctly updates isSelected when changing the selection', function() {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'value': person, 'labelProperty': 'name', 'selection': [] });
  });

  equal(component.get('isSelected'), false);

  Ember.run(function(){
    component.set('selection', [person]);
  });

  equal(component.get('isSelected'), true);

  Ember.run(function(){
    component.set('selection', []);
  });

  equal(component.get('isSelected'), false);
});
