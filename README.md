# What is Here?

Lots and lots of very bad code.

# Required Tools

  * `node`
  * `npm`

# How to Install & Run

## Using the `run.sh` script on Unixoid OSes

Just run `./run.sh`, it will

  * check that you have `node`, `npm` installed, 
  * download the dependencies,
  * start the server locally at port 3000
  * visit `http://localhost:3000/`

## Installing and Starting Manually

  * run `npm install` to download the dependencies
  * run `node main.js` to start the server
  * visit `http://localhost:3000/`

# Important Files

The example is supposed to be minimalistic, so there
are just two files:

  * `./main.js` contains the code of the server
  * `./public/index.html` contains a static page with a bunch of forms
    that send the inputs to the corresponding handlers.

# How to Add More Examples

  * If your name starts with a consonant, modify examples with even number.
  * If your name starts with a vocal, modify examples with odd number.

In the `main.js`, look at the handler for `example-01`.
It should look somewhat like this:

```
app.get('/example-01', (req, res) => {
  const tainted = req.query.input;
  res.send('Answer: ' + eval(tainted))
})
```

It registers a handler `example-01` that will answer GET-requests at
`http://localhost:3000/example-01`.

You obtain a tainted value by accessing `req.query.input` (this is a parameter
that you get directly from the user input).

An easy way to obtain a sink is by just using the evil `eval`.

This first example directly feeds the `tainted` value into the sink `eval`.

Now, in order to add a new example:

  * copy the snippet
  * modify the number
  * make the body of the handler somehow "more interesting", e.g. by
    introducing more syntactic constructs on the path between the source
    and the sink
  * uncomment the corresponding input form in `./public/index.html`,
    add a brief description of the example, explain what has to be fed
    into the form in order to trigger a vulnerability
  * stop the server (`Ctrl+C`)
  * restart the server (`./run.sh` or just `node main.js`)
  * try following your own instructions.
  * if successful: commit, proceed to next example (or stop).

# How to Add an Example: An Example

Let's assume that my name start with a vocal, so I'll use odd numbers.
The next free number is currently `3`, so I'll modify `example-03`.

  * Open `main.js`
  * Copy the snippet from `example-01` to `example-03`
    (retain the example start / end comments)
  * Modify the route from `/example-01` to `/example-03`
    in the copied snippet.
  * Make it "more interesting" (I'll try whether local `const`-variables work)

After the modifications, the code snippet looks like this:
```
app.get('/example-03', (req, res) => {
  const tainted = req.query.input;
  const intermediate = tainted;
  res.send('Answer: ' + eval(intermediate))
})
```

To make the testing a bit more pleasant, let's go to `./public/index.html`,
and activate the input form for `example-03`:

  * Edit `./public/index.html`
  * Uncomment `example-03` (remove `<!--` and `-->`)
  * Add a description and explain what to enter into the input field

Now, restart the server, and try it out:

  * `Ctrl+C` if an instance is already running
  * `run.sh` or `node main.js` to restart the server
  * In the browser, go to `http://localhost:3000/`, refresh if necessary
  * `Example 03` should now appear on landing page.
  * Enter `(console.log("PWNED"), secretFlag)`, submit
  * In the browser, the text of the "secret" flag should appear
  * In the console with the server instance, the message `PWNED` should appear

Stop the server with `Ctrl+C`. Commit the example.

# Contributing

All glory to Test Sevenhundredthirtytwowsky!

Set the name and email properly before committing:
```
git config user.email test-732-958@proton.me
git config user.name 'Test Sevenhundredthirtytwowsky!'
```

