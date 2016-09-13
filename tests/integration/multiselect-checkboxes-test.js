import hbs from 'htmlbars-inline-precompile';
import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('multiselect-checkboxes', 'Multiselect checkboxes component', {
  integration: true
});

let fruits = Ember.A(['apple', 'orange', 'strawberry']);

let cars = Ember.A([
  { make: "BMW", color: "black"},
  { make: "Ferari", color: "red"},
  { make: "Volvo", color: "blue"}
]);

let Person = Ember.Object.extend({
  name: null,

  gender: null
});

let persons = Ember.A([
  Person.create({ name: "Lisa", gender: "Female" }),
  Person.create({ name: "Bob", gender: "Male" }),
  Person.create({ name: "John", gender: "Male"})
]);

test('uses the correct labels with primitive values and no label property', function (assert) {
  this.set('options', fruits);

  this.render(hbs`
    {{multiselect-checkboxes options=options}}
  `);

  let labels = this.$('label');

  assert.equal($(labels[0]).text().trim(), 'apple');
  assert.equal($(labels[1]).text().trim(), 'orange');
  assert.equal($(labels[2]).text().trim(), 'strawberry');
});

test('uses the correct labels with plain js values and a label property', function (assert) {
  this.set('options', cars);

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='make'}}
  `);

  let labels = this.$('label');

  assert.equal($(labels[0]).text().trim(), 'BMW');
  assert.equal($(labels[1]).text().trim(), 'Ferari');
  assert.equal($(labels[2]).text().trim(), 'Volvo');
});

test('labels are translated when translate is true and i18n addon is present', function (assert) {
  this.set('options', persons);

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name' translate=true}}
  `);

  let labels = this.$('label');

  assert.equal($(labels[0]).text().trim(), 'Luisa');
  assert.equal($(labels[1]).text().trim(), 'Roberto');
  assert.equal($(labels[2]).text().trim(), 'Juan');
});

test('labels are not translated when translate is true and i18n addon is not present', function (assert) {
  this.set('options', persons);

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name' translate=true i18n=null}}
  `);

  let labels = this.$('label');

  assert.equal($(labels[0]).text().trim(), 'Lisa');
  assert.equal($(labels[1]).text().trim(), 'Bob');
  assert.equal($(labels[2]).text().trim(), 'John');
});

test('uses the correct labels with Ember object values and a label property', function (assert) {
  this.set('options', persons);

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name'}}
  `);

  let labels = this.$('label');

  assert.equal($(labels[0]).text().trim(), 'Lisa');
  assert.equal($(labels[1]).text().trim(), 'Bob');
  assert.equal($(labels[2]).text().trim(), 'John');
});

test('checks the checkboxes that represent a value currently in the selection', function (assert) {
  this.setProperties({
    'options': persons,
    'selection': Ember.A([persons[0], persons[2]])
  });

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name' selection=selection}}
  `);

  let checkboxes = this.$('input[type="checkbox"]');

  assert.equal($(checkboxes[0]).prop('checked'), true);
  assert.equal($(checkboxes[1]).prop('checked'), false);
  assert.equal($(checkboxes[2]).prop('checked'), true);
});

test('adds the value a checkbox represents to the selection when that checkbox is checked', function (assert) {
  this.setProperties({
    'options': persons,
    'selection': Ember.A([persons[0]])
  });

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name' selection=selection}}
  `);

  let checkboxes = this.$('input[type="checkbox"]');

  assert.equal($(checkboxes[2]).prop('checked'), false);

  $(checkboxes[2]).click();

  assert.equal($(checkboxes[2]).prop('checked'), true);
  assert.equal(this.get('selection.length'), 2);
  assert.equal(this.get('selection').includes(persons[2]), true);
});

test('removes the value a checkbox represents from the selection when that checkbox is unchecked', function (assert) {
  this.setProperties({
    'options': persons,
    'selection': Ember.A([persons[0]])
  });

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name' selection=selection}}
  `);

  let checkboxes = this.$('input[type="checkbox"]');

  assert.equal($(checkboxes[0]).prop('checked'), true);

  $(checkboxes[0]).click();

  assert.equal($(checkboxes[0]).prop('checked'), false);
  assert.equal(this.get('selection.length'), 0);
  assert.equal(this.get('selection').includes(persons[0]), false);
});

test('triggers the onchange action with the correct arguments when the selection changes', function (assert) {
  this.setProperties({
    'options': persons,
    'selection': Ember.A(),
    'actions': {
      updateSelection: (newSelection, value, operation) => {
        assert.equal(newSelection.length, 1);
        assert.equal(newSelection.includes(persons[1]), true);
        assert.equal(value, persons[1]);
        assert.equal(operation, 'added');
      }
    }
  });

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name' selection=selection onchange=(action 'updateSelection')}}
  `);

  let checkboxes = this.$('input[type="checkbox"]');

  $(checkboxes[1]).click();
});

test('does not update the bound selection value when updateSelectionValue is set to false', function (assert) {
  this.setProperties({
    'options': persons,
    'selection': Ember.A([persons[0]])
  });

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name' selection=selection updateSelectionValue=false}}
  `);

  let checkboxes = this.$('input[type="checkbox"]');

  $(checkboxes[1]).click();

  assert.equal(this.get('selection.length'), 1);
  assert.equal(this.get('selection').includes(persons[0]), true);
  assert.equal(this.get('selection').includes(persons[1]), false);
});

test('checks the correct options with plain js values and a value property', function (assert) {
  this.setProperties({
    'options': cars,
    'selection': Ember.A(['red'])
  });

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name' valueProperty='color' selection=selection}}
  `);

  let checkboxes = this.$('input[type="checkbox"]');

  assert.equal($(checkboxes[0]).prop('checked'), false);
  assert.equal($(checkboxes[1]).prop('checked'), true);
  assert.equal($(checkboxes[2]).prop('checked'), false);
});

test('updates the selection correctly with plain js values and a value property', function (assert) {
  this.setProperties({
    'options': cars,
    'selection': Ember.A(['red'])
  });

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name' valueProperty='color' selection=selection}}
  `);

  let checkboxes = this.$('input[type="checkbox"]');

  assert.equal($(checkboxes[0]).prop('checked'), false);

  $(checkboxes[0]).click();

  assert.equal($(checkboxes[0]).prop('checked'), true);
  assert.equal(this.get('selection.length'), 2);
  assert.equal(this.get('selection').includes('black'), true);
  assert.equal(this.get('selection').includes('red'), true);
});

test('checks the correct options with Ember object values and a value property', function (assert) {
  this.setProperties({
    'options': persons,
    'selection': Ember.A(['Bob'])
  });

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name' valueProperty='name' selection=selection}}
  `);

  let checkboxes = this.$('input[type="checkbox"]');

  assert.equal($(checkboxes[0]).prop('checked'), false);
  assert.equal($(checkboxes[1]).prop('checked'), true);
  assert.equal($(checkboxes[2]).prop('checked'), false);
});

test('updates the selection correctly with Ember object values and a value property', function (assert) {
  this.setProperties({
    'options': persons,
    'selection': Ember.A(['Bob'])
  });

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name' valueProperty='name' selection=selection}}
  `);

  let checkboxes = this.$('input[type="checkbox"]');

  assert.equal($(checkboxes[0]).prop('checked'), false);

  $(checkboxes[0]).click();

  assert.equal($(checkboxes[0]).prop('checked'), true);

  assert.equal(this.get('selection.length'), 2);
  assert.equal(this.get('selection').includes('Lisa'), true);
  assert.equal(this.get('selection').includes('Bob'), true);
});

test('disables all checkboxes when disabled is set to true', function (assert) {
  this.setProperties({
    'options': persons,
    'selection': Ember.A([persons[0]])
  });

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name' selection=selection disabled=true}}
  `);

  let checkboxes = this.$('input[type="checkbox"]');

  checkboxes.each((index, checkbox) => {
    assert.equal($(checkbox).prop('disabled'), true);
  });

  checkboxes.each((index, checkbox) => {
    $(checkbox).click();
  });

  assert.equal(this.get('selection.length'), 1);
  assert.equal(this.get('selection').includes(persons[0]), true);
});

test('updates the displayed options when the bound options change', function (assert) {
  this.set('options', fruits);

  this.render(hbs`
    {{multiselect-checkboxes options=options}}
  `);

  let labels = this.$('label');

  assert.equal($(labels[0]).text().trim(), 'apple');
  assert.equal($(labels[1]).text().trim(), 'orange');
  assert.equal($(labels[2]).text().trim(), 'strawberry');

  Ember.run(() => fruits.reverseObjects());

  labels = this.$('label');

  assert.equal($(labels[0]).text().trim(), 'strawberry');
  assert.equal($(labels[1]).text().trim(), 'orange');
  assert.equal($(labels[2]).text().trim(), 'apple');
});

test('updates checkboxes when the bound selection changes', function (assert) {
  let selection = Ember.A([persons[0], persons[2]]);

  this.setProperties({
    'options': persons,
    'selection': selection
  });

  this.render(hbs`
    {{multiselect-checkboxes options=options labelProperty='name' selection=selection}}
  `);

  let checkboxes = this.$('input[type="checkbox"]');

  assert.equal($(checkboxes[0]).prop('checked'), true);
  assert.equal($(checkboxes[1]).prop('checked'), false);
  assert.equal($(checkboxes[2]).prop('checked'), true);

  Ember.run(() => selection.removeObject(persons[0]));

  checkboxes = this.$('input[type="checkbox"]');

  assert.equal($(checkboxes[0]).prop('checked'), false);
  assert.equal($(checkboxes[1]).prop('checked'), false);
  assert.equal($(checkboxes[2]).prop('checked'), true);
});

test('with a template block displays the correct custom labels for each person', function (assert) {
  this.set('options', persons);

  this.render(hbs`
    {{#multiselect-checkboxes options=options as |person isSelected|}}
      <li>
        <label>
          {{input type="checkbox" checked=isSelected}}
          --{{person.name}}--
        </label>
      </li>
    {{/multiselect-checkboxes}}
  `);

  let labels = this.$('label');

  assert.equal($(labels[0]).text().trim(), '--Lisa--');
  assert.equal($(labels[1]).text().trim(), '--Bob--');
  assert.equal($(labels[2]).text().trim(), '--John--');
});

test('with a template block adds the value a checkbox represents to the selection when that checkbox is checked', function (assert) {
  this.setProperties({
    'options': persons,
    'selection': Ember.A()
  });

  this.render(hbs`
    {{#multiselect-checkboxes options=options selection=selection as |person isSelected|}}
      <li>
        <label>
          {{input type="checkbox" checked=isSelected}}
          --{{person.name}}--
        </label>
      </li>
    {{/multiselect-checkboxes}}
  `);

  let checkboxes = this.$('input[type="checkbox"]');

  assert.equal($(checkboxes[2]).prop('checked'), false);

  $(checkboxes[2]).click();

  assert.equal($(checkboxes[2]).prop('checked'), true);
  assert.equal(this.get('selection.length'), 1);
  assert.equal(this.get('selection').includes(persons[2]), true);
});
