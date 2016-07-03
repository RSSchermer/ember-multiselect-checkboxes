# Ember-multiselect-checkboxes change log

## 0.10.0

A custom template block new receives the index of an option as a third parameter:

```handlebars
{{#multiselect-checkboxes options=users selection=selectedUsers as |user isSelected index|}}
  ...
{{/multiselect-checkboxes}}
```

## 0.9.0

Action handlers bound to the `onchange` attribute now receive additional parameters. Previously only the updated
selection was passed to the handler. It now receives 3 parameters:

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

## 0.8.0

Added `translate` attribute. If `translate` is set to true and the [Ember-i18n addon](https://www.npmjs.com/package/ember-i18n)
is installed, then the labels will be used as keys for translation lookup and the translations are displayed instead.

```handlebars
{{multiselect-checkboxes
    options=users
    labelProperty='name'
    selection=selectedUsers
    translate=true}}}
```

## 0.7.0

Added `onchange` attribute. An action can be bound to the `onchange` attribute:

```handlebars
{{multiselect-checkboxes
    options=users
    labelProperty='name'
    selection=selectedUsers
    onchange=(action 'updateSelection')}}
```

When a checkbox is checked or unchecked, this action will be triggered and it will receive the new selection as a
parameter.

Added `updateSelectionValue` attribute. By default, the component will update the value bound to the `selection`
attribute automatically. If you prefer to update the value bound to the `selection` attribute yourself, this can be
disabled by setting the `updateSelectionValue` attribute to `false`:

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
  updateSelection: function (newSelection) {
    this.set('selection', newSelection);

    ...
  }
}
```

Note that for long option lists, allowing the component to automatically update the value bound to the `selection`
attribute may result in significantly better performance.

## 0.6.0

BC break:

As suggested by @nadnoslen, passing the option itself as a block param to a custom template block should allow more
flexibility than passing the label and option value. In previous versions, a custom template block received 3 block
parameters: the option label, a boolean value indicating whether or not the option is selected, and the option value. As
of this version, a custom template block now receives 2 parameters: the option itself and a boolean value indicating
whether or not the option is selected.

The following is an example of the old version with a custom template block:

```handlebars
{{#multiselect-checkboxes options=users labelProperty='name' selection=selectedUsers as |label isSelected value|}}
  <li>
    <label>
      {{input type="checkbox" checked=isSelected}}
      {{label}}
    </label>
  </li>
{{/multiselect-checkboxes}}
```

This should now be replaced with the following:

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

Note that the `labelProperty` attribute is now superfluous when using a custom template block; instead, `{{user.name}}`
is referenced directly in the template block.

## 0.5.0

Thanks to @techthumb, the options and checkboxes should now properly update when updating the bound options array or the
bound selection array externally. Also adds the value as an optional third block param that can be used in a custom
template block for displaying options.

## 0.4.0

This release requires Ember 1.13 or newer.

It's now possible to pass a custom template block should you want to customize the option list is some way. The
following example without a template block:

```handlebars
{{multiselect-checkboxes options=users labelProperty='name' selection=selectedUsers}}
```

Is equivalent to this example with a template block:

```handlebars
{{#multiselect-checkboxes options=users labelProperty='name' selection=selectedUsers as |label isSelected|}}
  <li>
    <label>
      {{input type="checkbox" checked=isSelected}}
      {{label}}
    </label>
  </li>
{{/multiselect-checkboxes}}
```

## 0.3.0

Adds `valueProperty` option. This option can be used to change how plain js objects or Ember js objects are represented
in the selection. If for example, you specify the options to be an array of car objects, setting the `valueProperty` to
be their "color" property, will result in a selection of color strings, instead of a selection of car objects.

This version also removed the `multiselect-checkbox-option` component. This helper component was never intended to be
part of the public API of this addon. If you were using it to create a customized checkbox list, stick on 0.2.x for a
while; when Ember 1.13 is released this addon will be updated to provide better customization options with the help of
block params.

## 0.2.0

Upgraded to Ember CLI 0.2.0.

## 0.1.0

Added option to disable a checkbox group, courtesy of @rafaelsales (see #6):

```hbs
{{multiselect-checkboxes options=persons selection=selectedPersons labelProperty="name" disabled=personsDisabled}}
```
