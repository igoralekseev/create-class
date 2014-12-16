describe("createClass", function() {

  // class without super
    // has all instance methods
    // has as class methods

  // class with super 
    // has parent methods
    // has all instance methods with 'super' set
    // has parent class methods
    // has all class methods with 'super' set

  // class extended
    // has method with super set to original method

  // class extendedClass
    // has method with super set to original method


  var Model = createClass(null, {
    // constructor
    init: function () { 
      console.log('constructor of Model', arguments);
    },

    // instance methods 
    test: function () {
      console.log('test from Model');
    }
  }, {
    // class methods
    all: function () {
      console.log('all! from model', this);
    }
  });


  var Table = createClass(Model, {
    // constructor
    init: function () { 
      console.log('constructor of Table', arguments);
      this._super.apply(this, arguments);
    },

    test: function () {
      console.log('test from Table');
      this._super.apply(this, arguments);
    }, 

    test2: function () {
      console.log('test2 from Table');
    }
  }, {
    findByPlayer: function () {
      console.log('findByPlayer from Table');
    }
  });

  // reopen  
  Table.extend({
    test: function () {
      console.log('extened test');
      this._super.apply(this, arguments);
    }
  });

  // reopen class
  Table.extendClass({
    findByPlayer: function () {
      console.log('new findByPlayer');
      this._super.apply(this, arguments);
    }
  });


  


  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });


});