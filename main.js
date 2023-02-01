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
// Example-08 end

// Example-09 start
// Example-09 end

// Example-10 start
// Example-10 end

// Example-11 start
// Example-11 end

// Example-12 start
// Example-12 end

// Example-13 start
// Example-13 end

// Example-14 start
// Example-14 end

// Example-15 start
// Example-15 end

// Example-16 start
// Example-16 end

// Example-17 start
// Example-17 end

// Example-18 start
// Example-18 end

// Example-19 start
// Example-19 end

// Example-20 start
// Example-20 end

// Example-21 start
// Example-21 end

// Example-22 start
// Example-22 end

// Example-23 start
// Example-23 end

// Example-24 start
// Example-24 end

// Example-25 start
// Example-25 end

// Example-26 start
// Example-26 end

// Example-27 start
// Example-27 end

// Example-28 start
// Example-28 end

// Example-29 start
// Example-29 end

// Example-30 start
// Example-30 end



// This starts the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log('Go to `http://localhost:3000/`.')
  console.log('Press CTRL+C to stop the server (restart with `node main.js`)')
})
