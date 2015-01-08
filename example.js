var Model = createClass(null, {
  // constructor
  init: function () { 
    console.log('"constructor" of Model');
  },

  // instance methods 
  data: function () {
    console.log('"data" from Model instance');
  },

  empty: function () {
    console.log('"empty" from Model instance');  
  }

}, {
  // class methods
  all: function () {
    console.log('"all" from Model class');
  },

  at: function () {
    console.log('"at" from Model class');
  }
});



var Table = createClass(Model, { 
  // constructor
  init: function () {
    console.log('"constructor" of Table');
    // call Model.prototype.init with context set to Table instance
    this._super();
  },

  // instance methods 
  data: function () {
    console.log('"data" from Table instance');
    this._super();
  }
}, { 
  // class methods 
  at: function () {
    console.log('"at" from Table class');
    // call Model.at with context set to Table 
    this._super();
  },

  findByPlayer: function () {
    console.log('"findByPlayer" from Table class');
  }
});


Table.extend({
  data: function() {
    console.log('extended "data" from Table instance');
    // call oriniginal "data" method fron Table
    this._super();
  } 
});

Table.extendClass({
  at: function() {
    console.log('extended "at" from Table class');
    // call oriniginal method Table.at
    this._super();
  }
});

// you can do it again :)
Table.extend({
  data: function() {
    console.log('second time extended "data" from Table instance');
    // call previosly extended "data" method fron Table
    this._super();
  } 
});

Table.extendClass({
  at: function() {
    console.log('second time extended "at" from Table class');
    // call previosly extended method Table.at
    this._super();
  }
});



// and again :)
Table.extend({
  data: function() {
    console.log('third time extended "data" from Table instance');
    // call previosly extended "data" method fron Table
    this._super();
  } 
});

Table.extendClass({
  at: function() {
    console.log('third time extended "at" from Table class');
    // call previosly extended method Table.at
    this._super();
  }
});




Table.all();
// output:
// "all" from Model class

Table.at(0);
// output:
// third time extended "at" from Table class
// second time extended "at" from Table class
// extended "at" from Table class
// "at" from Table class
// "at" from Model class

Table.findByPlayer();
// output:
// "findByPlayer" from Table class

t = new Table();
// output:
// "constructor" of Table
// "constructor" of Model

t.data();
// output:
// third time extended "data" from Table instance
// second time extended "data" from Table instance
// extended "data" from Table instance
// "data" from Table instance
// "data" from Model instance

t.empty();
// output:
// "empty" from Model instance

