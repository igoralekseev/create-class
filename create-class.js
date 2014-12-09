(function (global) {

  function extend (target, source) {        
    for (var k in source) {
      if (source.hasOwnProperty(k)) {
        target[k] = source[k];
      }
    }
  }

  global.createClass = function createClass (superClass, instanceProps, classProps) {
    function c () {
      if (this.init) {
        return this.init.apply(this, arguments);  
      }
    }

    c.extend = function (instanceProps) {
      extend(this.prototype, instanceProps);
    };

    c.extendClass = function (classProps) {
      extend(this, classProps);
    };

    if (superClass) {
      c.prototype = Object.create(superClass.prototype); // link prototypes
      c.prototype._super = superClass.prototype; // shorthand link to super methods
      c.extendClass(superClass); // add class iproperties from superClass
    }

    if (instanceProps) {
      c.extend(instanceProps);  
    }
    
    if (classProps) {
      c.extendClass(classProps); // add class properties  
    }

    return c;
  };


})(this);

