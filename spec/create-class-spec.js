function spyOnAll(obj) {
  Object.keys(obj).forEach(function (k) {
    if (typeof obj[k] == 'function') {
      spyOn(obj, k).and.callThrough();
    }
  });
}


function createModelInstanceMethods () {
  return {
    // constructor
    init: function() {
      console.log('new Model');
    },
    
    // instance methods 
    test: function() {
      console.log('test from Model');
    },
    test2: function() {},
    test4: function() {}
  };
}


function createModelClassMethods () {
  return {
    all: function() {},
    at: function() {}
  };
}


function createTableInstanceMethods () {
  return {
    // constructor
    init: function () { 
      this._super();
      console.log('new Table');
    },

    // instance methods
    test: function () {
      console.log('test from Table');
      this._super();
    }, 

    // redefine and doesnt call super
    test2: function () {
      console.log('test2 from Table ');
    },

    // Table instance method
    test3: function () {
      console.log('test3 from Table');
    },
  };
}

function createTableClassMethods () {
  return {
    all: function () {
      this._super();
    }, 

    findByPlayer: function () {}
  };
}




describe("createClass", function() {
  describe('class without super', function() {
    var Model;
    var modelInstanceMethods;
    var modelClassMethods;

    beforeEach(function() {
      console.log('---');
      modelInstanceMethods = createModelInstanceMethods();
      modelClassMethods = createModelClassMethods();

      spyOnAll(modelInstanceMethods);
      spyOnAll(modelClassMethods);

      Model = createClass(null, modelInstanceMethods, modelClassMethods);
    });

    it('calls constructor', function() {
      var m = new Model();
      expect(modelInstanceMethods.init).toHaveBeenCalled();
      // check context
      expect(modelInstanceMethods.init.calls.first().object).toEqual(m); 
    });

    it('has all instance methods', function() {
      var m = new Model();
      Object.keys(modelInstanceMethods).forEach(function(k) {
        // init has been call on construction
        if (k != 'init') {
          m[k]();  
        }

        expect(modelInstanceMethods[k]).toHaveBeenCalled();
      });      
    });

    it('has as class methods', function() {
      Object.keys(modelClassMethods).forEach(function(k) {
        Model[k]();  
        expect(modelClassMethods[k]).toHaveBeenCalled();
      });      
    });
  });


  describe('class with super class', function() {

    var Model;
    var modelInstanceMethods;
    var modelClassMethods;

    var Table;
    var tableInstanceMethods;
    var tableClassMethods;
    
    beforeEach(function() {
      console.log('---');
      modelInstanceMethods = createModelInstanceMethods();
      modelClassMethods = createModelClassMethods();

      spyOnAll(modelInstanceMethods);
      spyOnAll(modelClassMethods);

      Model = createClass(null, modelInstanceMethods, modelClassMethods);

      tableInstanceMethods = createTableInstanceMethods();
      tableClassMethods = createTableClassMethods();

      spyOnAll(tableInstanceMethods);
      spyOnAll(tableClassMethods);

      Table = createClass(Model, tableInstanceMethods, tableClassMethods);
    });

    it('calls constructor ', function() {
      var t = new Table();
      expect(tableInstanceMethods.init).toHaveBeenCalled();
      expect(tableInstanceMethods.init.calls.first().object).toEqual(t);
    });

    it('calls super constructor', function() {
      var t = new Table();
      expect(modelInstanceMethods.init).toHaveBeenCalled();
      expect(modelInstanceMethods.init.calls.first().object).toEqual(t);
    });

    it('doesnt redefine parent methods', function() {
      var m = new Model();
      var t = new Table();
      
      m.test2(1);
      t.test2(2);
      
      expect(modelInstanceMethods.test2.calls.all().length).toEqual(1); 
      expect(modelInstanceMethods.test2.calls.allArgs()).toEqual([[1]]);

      expect(tableInstanceMethods.test2.calls.all().length).toEqual(1);
      expect(tableInstanceMethods.test2.calls.allArgs()).toEqual([[2]]);
      
    });

    it('has instance methods ', function() {
      var t = new Table();
      Object.keys(tableInstanceMethods).forEach(function(k) {
        // init has been call on construction
        if (k != 'init') {
          t[k]();  
        }

        expect(tableInstanceMethods[k]).toHaveBeenCalled();
      }); 
    });

    it('has not redefined parent instance methods ', function() {
      var t = new Table();
      var notRedefinedProps = ['test4'];
      notRedefinedProps.forEach(function (key) {
        expect(t[key]).toEqual(modelInstanceMethods[key]);
      });
    });


    it('has redefined methods with "super" set and called', function() {
      var t = new Table();
      t.test();

      expect(tableInstanceMethods.test).toHaveBeenCalled();
      expect(modelInstanceMethods.test).toHaveBeenCalled();
      expect(modelInstanceMethods.test.calls.first().object).toEqual(t);
    });

    it('parent instance has original methods', function() {
      var t = new Table();
      t.test2();

      expect(tableInstanceMethods.test2).toHaveBeenCalled();
      expect(modelInstanceMethods.test2).not.toHaveBeenCalled();
    });


    it('has class methods', function() {
       Object.keys(tableClassMethods).forEach(function(k) {
        Table[k]();  
        expect(tableClassMethods[k]).toHaveBeenCalled();
      });  
    });

    it('has not redefined parent class methods', function() {
      var notRedefinedProps = ['at'];
      notRedefinedProps.forEach(function (key) {
        expect(Table[key]).toEqual(modelClassMethods[key]);
      });
    });

    it('has redefined class methods with "super" set and called', function() {
      var redefinedProps = ['all'];
      redefinedProps.forEach(function (key) {
        Table[key]();
        expect(modelClassMethods[key]).toHaveBeenCalled();
        expect(modelClassMethods[key].calls.first().object).toEqual(Table);
      });
    });

    it('parent doesnt have new class methods', function() {
      expect(Model.findByPlayer).not.toBeDefined();
    });
  });

  describe('class extended with instance methods', function() {
    var Model;
    var modelInstanceMethods;
    var modelClassMethods;

    var Table;
    var tableInstanceMethods;
    var tableClassMethods;
    
    var extendedMethods;

    beforeEach(function() {
      console.log('---');
      modelInstanceMethods = createModelInstanceMethods();
      modelClassMethods = createModelClassMethods();

      spyOnAll(modelInstanceMethods);
      spyOnAll(modelClassMethods);

      Model = createClass(null, modelInstanceMethods, modelClassMethods);

      tableInstanceMethods = createTableInstanceMethods();
      tableClassMethods = createTableClassMethods();

      spyOnAll(tableInstanceMethods);
      spyOnAll(tableClassMethods);

      Table = createClass(Model, tableInstanceMethods, tableClassMethods);

      extendedMethods = {
        // redefine and call super (old test from Table)
        test: function () {
          console.log('extended test from Table');
          this._super();
        },


        test2: function () {
          console.log('new test2 from Table');
        },

        test3: function () {
          console.log('extended test3 from Table');
          this._super();
        }
      };

      spyOnAll(extendedMethods);

      Table.extend(extendedMethods);
    });

    it('has method with super set to original method and call all chain', function() {
      var t = new Table();
      t.test();

      expect(extendedMethods.test).toHaveBeenCalled();
      expect(tableInstanceMethods.test).toHaveBeenCalled();
      expect(modelInstanceMethods.test).toHaveBeenCalled();
    });

    it('has method with super set to original method', function() {
      var t = new Table();
      t.test3();
      expect(extendedMethods.test3).toHaveBeenCalled();
      expect(tableInstanceMethods.test3).toHaveBeenCalled();
    });

    it('has method with super set to original method', function() {
      var t = new Table();
      t.test2();
      expect(extendedMethods.test2).toHaveBeenCalled();
      expect(tableInstanceMethods.test2).not.toHaveBeenCalled();
    });
  });


  describe('class extended with class methods', function() {
    var Model;
    var modelInstanceMethods;
    var modelClassMethods;

    var Table;
    var tableInstanceMethods;
    var tableClassMethods;

    var extendedMethods;
    
    beforeEach(function() {
      console.log('---');
      modelInstanceMethods = createModelInstanceMethods();
      modelClassMethods = createModelClassMethods();

      spyOnAll(modelInstanceMethods);
      spyOnAll(modelClassMethods);

      Model = createClass(null, modelInstanceMethods, modelClassMethods);

      tableInstanceMethods = createTableInstanceMethods();
      tableClassMethods = createTableClassMethods();

      spyOnAll(tableInstanceMethods);
      spyOnAll(tableClassMethods);

      Table = createClass(Model, tableInstanceMethods, tableClassMethods);

      extendedMethods = {
        // redefine and call super (old test from Table)
        all: function () {
          console.log('extended all from Table');
          this._super();
        },

        findByState: function () {
          console.log('new findByState from Table');
        },

        findByPlayer: function () {
          console.log('extended findByPlayer from Table');
          this._super();
        }
      };

      spyOnAll(extendedMethods);

      Table.extendClass(extendedMethods);
    });

    it('has method with super set to original method and call all chain', function() {
      Table.all();

      expect(extendedMethods.all).toHaveBeenCalled();
      expect(tableClassMethods.all).toHaveBeenCalled();
      expect(modelClassMethods.all).toHaveBeenCalled();
    });

    it('has method with super set to original method', function() {
      Table.findByPlayer();

      expect(extendedMethods.findByPlayer).toHaveBeenCalled();
      expect(tableClassMethods.findByPlayer).toHaveBeenCalled();
    });

    it('has method with super set to original method', function() {
      Table.findByState();

      expect(extendedMethods.findByState).toHaveBeenCalled();
      expect(tableClassMethods.findByState).not.toBeDefined();
    });
  });

});


var A = createClass(null, { 
  data: null,
  init: function (data) {
    this.data =  data || [1,2,3,4];
  },

  getLength: function () {
    return this.data.length;
  },
}, {
  createWith5: function (data) {
    return new this(data || [1,2,3,4,5]);
  }
});

var B = createClass(A, {
  init: function (data) {
    this._super(data);
  },

  getCoolnes: function () {
    return 'aaaa';
  }
}, {
  createWith5: function () {
    return this._super([5,5,5,5,5]);
  }
});





