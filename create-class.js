(function (global) {

  var functionReserved = ['length', 'name', 'arguments', 'caller', 'prototype', 'extend', 'extendClass'];

  function bind (func, obj) {
    return function () {
      return func.apply(obj, arguments);
    };
  }

  function extend (dest, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        var sourceProp = source[key];
        if (typeof sourceProp == 'function') {
          if (functionReserved.indexOf(key) > -1) {
            continue;
          }  
          if (dest[key]) {
            //wrap
            var originalFunc = dest[key];
            var newFunc = sourceProp;

            sourceProp = (function (of, nf) {
              return function () {
                var oldSuper = this._super;
                this._super = bind(of, this);
                var result = nf.apply(this, arguments);
                this._super = oldSuper;
                return result;
              };
            })(dest[key], sourceProp); 
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


