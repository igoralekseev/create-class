(function (global) {

  var functionReserved = ['length', 'name', 'arguments', 'caller', 'prototype', 'extend', 'extendClass'];

  function bind (func, obj) {
    return function () {
      return func.apply(obj, arguments);
    };
  }

  function noSuper() {
    throw new Error('No "super" method defined');
  }

  function extend (dest, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        var sourceProp = source[key];
        if (typeof sourceProp == 'function') {
          if (functionReserved.indexOf(key) > -1) {
            continue;
          } 

          var type = typeof dest[key];

          // if we will replace method or undefined with method - we should wrap it
          if (type == 'undefined' || type == 'function') {
            var originalFunc = dest[key];
            var newFunc = sourceProp;
            sourceProp = (function (of, nf) {
              return function () {
                var oldSuper = this._super;
                this._super = of ? bind(of, this) : noSuper;
                var result = nf.apply(this, arguments);
                this._super = oldSuper;
                return result;
              };
            })(originalFunc, sourceProp); 
          }
        }

        dest[key] = sourceProp;
      }
    }
  }

  function createClass (superClass, instanceProps, classProps) {
    function c () {
      if (this.init) {
        return this.init.apply(this, arguments);  
      }
    }

    c.extend = function (instanceProps) {
      extend(c.prototype, instanceProps);
    };

    c.extendClass = function (classProps) {
      extend(c, classProps);
    };


    if (superClass) {
      c.prototype = Object.create(superClass.prototype);
      c.extendClass(superClass); // add class properties from superClass
    } 

    if (instanceProps) {
      c.extend(instanceProps);  
    }
    
    if (classProps) {
      c.extendClass(classProps);
    }
    
    return c;
  }

  global.createClass = createClass;
})(this);


