"use strict";



define('multiselect-checkboxes-demo-app/app', ['exports', 'ember', 'multiselect-checkboxes-demo-app/resolver', 'ember-load-initializers', 'multiselect-checkboxes-demo-app/config/environment'], function (exports, _ember, _multiselectCheckboxesDemoAppResolver, _emberLoadInitializers, _multiselectCheckboxesDemoAppConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _multiselectCheckboxesDemoAppConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _multiselectCheckboxesDemoAppConfigEnvironment['default'].podModulePrefix,
    Resolver: _multiselectCheckboxesDemoAppResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _multiselectCheckboxesDemoAppConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('multiselect-checkboxes-demo-app/components/multiselect-checkboxes', ['exports', 'ember-multiselect-checkboxes/components/multiselect-checkboxes'], function (exports, _emberMultiselectCheckboxesComponentsMultiselectCheckboxes) {
  exports['default'] = _emberMultiselectCheckboxesComponentsMultiselectCheckboxes['default'];
});
define('multiselect-checkboxes-demo-app/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define("multiselect-checkboxes-demo-app/controllers/application", ["exports", "ember"], function (exports, _ember) {

  var Person = _ember["default"].Object.extend({
    name: null,

    gender: null
  });

  exports["default"] = _ember["default"].Controller.extend({
    fruits: ["apple", "banana", "orange"],

    selectedFruits: _ember["default"].A(),

    cars: [{ make: "BMW", color: "black" }, { make: "Ferari", color: "red" }, { make: "Volvo", color: "blue" }],

    selectedCars: _ember["default"].A(),

    persons: [Person.create({ name: "Lisa", gender: "Female" }), Person.create({ name: "Bob", gender: "Male" }), Person.create({ name: "John", gender: "Male" })],

    selectedPersons: _ember["default"].A(),

    phones: ['Apple', 'Samsung', 'Nokia'],

    selectedPhones: _ember["default"].A(),

    actions: {
      selectAllPhones: function selectAllPhones() {
        this.set('selectedPhones', this.get('phones').copy());
      },

      deselectAllPhones: function deselectAllPhones() {
        this.set('selectedPhones', []);
      }
    }
  });
});
define('multiselect-checkboxes-demo-app/helpers/app-version', ['exports', 'ember', 'multiselect-checkboxes-demo-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _multiselectCheckboxesDemoAppConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _multiselectCheckboxesDemoAppConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('multiselect-checkboxes-demo-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('multiselect-checkboxes-demo-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('multiselect-checkboxes-demo-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'multiselect-checkboxes-demo-app/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _multiselectCheckboxesDemoAppConfigEnvironment) {
  var _config$APP = _multiselectCheckboxesDemoAppConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('multiselect-checkboxes-demo-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('multiselect-checkboxes-demo-app/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('multiselect-checkboxes-demo-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('multiselect-checkboxes-demo-app/initializers/export-application-global', ['exports', 'ember', 'multiselect-checkboxes-demo-app/config/environment'], function (exports, _ember, _multiselectCheckboxesDemoAppConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_multiselectCheckboxesDemoAppConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _multiselectCheckboxesDemoAppConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_multiselectCheckboxesDemoAppConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('multiselect-checkboxes-demo-app/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('multiselect-checkboxes-demo-app/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('multiselect-checkboxes-demo-app/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("multiselect-checkboxes-demo-app/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('multiselect-checkboxes-demo-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('multiselect-checkboxes-demo-app/router', ['exports', 'ember', 'multiselect-checkboxes-demo-app/config/environment'], function (exports, _ember, _multiselectCheckboxesDemoAppConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _multiselectCheckboxesDemoAppConfigEnvironment['default'].locationType,
    rootURL: _multiselectCheckboxesDemoAppConfigEnvironment['default'].rootURL
  });

  Router.map(function () {});

  exports['default'] = Router;
});
define('multiselect-checkboxes-demo-app/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("multiselect-checkboxes-demo-app/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "S07zKQCW", "block": "{\"statements\":[[\"open-element\",\"article\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h1\",[]],[\"static-attr\",\"id\",\"title\"],[\"flush-element\"],[\"text\",\"Ember multiselect-checkboxes demo\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Documentation for this component is available\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/rsschermer/ember-multiselect-checkboxes\"],[\"flush-element\"],[\"text\",\"here\"],[\"close-element\"],[\"text\",\".\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"The source for this demo is available\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/rsschermer/ember-multiselect-checkboxes/tree/gh-pages/demo-app\"],[\"flush-element\"],[\"text\",\"here\"],[\"close-element\"],[\"text\",\".\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"section\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Array of primitives\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"This example uses a plain javascript array as the selection options, with no label property specified:\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"multiselect-checkboxes\"],null,[[\"options\",\"selection\"],[[\"get\",[\"fruits\"]],[\"get\",[\"selectedFruits\"]]]]],false],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Selected fruits:\\n      \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"selectedFruits\"]]],null,3],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"section\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Array of plain js objects\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"This example uses an array of plain javascript objects as the selection options, with 'make' specified as the\\n      label property:\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"multiselect-checkboxes\"],null,[[\"options\",\"selection\",\"labelProperty\"],[[\"get\",[\"cars\"]],[\"get\",[\"selectedCars\"]],\"make\"]]],false],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Selected cars:\\n      \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"selectedCars\"]]],null,2],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"section\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Array of Ember objects\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"This example uses an array of ember objects as the selection options, with 'name' specified as the\\n      label property:\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"multiselect-checkboxes\"],null,[[\"options\",\"selection\",\"labelProperty\"],[[\"get\",[\"persons\"]],[\"get\",[\"selectedPersons\"]],\"name\"]]],false],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Selected persons:\\n      \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"selectedPersons\"]]],null,1],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"section\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Select/Unselect all\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"This example uses a plain javascript array as the selection options, \\\"Select all/Unselect all feature\\\":\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"multiselect-checkboxes\"],null,[[\"options\",\"selection\"],[[\"get\",[\"phones\"]],[\"get\",[\"selectedPhones\"]]]]],false],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"selectAllPhones\"]],[\"flush-element\"],[\"text\",\"Select all\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deselectAllPhones\"]],[\"flush-element\"],[\"text\",\"Deselect all\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Selected phones:\\n      \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"selectedPhones\"]]],null,0],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"get\",[\"phone\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"phone\"]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"name: \"],[\"append\",[\"unknown\",[\"person\",\"name\"]],false],[\"text\",\", gender: \"],[\"append\",[\"unknown\",[\"person\",\"gender\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"person\"]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"make: \"],[\"append\",[\"unknown\",[\"car\",\"make\"]],false],[\"text\",\", color: \"],[\"append\",[\"unknown\",[\"car\",\"color\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"car\"]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"get\",[\"fruit\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"fruit\"]}],\"hasPartials\":false}", "meta": { "moduleName": "multiselect-checkboxes-demo-app/templates/application.hbs" } });
});
define("multiselect-checkboxes-demo-app/templates/components/multiselect-checkboxes", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "oG/TLIgd", "block": "{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"checkboxes\"]]],null,2]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"checked\",\"disabled\"],[\"checkbox\",[\"get\",[\"checkbox\",\"isSelected\"]],[\"get\",[\"disabled\"]]]]],false],[\"text\",\"\\n        \"],[\"append\",[\"unknown\",[\"checkbox\",\"label\"]],false],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"yield\",\"default\",[[\"get\",[\"checkbox\",\"option\"]],[\"get\",[\"checkbox\",\"isSelected\"]],[\"get\",[\"index\"]]]],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"has-block\",\"default\"]],null,1,0]],\"locals\":[\"checkbox\",\"index\"]}],\"hasPartials\":false}", "meta": { "moduleName": "multiselect-checkboxes-demo-app/templates/components/multiselect-checkboxes.hbs" } });
});


define('multiselect-checkboxes-demo-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'multiselect-checkboxes-demo-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("multiselect-checkboxes-demo-app/app")["default"].create({"name":"multiselect-checkboxes-demo-app","version":"0.0.0+5b0d6bf4"});
}
//# sourceMappingURL=multiselect-checkboxes-demo-app.map
