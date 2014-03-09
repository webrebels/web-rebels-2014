// Source: https://gist.github.com/3861744
// Added to project at: 2013.01.08
//
// Simple, tiny, dumb module definitions for Browser JavaScript.
//
// What it does:
//
// * Tiny enough to include anywhere. Intended as a shim for delivering
//   browser builds of your library to folks who don't want to use script loaders.
// * Exports modules to `__modules__`, a namespace on the global object.
//   This is an improvement over typical browser code, which pollutes the
//   global object.
// * Prettier and more robust than the
//   [IIFE module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript),
//   and if you have multiple modules, it's really no bigger.
// * It's a compatible sub-set of AMD, so if you switch to a script loader,
//   it will "just work".
// * Lets you know if your dependencies are awry.
// * Passes you a syncronous require, making this an option for wrapping
//   Node libraries that don't require server features
//   (e.g. wrap it with a Makefile or somesuch).
// * Helpful for development. Syncronous `require` means you can easily test
//   code live in REPLs like the Console or Scratchpad:
//
//       >> require('foo').bar()
//       >> 3
//
// What it doesn't:
//
// * Does not handle script loading. You order your script tags yourself.
//   BUT, it does throw helpful exceptions, letting you know if you've
//   loaded your scripts out of order.
// * Does not do path mapping. Module IDs are absolute.
// * No AMD plugin/loader support, but could support inlined loader plugin
//   resources like 'text!...' ones. A reasonable tradeoff for size.
// * Does not support the second AMD form `define(['a', 'b'], function (a, b) {})`.
//   YAGNI.
//
// Motivation: make `define`/`require`/`exports` wrappers a practical module
// format for distributing libraries to folks, whether or not they use an
// AMD script loader.

// Create a hash to store our modules.
var modules = window.__modules__ = {};

// Require a module at an id. Returns the module's `exports` object.
// `require` looks for modules on `window` and throws an exception when it
// doesn't find them.
function require(id) {
  // Get the module's exports.
  var exports = modules[id];
  // If there is no module yet, throw an exception, letting us know we've
  // loaded our scripts out of order.
  if(!exports) throw new Error(id + ' module not yet defined');
  return exports;
}

// Create an AMD-style define function, for defining new modules.
// This function takes an ID and a callback that exports your module.
// `exports` are added under `path` to `window`.
//
// * The path can be any valid key. Usually the name of your module. The key
//   will be assigned to the global object, so be sure it's unique.
// * Callback is where you construct your module and export values.
//   It gets a "require" function and an "exports" object.
//
// This is basically a subset of AMD's define. Modules using this pattern
// should be compatible with AMD loaders, and  Modules authored for AMD
// should work if they have a path key.
function define(id, callback) {
  // Throw an exception if the module already exists.
  if(modules[id]) throw new Error(id + ' module or property already exists');
  var exports = {};
  // Assign module to to namespace. If `callback` returns a value, use that
  // as the module value. Otherwise, use `exports`. Allowing return values
  // makes define compatible with a greater subset of AMD code.
  var result = modules[id] = callback(require, exports) || exports; 
  return result;
}