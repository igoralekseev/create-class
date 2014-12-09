create-class
============

super simple helper to create classes, no dependencies


```javascript

var Model = createClass(null, {
  // constructor
  init: function () { 
    console.log('constructor of Model', arguments);
  },

  // instance methods 
  data: function () {
    console.log('data from model', this);
  },

  empty: function () {
    console.log('empty from model', this);  
  }

}, {
  // class methods
  all: function () {
    console.log('all! from model', this);
  },

  at: function () {
    console.log('at! from model', this);
  }
});



var Table = createClass(Model, { 
  // constructor
  init: function () {
    console.log('constructor of Table', arguments);
  },

  // instance methods 
  test: function () {
    console.log('test from table', this);
    this._super.test.apply(this, arguments);
  }
}, { 
  // class methods 
  at: function () {
    console.log('at! from Table', this);
  },

  findByPlayer: function () {}
});


Table.all();
Table.at(0);
Table.findByPlayer();

t = new Table();
t.data();
t.empty();

```