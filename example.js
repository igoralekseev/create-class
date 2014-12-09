
var Model = createClass('Model', null, {
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
    console.log('all from model', this);
  },

  at: function () {
    console.log('at from model', this);
  },

  createSpecial: function () {
    return new this();
  }
});



var Table = createClass('Table', Model, { 
  // constructor
  init: function () {
    this._super.init.apply(this, arguments);
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
    console.log('at from Table', this);
  },

  findByPlayer: function () {}
});


Table.all();
Table.at(0);
Table.findByPlayer();

var t = new Table();
t.data();
t.empty();

console.log('create special', Model.createSpecial());



var Singleton = createClass(null, null, {
  init: function () {
    if (this.constructor.instance)
      return this.constructor.instance;
    this.constructor.instance = this;
  }
});

var s1 = new Singleton();
var s2 = new Singleton();
console.log('Singleton', s1 == s2);




