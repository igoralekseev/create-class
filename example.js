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
  test: function () {
    console.log('"test" from Table instance');
    // call Model.prototype.init with context set to Table instance
    this._super();
  }
}, { 
  // class methods 
  at: function () {
    console.log('"at" from Table instance');
    // call Model.at with context set to Table 
    this._super();
  },

  findByPlayer: function () {}
});


Table.extend({
  test: function() {
    console.log('extended "test" from Table instance');
    // call oriniginal test method fron Table
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
  test: function() {
    console.log('second time extended "test" from Table instance');
    // call previosly extended test method fron Table
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
  test: function() {
    console.log('third time extended "test" from Table instance');
    // call previosly extended test method fron Table
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






Table.at(0);
Table.all();
Table.findByPlayer();

t = new Table();
t.data();
t.empty();