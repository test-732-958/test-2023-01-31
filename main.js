// This is some boilerplate for setting up an Express app
const express = require('express')
const app = express()
app.use(express.static('public'))
const port = 3000

// Steal this flag
const secretFlag = "Border relations with Canada have never been better."

// This is just the landing page on `/`,
// it redirects to a static `index.html` (in `./public/index.html`)
app.get('/', (req, res) => {
  res.redirect("index.html")
})

// The current idea is to have one separate request handler for each example.
//
// All examples are surrounded by alignment-markers to simplify merging
// (otherwise, all the closing parentheses will collide every time)

// Example-01 start
// This will handle requests sent to `http://localhost:3000/example-01`
app.get('/example-01', (req, res) => {
  // The "input" is a request parameter sent with the GET-request.
  // See the `form` in `./public/index.html`, it sends the `input`.
  const tainted = req.query.input;
  // Putting tainted values into `eval` is clearly a security vulnerability.
  res.send('Answer: ' + eval(tainted))
})
// Example-01 end


// Example-02 start
app.get('/example-02', (req, res) => {
  const tainted = req.query.input;

  // According to the JS semantics (lol), if indexStart == indexEnd, then substring() returns an empty string.
  // This means that, after the assignment, untainted is not tainted (no pun intended)
  // This test is interesting to see
  //   - if they approximate integers
  //   - if they have encoded an abstract semantics for substring()
  const untainted = tainted.substring(0, 0);

  // eval(untainted) should always be undefined
  res.send('Answer: ' + eval(untainted))
})
// Example-02 end

// Example-03 start
app.get('/example-03', (req, res) => {
  const tainted = req.query.input;
  const intermediate = tainted;
  res.send('Answer: ' + eval(intermediate))
})

// Example-03 end

// Example-04 start
app.get('/example-04', (req, res) => {
  let tainted = req.query.input;

  if (true) {
    tainted = "";
  }

  // This will never do anything, `tainted` is always empty
  res.send('Answer: ' + eval(tainted))
})

// Example-04 end

// Example-05 start
// Example-05 end

// Example-06 start
function suppress(x) {
  if (false) {
    return x;
  }

  return "";
}

app.get('/example-06', (req, res) => {
  const tainted = req.query.input;
  const untainted = suppress(tainted);
  res.send('Answer: ' + eval(untainted))
})
// Example-06 end

// Example-07 start
// Example-07 end

// Example-08 start
function customIdentity(x) {
  if (3 + 10 > 5) {
    return x;
  }

  return "";
}

app.get('/example-08', (req, res) => {
  let tainted = req.query.input;
  tainted = customIdentity(tainted);
  res.send('Answer: ' + eval(tainted))
})
// Example-08 end

// Example-09 start
// Example-09 end

// Example-10 start
function conditionalPassthrough(b, x) {
  if (b) {
    return x;
  }

  return "";
}

app.get('/example-10', (req, res) => {
  let tainted = req.query.input;
  tainted = conditionalPassthrough(true, tainted);
  res.send('Answer: ' + eval(tainted))
})
// Example-10 end

// Example-11 start
// Example-11 end

// Example-12 start
app.get('/example-12', (req, res) => {
  let tainted = req.query.input;
  tainted = conditionalPassthrough(false, tainted);
  res.send('Answer: ' + eval(tainted))
})
// Example-12 end

// Example-13 start
// Example-13 end

// Example-14 start
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.get('/example-14', (req, res) => {
  const a = getRandomInt(10);
  const b = getRandomInt(10);

  var max = a;
  if (max >= a) {
    max = b;
  }

  var tainted = "";
  if (max >= a) { // always true
    tainted = req.query.input;
  }

  res.send('Answer: ' + eval(tainted))
})
// Example-14 end

// Example-15 start
// Example-15 end

// Example-16 start
app.get('/example-16', (req, res) => {
  const a = getRandomInt(10);
  const b = getRandomInt(10);

  var max = a;
  if (max >= a) {
    max = b;
  }

  var untainted = "";
  if (a > max) { // always false
    untainted = req.query.input;
  }

  res.send('Answer: ' + eval(untainted))
})
// Example-16 end

// Example-17 start
// Example-17 end

// Example-18 start
app.get('/example-18', (req, res) => {
  const a = [];
  for (let i = 0; i < 100; i++) {
    a.push(i);
  }

  a[42] = req.query.input;

  // Vulnerable
  res.send('Answer: ' + eval(a[42]));
})
// Example-18 end

// Example-19 start
// Example-19 end

// Example-20 start
app.get('/example-20', (req, res) => {
  const a = [];
  for (let i = 0; i < 100; i++) {
    a.push(i);
  }

  a[42] = req.query.input;

  // Non-vulnerable
  res.send('Answer: ' + eval(a[0]));
})
// Example-20 end

// Example-21 start
// Example-21 end

// Example-22 start
app.get('/example-22', (req, res) => {
  const a = [];
  for (let i = 0; i < 100; i++) {
    a.push(i);
    if (i == 42) {
      a[i] = req.query.input;
    }
  }

  // Vulnerable
  res.send('Answer: ' + eval(a[42]));
})
// Example-22 end

// Example-23 start
// Example-23 end

// Example-24 start
app.get('/example-24', (req, res) => {
  const a = [];
  for (let i = 0; i < 100; i++) {
    a.push(i);
    if (i == 42) {
      a[i] = req.query.input;
    }
  }

  // Non-vulnerable
  res.send('Answer: ' + eval(a[0]));
})
// Example-24 end

// Example-25 start
// Example-25 end

// Example-26 start
app.get('/example-26', (req, res) => {
  const id = x => x;
  const tainted = id(req.query.input);

  // Vulnerable
  res.send('Answer: ' + eval(tainted));
})
// Example-26 end

// Example-27 start
// Example-27 end

// Example-28 start
app.get('/example-28', (req, res) => {
  const zero = x => { return 0; };
  const untainted = zero(req.query.input);

  // Non-vulnerable
  res.send('Answer: ' + eval(untainted));
})
// Example-28 end

// Example-38 start
app.get('/example-38', (req, res) => {
  const apply = (f, s) => f(s);
  const zero = x => { return 0; };
  const untainted = apply(zero, req.query.input);

  // Non-vulnerable
  res.send('Answer: ' + eval(untainted));
})
// Example-38 end

// Example-40 start
app.get('/example-40', (req, res) => {
  const apply = (f, s) => f(s);
  const id = x => x;
  const tainted = apply(id, req.query.input);

  // Vulnerable
  res.send('Answer: ' + eval(tainted));
})
// Example-40 end

// Example-29 start
// Example-29 end

// Example-30 start
app.get('/example-30', (req, res) => {
  let tainted = req.query.input;

  {
    let tainted = 0;
  }

  // Vulnerable
  res.send('Answer: ' + eval(tainted));
})
// Example-30 end

// Example-32 start
app.get('/example-32', (req, res) => {
  let untainted = req.query.input;

  {
    untainted = 0;
  }

  // Non-vulnerable
  res.send('Answer: ' + eval(untainted));
})
// Example-32 end

// Example-34 start
class MaybeTainted {
  constructor(taint) {
    this.taint = taint;
  }

  run(s) {
    return this.passthrough(s);
  }

  passthrough(s) {
    return this.taint ? s : 0;
  }
}

app.get('/example-34', (req, res) => {
  const s = req.query.input;
  const tainted = new MaybeTainted(true).run(s);

  // Vulnerable
  res.send('Answer: ' + eval(tainted));
})
// Example-34 end

// Example-36 start
app.get('/example-36', (req, res) => {
  const s = req.query.input;
  const untainted = new MaybeTainted(false).run(s);

  // Non-vulnerable
  res.send('Answer: ' + eval(untainted));
})
// Example-36 end

// Example-42 start
class StaticMaybeTainted {
  static run(taint, s) {
    return this.passthrough(taint, s);
  }

  static passthrough(taint, s) {
    return taint ? s : 0;
  }
}

app.get('/example-42', (req, res) => {
  const s = req.query.input;
  const tainted = StaticMaybeTainted.run(true, s);

  // Vulnerable
  res.send('Answer: ' + eval(tainted));
})
// Example-42 end

// Example-44 start
app.get('/example-44', (req, res) => {
  const s = req.query.input;
  const untainted = StaticMaybeTainted.run(false, s);

  // Non-vulnerable
  res.send('Answer: ' + eval(untainted));
})
// Example-44 end

// Example-46 start
const stateWrapper = s => {
  let internal = s;
  return {
    get: () => internal,
    set: s => internal = s
  };
}

app.get('/example-46', (req, res) => {
  const s = req.query.input;
  const sWrapper = stateWrapper(s);
  const tainted = sWrapper.get();

  // Vulnerable
  res.send('Answer: ' + eval(tainted));
})
// Example-46 end

// Example-48 start
app.get('/example-48', (req, res) => {
  const s = req.query.input;
  const sWrapper = stateWrapper(s);

  sWrapper.set(0);

  const untainted = sWrapper.get();

  // Non-vulnerable
  res.send('Answer: ' + eval(untainted));
})
// Example-48 end

// Example-50 start
app.get('/example-50', (req, res) => {
  const dict = {
    "tainted": req.query.input,
    "untainted": 0
  }

  const tainted = dict["tainted"];

  // Vulnerable
  res.send('Answer: ' + eval(tainted));
})
// Example-50 end

// Example-52 start
app.get('/example-52', (req, res) => {
  const dict = {
    "tainted": req.query.input,
    "untainted": 0
  }

  const untainted = dict["untainted"];

  // Non-vulnerable
  res.send('Answer: ' + eval(untainted));
})
// Example-52 end


// Example-54 start
app.get('/example-54', (req, res) => {
  var tainted = req.query.input;

  function codeHoist() {
      var tainted = 0;
  }

  codeHoist();

  // Vulnerable
  res.send('Answer: ' + eval(tainted));
})
// Example-54 end

// Example-56 start
app.get('/example-56', (req, res) => {
  var untainted = req.query.input;

  function codeHoist() {
      untainted = 0;
  }

  codeHoist();

  // Non-vulnerable
  res.send('Answer: ' + eval(untainted));
})
// Example-56 end

// Example-58 start
app.get('/example-58', (req, res) => {
  const dict = {
    "tainted": req.query.input,
    "untainted": 0
  }

  const taintString = "taint";
  const unString = "un";
  const edString = "ed"

  const tainted = dict[taintString + edString];

  // Vulnerable
  res.send('Answer: ' + eval(tainted));
})
// Example-58 end

// Example-60 start
app.get('/example-60', (req, res) => {
  const dict = {
    "tainted": req.query.input,
    "untainted": 0
  }

  const taintString = "taint";
  const unString = "un";
  const edString = "ed"

  const untainted = dict[unString + taintString + edString];

  // Non-vulnerable
  res.send('Answer: ' + eval(untainted));
})
// Example-60 end

// Example-62 start
app.get('/example-62', (req, res) => {
  let obj = {
    value: NaN,
    getValue: function() {
      return this.value;
    }
  }

  let taintedObj = {
    value: req.query.input
  }

  const taintedFun = obj.getValue.bind(taintedObj);
  const tainted = taintedFun();

  // Vulnerable
  res.send('Answer: ' + eval(tainted));
})
// Example-62 end

// Example-64 start
app.get('/example-64', (req, res) => {
  let obj = {
    value: NaN,
    getValue: function() {
      return this.value;
    }
  }

  let untaintedObj = {
    value: 0
  }

  const untaintedFun = obj.getValue.bind(untaintedObj);
  const untainted = untaintedFun();

  // Non-vulnerable
  res.send('Answer: ' + eval(untainted));
})
// Example-64 end

// Example-66 start
app.get('/example-66', (req, res) => {
  try {
    const error = new Error(req.query.input);
    error.code = 1;
    throw error;
  }
  catch (e) {
    // Vulnerable
    res.send('Answer: ' + eval(e.message));
  }
})
// Example-66 end

// Example-68 start
app.get('/example-68', (req, res) => {
  try {
    const error = new Error(req.query.input);
    error.code = 0;
    throw error;
  }
  catch (e) {
    // Non-vulnerable
    res.send('Answer: ' + eval(e.code));
  }
})
// Example-68 end

// Example-70 start
function CustomException(message, code) {
  const error = new Error(message);
  error.code = code;
  return error;
}

CustomException.prototype = Object.create(Error.prototype);

app.get('/example-70', (req, res) => {
  try {
    throw new CustomException(req.query.input, 1);
  }
  catch (e) {
    // Vulnerable
    res.send('Answer: ' + eval(e.message));
  }
})
// Example-70 end

// Example-72 start
app.get('/example-72', (req, res) => {
  try {
    throw new CustomException(req.query.input, 0);
  }
  catch (e) {
    // Non-vulnerable
    res.send('Answer: ' + eval(e.code));
  }
})
// Example-72 end

// Example-74 start
function throwException(message, code) {
  const error = new Error(message);
  error.code = code;
  throw error;
}

app.get('/example-74', (req, res) => {
  try {
    throwException(req.query.input, 1);
  }
  catch (e) {
    // Vulnerable
    res.send('Answer: ' + eval(e.message));
  }
})
// Example-74 end

// Example-76 start
app.get('/example-76', (req, res) => {
  try {
    throwException(req.query.input, 0);
  }
  catch (e) {
    // Non-vulnerable
    res.send('Answer: ' + eval(e.code));
  }
})
// Example-76 end

// Example-78 start
const dictWrapper = dict => {
  let internal = dict;
  return {
    get: () => internal["code"],
    set: s => internal["code"] = s
  };
}

app.get('/example-78', (req, res) => {
  const dict = { "code": req.query.input };

  const dictWrapper1 = dictWrapper(dict);
  const dictWrapper2 = dictWrapper(dict);

  // Vulnerable
  res.send('Answer: ' + eval(dictWrapper1.get()));
})
// Example-78 end

// Example-80 start
app.get('/example-80', (req, res) => {
  const dict = { "code": req.query.input };

  const dictWrapper1 = dictWrapper(dict);
  const dictWrapper2 = dictWrapper(dict);

  dictWrapper2.set(0);

  // Non-vulnerable
  res.send('Answer: ' + eval(dictWrapper1.get()));
})
// Example-80 end

// Example-82 start
app.get('/example-82', (req, res) => {
  function factory() {
    var state = 0;
    return {
      getter() {
        return state;
      },
      setter(s) {
        state = s;
      }
    };
  }

  var inst = factory();
  inst.setter(req.query.input);

  // Vulnerable
  res.send('Answer: ' + eval(inst.getter()));
})
// Example-82 end

// Example-84 start
app.get('/example-84', (req, res) => {
  function factory() {
    var state = 0;
    return {
      getter() {
        return state;
      },
      setter(s) {
        state = s;
      }
    };
  }

  var inst = factory();
  inst.setter(req.query.input);
  inst.setter(0);

  // Non-vulnerable
  res.send('Answer: ' + eval(inst.getter()));
})
// Example-84 end

// Example-86 start
app.get('/example-86', (req, res) => {
  function C(v) {
    this.v = v;
  }

  function getV() {
    return this.v;
  }

  C.prototype.getV = getV;

  var inst = new C(req.query.input);

  // Vulnerable
  res.send('Answer: ' + eval(inst.getV()));
})
// Example-86 end

// Example-88 start
app.get('/example-88', (req, res) => {
  function C(v) {
    this.v = v;
  }

  function getV() {
    return this.v;
  }

  function setV(v) {
    this.v = v;
  }

  C.prototype.getV = getV;
  C.prototype.setV = setV;

  var inst = new C(req.query.input);
  inst.setV(0);

  // Non-vulnerable
  res.send('Answer: ' + eval(inst.getV()));
})
// Example-88 end

// Example-90 start
app.get('/example-90', (req, res) => {
  var tainted = req.query.input;
  var obj1 = {
    a() { return tainted; },
    b() { return this.a(); }
  }
  var obj2 = {
    a() { return 0; }
  }

  obj2.b = obj1.b;

  // Vulnerable
  res.send('Answer: ' + eval(obj1.b()));
})
// Example-90 end

// Example-92 start
app.get('/example-92', (req, res) => {
  var tainted = req.query.input;
  var obj1 = {
    a() { return tainted; },
    b() { return this.a(); }
  }
  var obj2 = {
    a() { return 0; }
  }

  obj2.b = obj1.b;

  // Vulnerable
  res.send('Answer: ' + eval(obj2.b()));
})
// Example-92 end

// Example-94 start
app.get('/example-94', (req, res) => {
  function createModule() {
    m = { dangerousOperation() { return req.query.input; }}
  }

  createModule();

  // Vulnerable
  res.send('Answer: ' + eval(m.dangerousOperation()));
})
// Example-94 end

// Example-96 start
app.get('/example-96', (req, res) => {
  function createModule() {
    m = { dangerousOperation() { return req.query.input; }}
  }

  function rewriteModule() {
    m = { dangerousOperation() { return 0; }}
  }

  createModule();
  rewriteModule();

  // Non-vulnerable
  res.send('Answer: ' + eval(m.dangerousOperation()));
})
// Example-96 end

// Example-98 start
app.get('/example-98', (req, res) => {
  function f() {
    this.m = { dangerousOperation() { return req.query.input; }}
  }

  f();

  // Vulnerable
  res.send('Answer: ' + eval(m.dangerousOperation()));
})
// Example-98 end

// Example-100 start
app.get('/example-100', (req, res) => {
  function f() {
    this.m = { dangerousOperation() { return req.query.input; }}
  }

  function g() {
    this.m = { dangerousOperation() { return 0; }}
  }

  f();
  g();

  // Non-vulnerable
  res.send('Answer: ' + eval(m.dangerousOperation()));
})
// Example-100 end

// Example-102 start
app.get('/example-102', (req, res) => {
  function registerCallback(cb) {
    cb(req.query.input);
  }

  function myCallback(msg) {
    // Vulnerable
    res.send('Answer: ' + eval(msg));
  }

  registerCallback(myCallback);
})
// Example-102 end

// Example-104 start
app.get('/example-104', (req, res) => {
  function registerCallback(cb) {
    cb(req.query.input);
  }

  function myCallback(msg) {
    // Non-vulnerable
    res.send('Answer: ' + eval(0));
  }

  registerCallback(myCallback);
})
// Example-104 end

// Example-106 start
app.get('/example-106', (req, res) => {
  function f(x) {
    var snk = x => res.send('Answer: ' + eval(x));
    function g(y) {
      // Vulnerable
      snk(y);
    }
    g(x);
  }

  f(req.query.input);
})
// Example-106 end

// Example-108 start
app.get('/example-108', (req, res) => {
  function f(x) {
    // Non-vulnerable
    var snk = x => res.send('Answer: ' + eval(x));
    function g(y) {
      snk(y);
    }
    g(0);
  }

  f(req.query.input);
})
// Example-108 end

// Example-110 start
app.get('/example-110', (req, res) => {
  function h(snk) {
    var s = snk;
    function n(t) {
      s(t);
    }
    return n;
  }

  // Vulnerable
  var c = h(x => res.send('Answer: ' + eval(x)));
  c(req.query.input);
})
// Example-110 end

// Example-112 start
app.get('/example-112', (req, res) => {
  function h(snk) {
    var s = snk;
    function n(t) {
      s(0);
    }
    return n;
  }

  // Non-vulnerable
  var c = h(x => res.send('Answer: ' + eval(x)));
  c(req.query.input);
})
// Example-112 end

// Example-114 start
app.get('/example-114', (req, res) => {
  function f() {
    var state = "";
    return ({
      get() {
        return state;
      },
      set(s) {
        state = s;
      }
    });
  }

  var obj = f();
  obj.set(req.query.input);

  // Vulnerable
  res.send('Answer: ' + eval(obj.get()));
})
// Example-114 end

// Example-116 start
app.get('/example-116', (req, res) => {
  function f() {
    var state = "";
    return ({
      get() {
        return state;
      },
      set(s) {
        state = 0;
      }
    });
  }

  var obj = f();
  obj.set(req.query.input);

  // Non-vulnerable
  res.send('Answer: ' + eval(obj.get()));
})
// Example-116 end

// Example-118 start
app.get('/example-118', (req, res) => {
  function c(objSnk) {
    var s = objSnk.snk;
    return function (t) {
      s(t);
    }
  }

  // Vulnerable
  var f = c({snk: function(x) { res.send('Answer: ' + eval(x)); }});
  f(req.query.input);
})
// Example-118 end

// Example-120 start
app.get('/example-120', (req, res) => {
  function c(objSnk) {
    var s = objSnk.snk;
    return function (t) {
      s(0);
    }
  }

  // Non-vulnerable
  var f = c({snk: function(x) { res.send('Answer: ' + eval(x)); }});
  f(req.query.input);
})
// Example-120 end

// Example-122 start
app.get('/example-122', (req, res) => {
  function c(snk) {
    return function (t) {
      snk(t);
    }
  }

  // Vulnerable
  var f = c(x => res.send('Answer: ' + eval(x)));
  f(req.query.input);
})
// Example-122 end

// Example-124 start
app.get('/example-124', (req, res) => {
  function c(snk) {
    return function (t) {
      snk(0);
    }
  }

  // Non-vulnerable
  var f = c(x => res.send('Answer: ' + eval(x)));
  f(req.query.input);
})
// Example-124 end

// Example-126 start
app.get('/example-126', (req, res) => {
  var tainted = req.query.input;
  function C() {
    this.p = "harmless";
    return { p: tainted };
  }

  var c = new C();

  // Vulnerable
  res.send('Answer: ' + eval(c.p));
})
// Example-126 end

// Example-128 start
app.get('/example-128', (req, res) => {
  var tainted = req.query.input;
  function C() {
    this.p = 0;
  }

  var c = new C();

  // Non-vulnerable
  res.send('Answer: ' + eval(c.p));
})
// Example-128 end

// Example-130 start
app.get('/example-130', (req, res) => {
  class Foo {
    constructor(aa) {
      this.a = aa;
    }
    bar() {
      return this.a;
    }
  }

  let foo = new Foo(req.query.input);

  // Vulnerable
  res.send('Answer: ' + eval(foo.bar()));
})
// Example-130 end

// Example-132 start
app.get('/example-132', (req, res) => {
  class Foo {
    constructor(aa) {
      this.a = aa;
    }
    bar() {
      return 0;
    }
  }

  let foo = new Foo(req.query.input);

  // Non-vulnerable
  res.send('Answer: ' + eval(foo.bar()));
})
// Example-132 end


// This starts the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log('Go to `http://localhost:3000/`.')
  console.log('Press CTRL+C to stop the server (restart with `node main.js`)')
})
