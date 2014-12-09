// string, function, object, object - name, superClass, instanceProps, classProps
// function, object, object         - superClass, instanceProps, classProps
// function, object                 - superClass, instanceProps
// object, object                   - instanceProps, classProps
// object                           - instanceProps


function createClass (name, superClass, instanceProps, classProps) {
  if (!name) name = '';
  var c = new Function(
    "return function " + name + " () { if (this.init) { return this.init.apply(this, arguments); } }"
  )();

  // function c () {
  //   if (this.init) { return this.init.apply(this, arguments); } 
  // };

  if (superClass) {
    c.prototype = Object.create(superClass.prototype);
    c.prototype._super = superClass.prototype;
    _.extend(c, superClass); // add class properties from superClass
  } 

  if (instanceProps) {
    _.extend(c.prototype, instanceProps);  
  }
  
  if (classProps) {
    _.extend(c, classProps); // add class properties  
  }
  
  // c.extend = function (instanceProps) {
  //   _.extend(this.prototype, instanceProps);
  // };

  // c.extendClass = function (classProps) {
  //   _.extend(this, instanceProps);
  // };

  return c;
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = createClass;
}