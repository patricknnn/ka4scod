let express = require('express');
let path = require('path');
let cors = require('cors');
const createError = require('http-errors');

// Routes
const codRoute = require('./routes/cod.routes');

// App
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Static directory path
app.use(express.static(path.join(__dirname, 'dist/node-rest-api')));

// API routes
app.use('/api', codRoute);

// PORT
const port = process.env.PORT || 8000;

// Listen
app.listen(port, () => {
  console.log('Listening on port ' + port)
})

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Base Route
app.get('/', (req, res) => {
  res.send('invalid endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/node-rest-api/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});