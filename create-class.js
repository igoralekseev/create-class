function createClass (superClass, instanceProps, classProps) {
  function c () {
    if (this.init) {
      this.init.apply(this, arguments);  
    }
  }

  if (superClass) {
    c.prototype = Object.create(superClass.prototype);
    c.prototype._super = superClass.prototype;
    _.extend(c, superClass); // add class properties from superClass
  } 

  _.extend(c.prototype, instanceProps);

  if (classProps) {
    _.extend(c, classProps); // add class properties  
  }
  
  return c;
}
