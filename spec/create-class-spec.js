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
    all: function() {
      console.log('all from Model');

    },
    at: function() {}
  };
}


function createTableInstanceMethods () {
  return {
    // constructor
    init: function () { 
      console.log('new Table');
      this._super();
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
      console.log('all from Table');
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
      expect(modelInstanceMethods.init.calls.count()).toEqual(1);
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

        expect(modelInstanceMethods[k].calls.count()).toEqual(1);
      });      
    });

    it('has as class methods', function() {
      Object.keys(modelClassMethods).forEach(function(k) {
        Model[k]();  
        expect(modelClassMethods[k].calls.count()).toEqual(1);
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
      expect(tableInstanceMethods.init.calls.count()).toEqual(1);
      expect(tableInstanceMethods.init.calls.first().object).toEqual(t);
    });

    it('calls super constructor', function() {
      var t = new Table();
      expect(modelInstanceMethods.init.calls.count()).toEqual(1);
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

        expect(tableInstanceMethods[k].calls.count()).toEqual(1);
      }); 
    });

    it('has not redefined parent instance methods ', function() {
      var t = new Table();
      var notRedefinedProps = ['test4'];
      notRedefinedProps.forEach(function (key) {
        t[key]();
        expect(modelInstanceMethods[key]).toHaveBeenCalled();
      });
    });


    it('has redefined methods with "super" set and called', function() {
      var t = new Table();
      t.test();

      expect(tableInstanceMethods.test.calls.count()).toEqual(1);
      expect(modelInstanceMethods.test.calls.count()).toEqual(1);
      expect(modelInstanceMethods.test.calls.first().object).toEqual(t);
    });

    it('parent instance has original methods', function() {
      var t = new Table();
      t.test2();

      expect(tableInstanceMethods.test2.calls.count()).toEqual(1);
      expect(modelInstanceMethods.test2).not.toHaveBeenCalled();
    });


    it('has class methods', function() {
       Object.keys(tableClassMethods).forEach(function(k) {
        Table[k]();  
        expect(tableClassMethods[k].calls.count()).toEqual(1);
      });  
    });

    it('has not redefined parent class methods', function() {
      var notRedefinedProps = ['at'];
      notRedefinedProps.forEach(function (key) {
        Table[key]();
        expect(modelClassMethods[key]).toHaveBeenCalled();
      });
    });

    it('has redefined class methods with "super" set and called', function() {
      var redefinedProps = ['all'];
      redefinedProps.forEach(function (key) {
        Table[key]();
        expect(modelClassMethods[key].calls.count()).toEqual(1);
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

      expect(extendedMethods.test.calls.count()).toEqual(1);
      expect(tableInstanceMethods.test.calls.count()).toEqual(1);
      expect(modelInstanceMethods.test.calls.count()).toEqual(1);
    });

    it('has method with super set to original method', function() {
      var t = new Table();
      t.test3();
      expect(extendedMethods.test3.calls.count()).toEqual(1);
      expect(tableInstanceMethods.test3.calls.count()).toEqual(1);
    });

    it('has method with super set to original method', function() {
      var t = new Table();
      t.test2();
      expect(extendedMethods.test2.calls.count()).toEqual(1);
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

      expect(extendedMethods.all.calls.count()).toEqual(1);
      expect(tableClassMethods.all.calls.count()).toEqual(1);
      expect(modelClassMethods.all.calls.count()).toEqual(1);
    });

    it('has method with super set to original method', function() {
      Table.findByPlayer();

      expect(extendedMethods.findByPlayer.calls.count()).toEqual(1);
      expect(tableClassMethods.findByPlayer.calls.count()).toEqual(1);
    });

    it('has method with super set to original method', function() {
      Table.findByState();

      expect(extendedMethods.findByState.calls.count()).toEqual(1);
      expect(tableClassMethods.findByState).not.toBeDefined();
    });
  });
  
  describe('inplace extended multiple times', function() {

    function createExtendedClassMethods (time) {
      return (function (t) {
        return {
          all: function () {
            console.log('all, extened ' + t +' times');
            this._super();
          }
        };
      })(time);
    }

    function createExtendedInstanceMethods (time) {
      return (function (t) {
        return {
          test: function () {
            console.log('test, extened ' + t +' times');
            this._super();
          }
        };
      })(time);
    }

 
    var Model;
    var modelInstanceMethods;
    var modelClassMethods;

    var Table;
    var tableInstanceMethods;
    var tableClassMethods;


    var classMethods;
    var instanceMethods;

    beforeEach(function () {
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

      var times = 5;
      
      classMethods = [ ];
      for (var i = 0; i < times; i++) {
        var cm = createExtendedClassMethods(i);
        spyOnAll(cm);
        Table.extendClass(cm);
        classMethods.push(cm);
      }

      instanceMethods = [ ];
      for (var j = 0; j < times; j++) {
        var im = createExtendedInstanceMethods(j);
        spyOnAll(im);
        Table.extend(im);
        instanceMethods.push(im);
      }
    });



    it('class methods can be extended multiple times', function () {
      Table.all();

      expect(modelClassMethods.all.calls.count()).toEqual(1);
      expect(tableClassMethods.all.calls.count()).toEqual(1);

      for (var i = 0; i < classMethods.length; i++) {
        expect(classMethods[i].all.calls.count()).toEqual(1);
      }
    });

    it('instance methods can be extended multiple times', function () {
      var t  = new Table();
      t.test();

      expect(modelInstanceMethods.test.calls.count()).toEqual(1);
      expect(tableInstanceMethods.test.calls.count()).toEqual(1);

      for (var i = 0; i < instanceMethods.length; i++) {
        expect(instanceMethods[i].test.calls.count()).toEqual(1);
      }

    });
  });

  describe('errors', function() {
    beforeEach(function () {

    });

    it('should throw an error with readable message when called super method but there wasn\'t any', function () {
      
      var extendedMethods = {
        test: function () {
          this._super();
        }
      };

      spyOnAll(extendedMethods);

      var A = createClass(null, {});
      A.extend(extendedMethods);

      var a = new A();      
      expect(a.test).toThrow(new Error('No "super" method defined'));
      
    });

    it('should throw an error with readable message when called super super method but there wasn\'t any', function () {
      var methods = {
        test: function () {
          this._super();
        }
      };

      var extendedMethods = {
        test: function () {
          this._super();
        }
      };

      spyOnAll(methods);
      spyOnAll(extendedMethods);

      var A = createClass(null, methods);
      A.extend(extendedMethods);

      var a = new A();
      expect(a.test).toThrow(new Error('No "super" method defined'));

    });


  });
});






