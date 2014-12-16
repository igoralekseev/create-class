var Model = createClass(null, {
  // constructor
  init: function () { 
    console.log('constructor of Model', arguments);
  },

  // instance methods 
  data: function () {
    console.log('data from model', this);
  },

  test: function () {
    console.log('test from Model');
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
    // this._super.init.apply(this, arguments); //parent constructor
  },

  // instance methods 
  test: function () {
    console.log('test from table', this);
    this._super.test.apply(this, arguments); // execute parent method
    // this._super.test.call(this, arg1, arg2);
  }
}, { 
  // class methods 
  at: function () {
    console.log('at! from Table', this);
  },

  findByPlayer: function () { 
    console.log('findByPlayer from table');
  }
});


// reopen class 
Table.extend({
  test: function () {
    console.log('extened test');
    this._super.test.apply(this, arguments);
  }
});


Table.extendClass({
  findByPlayer: function () {
    console.log('new findByPlayer');
    this._super.apply(this, arguments);
  }
});



Model.all()
Model.at()

// Table.all(); // parent class method 
// Table.at(0); // overriden parent class method 
Table.findByPlayer(); // class method

// t = new Table(); // create instance
// // t.data(); // parent method
// t.test(); // overriden method




