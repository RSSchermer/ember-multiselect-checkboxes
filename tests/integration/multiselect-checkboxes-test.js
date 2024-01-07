import { click, fillIn, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { has } from 'require';
import { A } from '@ember/array';
import Object from '@ember/object';
import { run } from '@ember/runloop';
import $ from 'jquery';

module('Integration | Component | Multiselect-checkboxes', function(hooks) {
  setupRenderingTest(hooks);

  let fruits = A(['apple', 'orange', 'strawberry']);

  let cars = A([
    { make: "BMW", color: "black"},
    { make: "Ferari", color: "red"},
    { make: "Volvo", color: "blue"}
  ]);

  let Person = Object.extend({
    name: null,

    gender: null
  });

  let persons = A([
    Person.create({ name: "Lisa", gender: "Female" }),
    Person.create({ name: "Bob", gender: "Male" }),
    Person.create({ name: "John", gender: "Male"})
  ]);

  test('uses the correct labels with primitive values and no label property', async function (assert) {
    this.set('options', fruits);

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}}/>
    `);

    let labels = this.element.querySelectorAll('label');

    assert.equal($(labels[0]).text().trim(), 'apple');
    assert.equal($(labels[1]).text().trim(), 'orange');
    assert.equal($(labels[2]).text().trim(), 'strawberry');
  });

  test('uses the correct labels with plain js values and a label property', async function (assert) {
    this.set('options', cars);

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='make'/>
    `);

    let labels = this.element.querySelectorAll('label');

    assert.equal($(labels[0]).text().trim(), 'BMW');
    assert.equal($(labels[1]).text().trim(), 'Ferari');
    assert.equal($(labels[2]).text().trim(), 'Volvo');
  });

  if(has('ember-i18n')) {
    test('labels are translated when translate is true and i18n addon is present', async function (assert) {
      this.set('options', persons);

      await render(hbs`
        <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @translate={{true}}/>
      `);

      let labels = this.element.querySelectorAll('label');

      assert.equal($(labels[0]).text().trim(), 'Luisa');
      assert.equal($(labels[1]).text().trim(), 'Roberto');
      assert.equal($(labels[2]).text().trim(), 'Juan');
    });

    test('labels are translated correctly when translate is true and i18n addon is present after switching locale', async function (assert) {
      this.set('options', persons);

      await render(hbs`
        <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @translate={{true}}/>
      `);

      run(() => this.owner.lookup('service:i18n').set('locale', 'fr'));

      let labels = this.element.querySelectorAll('label');

      assert.equal($(labels[0]).text().trim(), 'Louise');
      assert.equal($(labels[1]).text().trim(), 'Robert');
      assert.equal($(labels[2]).text().trim(), 'Jean');
    });
  }

  test('labels are not translated when translate is true and i18n addon is not present', async function (assert) {
    this.set('options', persons);

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @translate={{true}} @i18n={{null}}/>
    `);

    let labels = this.element.querySelectorAll('label');

    assert.equal($(labels[0]).text().trim(), 'Lisa');
    assert.equal($(labels[1]).text().trim(), 'Bob');
    assert.equal($(labels[2]).text().trim(), 'John');
  });

  test('uses the correct labels with Ember object values and a label property', async function (assert) {
    this.set('options', persons);

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='name'/>
    `);

    let labels = this.element.querySelectorAll('label');

    assert.equal($(labels[0]).text().trim(), 'Lisa');
    assert.equal($(labels[1]).text().trim(), 'Bob');
    assert.equal($(labels[2]).text().trim(), 'John');
  });

  test('checks the checkboxes that represent a value currently in the selection', async function (assert) {
    this.setProperties({
      'options': persons,
      'selection': A([persons[0], persons[2]])
    });

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @selection={{this.selection}}/>
    `);

    let checkboxes = this.element.querySelectorAll('input[type="checkbox"]');

    assert.equal($(checkboxes[0]).prop('checked'), true);
    assert.equal($(checkboxes[1]).prop('checked'), false);
    assert.equal($(checkboxes[2]).prop('checked'), true);
  });

  test('adds the value a checkbox represents to the selection when that checkbox is checked', async function (assert) {
    this.setProperties({
      'options': persons,
      'selection': A([persons[0]])
    });

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @selection={{this.selection}}/>
    `);

    let checkboxes = this.element.querySelectorAll('input[type="checkbox"]');

    assert.equal($(checkboxes[2]).prop('checked'), false);

    $(checkboxes[2]).click();

    assert.equal($(checkboxes[2]).prop('checked'), true);
    assert.equal(this.get('selection.length'), 2);
    assert.equal(this.get('selection').includes(persons[2]), true);
  });

  test('removes the value a checkbox represents from the selection when that checkbox is unchecked', async function (assert) {
    this.setProperties({
      'options': persons,
      'selection': A([persons[0]])
    });

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @selection={{this.selection}}/>
    `);

    let checkboxes = this.element.querySelectorAll('input[type="checkbox"]');

    assert.equal($(checkboxes[0]).prop('checked'), true);

    $(checkboxes[0]).click();

    assert.equal($(checkboxes[0]).prop('checked'), false);
    assert.equal(this.get('selection.length'), 0);
    assert.equal(this.get('selection').includes(persons[0]), false);
  });

  test('triggers the onchange action with the correct arguments when the selection changes', async function (assert) {
    this.setProperties({
      'options': persons,
      'selection': A(),
      'actions': {
        updateSelection: (newSelection, value, operation) => {
          assert.equal(newSelection.length, 1);
          assert.equal(newSelection.includes(persons[1]), true);
          assert.equal(value, persons[1]);
          assert.equal(operation, 'added');
        }
      }
    });

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @selection={{this.selection}} @onchange={{action 'updateSelection'}}/>
    `);

    let checkboxes = this.element.querySelectorAll('input[type="checkbox"]');

    $(checkboxes[1]).click();
  });

  test('does not update the bound selection value when updateSelectionValue is set to false', async function (assert) {
    this.setProperties({
      'options': persons,
      'selection': A([persons[0]])
    });

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @selection={{this.selection}} @updateSelectionValue={{false}}/>
    `);

    let checkboxes = this.element.querySelectorAll('input[type="checkbox"]');

    $(checkboxes[1]).click();

    assert.equal(this.get('selection.length'), 1);
    assert.equal(this.get('selection').includes(persons[0]), true);
    assert.equal(this.get('selection').includes(persons[1]), false);
  });

  test('checks the correct options with plain js values and a value property', async function (assert) {
    this.setProperties({
      'options': cars,
      'selection': A(['red'])
    });

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @valueProperty='color' @selection={{this.selection}}/>
    `);

    let checkboxes = this.element.querySelectorAll('input[type="checkbox"]');

    assert.equal($(checkboxes[0]).prop('checked'), false);
    assert.equal($(checkboxes[1]).prop('checked'), true);
    assert.equal($(checkboxes[2]).prop('checked'), false);
  });

  test('updates the selection correctly with plain js values and a value property', async function (assert) {
    this.setProperties({
      'options': cars,
      'selection': A(['red'])
    });

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @valueProperty='color' @selection={{this.selection}}/>
    `);

    let checkboxes = this.element.querySelectorAll('input[type="checkbox"]');

    assert.equal($(checkboxes[0]).prop('checked'), false);

    $(checkboxes[0]).click();

    assert.equal($(checkboxes[0]).prop('checked'), true);
    assert.equal(this.get('selection.length'), 2);
    assert.equal(this.get('selection').includes('black'), true);
    assert.equal(this.get('selection').includes('red'), true);
  });

  test('checks the correct options with Ember object values and a value property', async function (assert) {
    this.setProperties({
      'options': persons,
      'selection': A(['Bob'])
    });

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @valueProperty='name' @selection={{this.selection}}/>
    `);

    let checkboxes = this.element.querySelectorAll('input[type="checkbox"]');

    assert.equal($(checkboxes[0]).prop('checked'), false);
    assert.equal($(checkboxes[1]).prop('checked'), true);
    assert.equal($(checkboxes[2]).prop('checked'), false);
  });

  test('updates the selection correctly with Ember object values and a value property', async function (assert) {
    this.setProperties({
      'options': persons,
      'selection': A(['Bob'])
    });

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @valueProperty='name' @selection={{this.selection}}/>
    `);

    let checkboxes = this.element.querySelectorAll('input[type="checkbox"]');

    assert.equal($(checkboxes[0]).prop('checked'), false);

    $(checkboxes[0]).click();

    assert.equal($(checkboxes[0]).prop('checked'), true);

    assert.equal(this.get('selection.length'), 2);
    assert.equal(this.get('selection').includes('Lisa'), true);
    assert.equal(this.get('selection').includes('Bob'), true);
  });

  test('disables all checkboxes when disabled is set to true', async function (assert) {
    this.setProperties({
      'options': persons,
      'selection': A([persons[0]])
    });

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @selection={{this.selection}} @disabled={{true}}/>
    `);

    let checkboxes = this.element.querySelectorAll('input[type="checkbox"]');

    $(checkboxes).each((index, checkbox) => {
      assert.equal($(checkbox).prop('disabled'), true);
    });

    $(checkboxes).each((index, checkbox) => {
      $(checkbox).click();
    });

    assert.equal(this.get('selection.length'), 1);
    assert.equal(this.get('selection').includes(persons[0]), true);
  });

  test('updates the displayed options when the bound options change', async function (assert) {
    this.set('options', fruits);

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}}/>
    `);

    let labels = this.element.querySelectorAll('label');

    assert.equal($(labels[0]).text().trim(), 'apple');
    assert.equal($(labels[1]).text().trim(), 'orange');
    assert.equal($(labels[2]).text().trim(), 'strawberry');

    run(() => fruits.reverseObjects());

    labels = this.element.querySelectorAll('label');

    assert.equal($(labels[0]).text().trim(), 'strawberry');
    assert.equal($(labels[1]).text().trim(), 'orange');
    assert.equal($(labels[2]).text().trim(), 'apple');
  });

  test('updates checkboxes when the bound selection changes', async function (assert) {
    let selection = A([persons[0], persons[2]]);

    this.setProperties({
      'options': persons,
      'selection': selection
    });

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @labelProperty='name' @selection={{this.selection}}/>
    `);

    let checkboxes = this.element.querySelectorAll('input[type="checkbox"]');

    assert.equal($(checkboxes[0]).prop('checked'), true);
    assert.equal($(checkboxes[1]).prop('checked'), false);
    assert.equal($(checkboxes[2]).prop('checked'), true);

    run(() => selection.removeObject(persons[0]));

    checkboxes = this.element.querySelectorAll('input[type="checkbox"]');

    assert.equal($(checkboxes[0]).prop('checked'), false);
    assert.equal($(checkboxes[1]).prop('checked'), false);
    assert.equal($(checkboxes[2]).prop('checked'), true);
  });

  test('with a template block displays the correct custom labels for each person', async function (assert) {
    this.set('options', persons);

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} as |person isSelected|>
        <li>
          <label>
            <Input @type="checkbox" @checked={{isSelected}}/>
            --{{person.name}}--
          </label>
        </li>
      </Multiselect-checkboxes>
    `);

    let labels = this.element.querySelectorAll('label');

    assert.equal($(labels[0]).text().trim(), '--Lisa--');
    assert.equal($(labels[1]).text().trim(), '--Bob--');
    assert.equal($(labels[2]).text().trim(), '--John--');
  });

  test('with a template block adds the value a checkbox represents to the selection when that checkbox is checked', async function (assert) {
    this.setProperties({
      'options': persons,
      'selection': A()
    });

    await render(hbs`
      <Multiselect-checkboxes @options={{this.options}} @selection={{this.selection}} as |person isSelected|>
        <li>
          <label>
            <Input @type="checkbox" @checked={{isSelected}}/>
            --{{person.name}}--
          </label>
        </li>
      </Multiselect-checkboxes>
    `);

    let checkboxes = this.element.querySelectorAll('input[type="checkbox"]');

    assert.equal($(checkboxes[2]).prop('checked'), false);

    $(checkboxes[2]).click();

    assert.equal($(checkboxes[2]).prop('checked'), true);
    assert.equal(this.get('selection.length'), 1);
    assert.equal(this.get('selection').includes(persons[2]), true);
  });
});
