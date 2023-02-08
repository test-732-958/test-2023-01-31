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
const evalMe = s => {
  let internal = s;
  return {
    get: () => internal,
    set: s => internal = s
  };
}

app.get('/example-46', (req, res) => {
  const s = req.query.input;
  const dangerous = evalMe(s);

  res.send('Answer: ' + eval(dangerous.get()))
})
// Example-46 end

// Example-48 start
app.get('/example-48', (req, res) => {
  const s = req.query.input;
  const notDangerous = evalMe(s);
  notDangerous.set(0);

  res.send('Answer: ' + eval(notDangerous.get()))
})
// Example-48 end

// Example-50 start
app.get('/example-50', (req, res) => {
  var dict = {
    "dangerous": req.query.input,
    "notDangerous": 0
  }

  res.send('Answer: ' + eval(dict["dangerous"]))
})
// Example-50 end

// Example-52 start
app.get('/example-52', (req, res) => {
  var dict = {
    "dangerous": req.query.input,
    "notDangerous": 0
  }

  res.send('Answer: ' + eval(dict["notDangerous"]))
})
// Example-52 end


// Example-54 start
app.get('/example-54', (req, res) => {
  a = req.query.input;

  function codeHoist() {
      var a = 0;
  }

  codeHoist();

  res.send('Answer: ' + eval(a))
})
// Example-54 end

// Example-56 start
app.get('/example-56', (req, res) => {
  a = req.query.input;

  function codeHoist() {
      a = 0;
  }

  codeHoist();

  res.send('Answer: ' + eval(a))
})
// Example-56 end

// Example-58 start
app.get('/example-58', (req, res) => {
  const dangerous = "dangerous";
  const not = "not";
  const field = "field";

  const notDangerousField = not + dangerous + field;
  const dangerousField = dangerous + field;

  var dict = {
    "dangerousfield": req.query.input,
    "notdangerousfield": 0
  }

  res.send('Answer: ' + eval(dict[dangerousField]))
})
// Example-58 end

// Example-60 start
app.get('/example-60', (req, res) => {
  const dangerous = "dangerous";
  const not = "not";
  const field = "field";

  const notDangerousField = not + dangerous + field;
  const dangerousField = dangerous + field;

  var dict = {
    "dangerousfield": req.query.input,
    "notdangerousfield": 0
  }

  res.send('Answer: ' + eval(dict[notDangerousField]))
})
// Example-60 end

// Example-62 start
app.get('/example-62', (req, res) => {
  let obj = {
    dangerous: req.query.input,
    notDangerous: 0,
    get: function () {
      return this.dangerous;
    },
  }

  const dangerous = 0;

  res.send('Answer: ' + eval(obj.get()))
})
// Example-62 end

// Example-64 start
app.get('/example-64', (req, res) => {
  let obj = {
    dangerous: req.query.input,
    notDangerous: 0,
    get: function () {
      return this.notDangerous;
    },
  }

  const dangerous = 0;

  res.send('Answer: ' + eval(obj.get()))
})
// Example-64 end

// Example-66 start
app.get('/example-66', (req, res) => {
  try {
    throw new Error(req.query.input);
  }
  catch (e) {
    res.send('Answer: ' + eval(e.message))
  }
})
// Example-66 end

// Example-68 start
app.get('/example-68', (req, res) => {
  try {
    throw new Error(req.query.input);
  }
  catch (e) {
    res.send('Answer: ' + eval(e.code))
  }
})
// Example-68 end

// Example-70 start
function CustomException(message) {
  const error = new Error(message);
  return error;
}

CustomException.prototype = Object.create(Error.prototype);

app.get('/example-70', (req, res) => {
  try {
    throw new CustomException(req.query.input);
  }
  catch (e) {
    res.send('Answer: ' + eval(e.message))
  }
})
// Example-70 end

// Example-72 start
app.get('/example-72', (req, res) => {
  try {
    throw new CustomException(req.query.input);
  }
  catch (e) {
    res.send('Answer: ' + eval(e.code))
  }
})
// Example-72 end

// Example-74 start
function throwException(req) {
  throw new Error(req.query.input);
}

app.get('/example-74', (req, res) => {
  try {
    throwException(req);
  }
  catch (e) {
    res.send('Answer: ' + eval(e.message))
  }
})
// Example-74 end

// Example-76 start
app.get('/example-76', (req, res) => {
  try {
    throwException(req);
  }
  catch (e) {
    res.send('Answer: ' + eval(e.code))
  }
})
// Example-76 end

// Example-78 start
const evalMeGet = s => {
  let internal = s;
  return {
    get: () => internal["code"]
  };
}

const evalMeSet = s => {
  let internal = { "code": s };
  return {
    set: s => internal["code"] = s
  };
}

app.get('/example-78', (req, res) => {
  const s = { "code": req.query.input };

  const a = evalMeGet(s);
  const b = evalMeSet(s);

  b.set(0);

  res.send('Answer: ' + eval(a.get()))
})
// Example-78 end

// Example-80 start
app.get('/example-80', (req, res) => {
  const s = { "code": 0 };

  const a = evalMeGet(s);
  const b = evalMeSet(s);

  b.set(req.query.input);

  res.send('Answer: ' + eval(a.get()))
})
// Example-80 end

// This starts the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log('Go to `http://localhost:3000/`.')
  console.log('Press CTRL+C to stop the server (restart with `node main.js`)')
})
