# Ember-multiselect-checkboxes [![](https://travis-ci.org/RSSchermer/ember-multiselect-checkboxes.svg?branch=master)](https://travis-ci.org/RSSchermer/ember-multiselect-checkboxes)

Simple Ember component for allowing multiple selection from a certain collection (a `hasMany` property for example)
using checkboxes.

## Demo
Demo available [here](https://rsschermer.github.io/ember-multiselect-checkboxes/).

## Installation

`ember install ember-multiselect-checkboxes`

## Usage

Example:

``` handlebars
{{multiselect-checkboxes options=users labelProperty='name' selection=selectedUsers}}
```

This component can be used with an array of primitives as the options, an array of plain javascript objects as the
options, or an array of Ember objects as the options. The following attributes should always be set:

* `options`: a collection of Ember objects that can be selected.
* `selection`: the subset of the options that is currently selected. The selection will automatically be updated when
  the user checks or unchecks options through Ember's two-way bindings.

When using this component with an array of javascript objects or an array of Ember objects you should also set the
`labelProperty` attribute:

* `labelProperty`: the property on the plain javascript object or the Ember object that will be used as a label for the
  checkbox.  By default this property will render as plain text.  If translation is desired, set `translate` to true.

```handlebars
{{multiselect-checkboxes
    options=users
    labelProperty='name'
    selection=selectedUsers
    translate=true}}}
```

When using this component with an array of javascript objects or an array of Ember objects you may optionally specify
the `valueProperty` attribute:

* `valueProperty`: the property on the plain javascript object or the Ember object that will be used to represent this
  object in the selection. Example: when using an array of car objects as the options, if you set the `valueProperty`
  as their "color" property, the selection will be an array of color strings (not an array of cars).

[This controller for the demo application](https://github.com/RSSchermer/ember-multiselect-checkboxes/blob/gh-pages/demo-app/app/controllers/application.js)
provides an example of what your controller code could look like for each type of options collection.

An action can be bound to the `onchange` attribute:

```handlebars
{{multiselect-checkboxes
    options=users
    labelProperty='name'
    selection=selectedUsers
    onchange=(action 'updateSelection')}}
```

When a checkbox is checked or unchecked, this action will be triggered. The action handler will receive the following
parameters:

* `newSelection`: the subset of the options that is currently selected.
* `value`: the corresponding value of the checkbox that was checked or unchecked.
* `operation`: a string describing the operation performed on the selection. There are two possible values: 'added' when
  the value was added to the selection and 'removed' when the value was removed from the selection.

```js
actions: {
  updateSelection: function (newSelection, value, operation) {
    ...
  }
}
```

By default, the component will update the value bound to the `selection` attribute automatically. If you prefer to
update the value bound to the `selection` attribute yourself, this can be disabled by setting the `updateSelectionValue`
attribute to `false`:

```handlebars
{{multiselect-checkboxes
    options=users
    labelProperty='name'
    selection=selectedUsers
    onchange=(action 'updateSelection')
    updateSelectionValue=false}}
```

You should then update the value bound to the `selection` property in the action bound to `onchange`, e.g.:

```js
actions: {
  updateSelection: function (newSelection, value, operation) {
    this.set('selection', newSelection);

    ...
  }
}
```

Note that for long option lists, allowing the component to automatically update the value bound to the `selection`
attribute may result in significantly better performance.

It's also possible to pass a custom template block should you want to customize the option list in some way (requires
Ember 1.13 or newer). This template block will receive 3 block parameters: the option itself, a boolean value indicating
whether or not the option is selected, and the option's index:

```handlebars
{{#multiselect-checkboxes options=users selection=selectedUsers as |user isSelected index|}}
  <!-- Your custom option template here -->
{{/multiselect-checkboxes}}
```

The initial example without a custom template block is essentially equivalent to the following example with a custom
template block:

```handlebars
{{#multiselect-checkboxes options=users selection=selectedUsers as |user isSelected|}}
  <li>
    <label>
      {{input type="checkbox" checked=isSelected}}
      {{user.name}}
    </label>
  </li>
{{/multiselect-checkboxes}}
```

Note that the `labelProperty` attribute is superfluous when using a custom template block; instead, `{{user.name}}` is
used directly in the template block.

By default the `multiselect-checkboxes` tag will render as an `ul` element. This can be customized by specifying the
`tagName` attribute:

```handlebars
{{#multiselect-checkboxes tagName='div' ...}}
  ...
{{/multiselect-checkboxes}}
```
