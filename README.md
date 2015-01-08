create-class
============

super simple helper to create classes with inheritance and extend them later.


```javascript

// create class without superclass
var Model = createClass(null, {
  // constructor
  init: function () { 
    console.log('constructor of Model', arguments);
  },

  // instance methods 
  data: function () {}
}, {
  // class methods
  all: function () {},
  at: function () {}
});



var Table = createClass(Model, { 
  // constructor
  init: function () {
    // calls super constuctor - Model.prototype.init with context set to Table instance
    this._super()
  },

  // instance methods 
  data: function () {
    // calls super method - Model.prototype.data with context set to Table instance
    this._super();
  }
}, { 
  // class methods 
  at: function () {
    // calls class super method - Model.at with context set to Table
    this._super()
  },

  findByPlayer: function () {}
});



// usage
Table.all();
Table.at(0);
Table.findByPlayer();

t = new Table();
t.data();

```