# Ember-multiselect-checkboxes change log

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
