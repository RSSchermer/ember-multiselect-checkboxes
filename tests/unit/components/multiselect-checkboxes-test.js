import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';

var App;

moduleForComponent('multiselect-checkboxes', 'MultiselectCheckboxesComponent', {
  beforeEach: function () {
    App = startApp();
  },

  afterEach: function () {
    Ember.run(App, 'destroy');
  }
});

var fruits = ['apple', 'orange', 'strawberry'];

var cars = [
  { make: "BMW", color: "black"},
  { make: "Ferari", color: "red"},
  { make: "Volvo", color: "blue"}
];

var Person = Ember.Object.extend({
  name: null,

  gender: null
});

var persons = [
  Person.create({ name: "Lisa", gender: "Female" }),
  Person.create({ name: "Bob", gender: "Male" }),
  Person.create({ name: "John", gender: "Male"})
];

test('uses the correct labels with primitive values and no label property', function (assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'options': fruits, 'selection': [] });
  });

  var $component = this.render();

  var labels = $component.find('label');

  assert.equal($(labels[0]).text().trim(), 'apple');
  assert.equal($(labels[1]).text().trim(), 'orange');
  assert.equal($(labels[2]).text().trim(), 'strawberry');
});

test('uses the correct labels with plain js values and a label property', function (assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'options': cars, 'selection': [], 'labelProperty': 'make' });
  });

  var $component = this.render();

  var labels = $component.find('label');

  assert.equal($(labels[0]).text().trim(), 'BMW');
  assert.equal($(labels[1]).text().trim(), 'Ferari');
  assert.equal($(labels[2]).text().trim(), 'Volvo');
});

test('uses the correct labels with Ember object values and a label property', function (assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'options': persons, 'selection': [], 'labelProperty': 'name' });
  });

  var $component = this.render();

  var labels = $component.find('label');

  assert.equal($(labels[0]).text().trim(), 'Lisa');
  assert.equal($(labels[1]).text().trim(), 'Bob');
  assert.equal($(labels[2]).text().trim(), 'John');
});

test('checks the checkboxes that represent a value currently in the selection', function (assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'options': persons, 'selection': [persons[0], persons[2]], 'labelProperty': 'name' });
  });

  var $component = this.render();

  var labels = $component.find('label');

  assert.equal($(labels[0]).find('input[type="checkbox"]').prop('checked'), true);
  assert.equal($(labels[1]).find('input[type="checkbox"]').prop('checked'), false);
  assert.equal($(labels[2]).find('input[type="checkbox"]').prop('checked'), true);
});

test('adds the value a checkbox represents to the selection when that checkbox is checked', function (assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'options': persons, 'selection': [persons[0]], 'labelProperty': 'name' });
  });

  var $component = this.render();

  var labels = $component.find('label');

  $(labels[2]).find('input[type="checkbox"]').click();

  assert.equal(component.get('selection.length'), 2);
  assert.equal(component.get('selection').contains(persons[2]), true);
});

test('removes the value a checkbox represents from the selection when that checkbox is unchecked', function (assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'options': persons, 'selection': [persons[0]], 'labelProperty': 'name' });
  });

  var $component = this.render();

  var labels = $component.find('label');

  $(labels[0]).find('input[type="checkbox"]').click();

  assert.equal(component.get('selection.length'), 0);
  assert.equal(component.get('selection').contains(persons[0]), false);
});

test('checks the correct options with plain js values and a value property', function (assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'options': cars, 'selection': ['red'], 'labelProperty': 'make', 'valueProperty': 'color' });
  });

  var $component = this.render();

  var labels = $component.find('label');

  assert.equal($(labels[0]).find('input[type="checkbox"]').prop('checked'), false);
  assert.equal($(labels[1]).find('input[type="checkbox"]').prop('checked'), true);
  assert.equal($(labels[2]).find('input[type="checkbox"]').prop('checked'), false);
});

test('updates the selection correctly with plain js values and a value property', function (assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'options': cars, 'selection': ['red'], 'labelProperty': 'make', 'valueProperty': 'color' });
  });

  var $component = this.render();

  var labels = $component.find('label');

  $(labels[0]).find('input[type="checkbox"]').click();

  assert.equal(component.get('selection.length'), 2);
  assert.equal(component.get('selection').contains('black'), true);
  assert.equal(component.get('selection').contains('red'), true);
});

test('checks the correct options with Ember object values and a value property', function (assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'options': persons, 'selection': ['Bob'], 'labelProperty': 'name', 'valueProperty': 'name' });
  });

  var $component = this.render();

  var labels = $component.find('label');

  assert.equal($(labels[0]).find('input[type="checkbox"]').prop('checked'), false);
  assert.equal($(labels[1]).find('input[type="checkbox"]').prop('checked'), true);
  assert.equal($(labels[2]).find('input[type="checkbox"]').prop('checked'), false);
});

test('updates the selection correctly with Ember object values and a value property', function (assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'options': persons, 'selection': ['Bob'], 'labelProperty': 'name', 'valueProperty': 'name' });
  });

  var $component = this.render();

  var labels = $component.find('label');

  $(labels[0]).find('input[type="checkbox"]').click();

  assert.equal(component.get('selection.length'), 2);
  assert.equal(component.get('selection').contains('Lisa'), true);
  assert.equal(component.get('selection').contains('Bob'), true);
});

test('disables all checkboxes when disabled is set to true', function (assert) {
  var component = this.subject();

  Ember.run(function(){
    component.setProperties({ 'options': persons, 'selection': [persons[0]], 'labelProperty': 'name', 'disabled': true });
  });

  var $component = this.render();

  $component.find('input[type="checkbox"]').each(function (index, checkbox) {
    assert.equal($(checkbox).prop('disabled'), true);
  });

  $component.find('input[type="checkbox"]').each(function (index, checkbox) {
    $(checkbox).click();
  });

  assert.equal(component.get('selection.length'), 1);
  assert.equal(component.get('selection').contains(persons[0]), true);
});
