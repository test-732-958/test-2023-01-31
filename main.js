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
  const a = []
  for (i = 0; i < 10; i++) {
    a.push(i);
  }

  a[42] = req.query.input;

  res.send('Answer: ' + eval(a[42]))
})
// Example-18 end

// Example-19 start
// Example-19 end

// Example-20 start
app.get('/example-20', (req, res) => {
  const a = []
  for (i = 0; i < 10; i++) {
    a.push(i);
  }

  a[42] = req.query.input;

  res.send('Answer: ' + eval(a[7]))
})
// Example-20 end

// Example-21 start
// Example-21 end

// Example-22 start
app.get('/example-22', (req, res) => {
  const a = []
  for (i = 0; i < 10; i++) {
    a.push(i);
    if (i == 7) {
      a[i] = req.query.input;
    }
  }

  res.send('Answer: ' + eval(a[7]))
})
// Example-22 end

// Example-23 start
// Example-23 end

// Example-24 start
app.get('/example-24', (req, res) => {
  const a = []
  for (i = 0; i < 10; i++) {
    a.push(i);
    if (i == 7) {
      a[i] = req.query.input;
    }
  }

  res.send('Answer: ' + eval(a[8]))
})
// Example-24 end

// Example-25 start
// Example-25 end

// Example-26 start
app.get('/example-26', (req, res) => {
  const f = x => x
  const tainted = f(req.query.input);

  res.send('Answer: ' + eval(tainted))
})
// Example-26 end

// Example-27 start
// Example-27 end

// Example-28 start
app.get('/example-28', (req, res) => {
  const f = x => { const y = x; return 0; }
  const untainted = f(req.query.input);

  res.send('Answer: ' + eval(untainted))
})
// Example-28 end

// Example-38 start
function lambdaSink(res, f, s) {
  res.send('Answer: ' + eval(f(s)))
}

app.get('/example-38', (req, res) => {
  const f = x => { const y = x; return 0; }
  const s = req.query.input;

  lambdaSink(res, f, s);
})
// Example-38 end

// Example-40 start
app.get('/example-40', (req, res) => {
  const f = x => x;
  const s = req.query.input;

  lambdaSink(res, f, s);
})
// Example-40 end

// Example-29 start
// Example-29 end

// Example-30 start
app.get('/example-30', (req, res) => {
  let tainted = req.query.input;

  {
    let tainted = "";
  }

  res.send('Answer: ' + eval(tainted))
})
// Example-30 end

// Example-32 start
app.get('/example-32', (req, res) => {
  let untainted = req.query.input;

  {
    untainted = "";
  }

  res.send('Answer: ' + eval(untainted))
})
// Example-32 end

// Example-34 start
class MaybeDangerous {
  constructor(dangerous) {
    this.dangerous = dangerous;
  }

  run(s, res) {
    this.sink(res, this.passthrough(s));
  }

  passthrough(s) {
    if (this.dangerous) {
      return s;
    }
    else {
      return "";
    }
  }

  sink(res, s) {
    res.send('Answer: ' + eval(s))
  }
}

app.get('/example-34', (req, res) => {
  const s = req.query.input;
  const reallyDangerous = new MaybeDangerous(true);
  reallyDangerous.run(s, res);
})
// Example-34 end

// Example-36 start
app.get('/example-36', (req, res) => {
  const s = req.query.input;
  const notDangerous = new MaybeDangerous(false);
  notDangerous.run(s, res);
})
// Example-36 end

// Example-42 start
class StaticMaybeDangerous {
  static run(dangerous, s, res) {
    StaticMaybeDangerous.sink(res, StaticMaybeDangerous.passthrough(dangerous, s));
  }

  static passthrough(dangerous, s) {
    if (dangerous) {
      return s;
    }
    else {
      return "";
    }
  }

  static sink(res, s) {
    res.send('Answer: ' + eval(s))
  }
}

app.get('/example-42', (req, res) => {
  const s = req.query.input;
  StaticMaybeDangerous.run(true, s, res);
})
// Example-42 end

// Example-44 start
app.get('/example-44', (req, res) => {
  const s = req.query.input;
  StaticMaybeDangerous.run(false, s, res);
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

// This starts the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log('Go to `http://localhost:3000/`.')
  console.log('Press CTRL+C to stop the server (restart with `node main.js`)')
})
