import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import Ember from 'ember';

let App;

module('Block params integration tests', {
  beforeEach() {
    App = startApp();
  },

  afterEach() {
    Ember.run(App, 'destroy');
  }
});

test('it displays the correct custom labels for each person', function (assert) {
  visit('/block-params-test');

  andThen(() => {
    let labels = Ember.$('#person_checkboxes').find('label');

    assert.equal($(labels[0]).text().trim(), '--Lisa--');
    assert.equal($(labels[1]).text().trim(), '--Bob--');
    assert.equal($(labels[2]).text().trim(), '--John--');
  });
});

test('adds the value a checkbox represents to the selection when that checkbox is checked', function (assert) {
  visit('/block-params-test');

  click('#person_checkboxes input[type="checkbox"]:eq(1)');

  andThen(() => {
    let selectedPersonsListText = $('#selected_persons_list').text();

    assert.equal(selectedPersonsListText.indexOf('Bob') >= 0, true);
    assert.equal(selectedPersonsListText.indexOf('Lisa') >= 0, false);
    assert.equal(selectedPersonsListText.indexOf('John') >= 0, false);
  });
});
