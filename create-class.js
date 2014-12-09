function createClass (superClass, instanceProps, classProps) {
  function c () {
    if (this.init) {
      var o = this.init.apply(this, arguments);  
      if (o) return o;
    }
  }

  c.extend = function (instanceProps) {
    _.extend(c.prototype, instanceProps);
  };

  c.extendClass = function (classProps) {
    _.extend(c, classProps);
  };

  if (superClass) {
    c.prototype = Object.create(superClass.prototype);
    c.prototype._super = superClass.prototype;
    c.extendClass(superClass); // add class properties from superClass
  } 

  if (instanceProps) {
    c.extend(instanceProps);  
  }
  
  if (classProps) {
    c.extendClass(classProps); // add class properties  
  }
  

  return c;
}
