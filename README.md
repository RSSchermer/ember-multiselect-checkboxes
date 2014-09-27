# Ember-multiselect-checkboxes

Simple Ember component for allowing multiple selection using checkboxes from a certain collection (a hasMany property
for example).

## Installation

`npm install ember-multiselect-checkboxes --save-dev`

## Usage

Example:

``` handlebars
{{multiselect-checkboxes options=users labelProperty='name' selection=selectedUsers}}
```

The following properties are available and should be set:

* `options`: a collection of Ember objects that can be selected.
* `labelProperty`: the property on the Ember object that will be used as a label for the checkbox.
* `selection`: the subset of the options that is currently selected. The selection will automatically be updated when
  the user checks or unchecks options through Ember's two-way bindings.
