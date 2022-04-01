var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Welcome to index home page');
});
router.get('/students', function (req, res, next) {
  let students = ['nani', 'balu', 'hitha'];
  res.json(students);
});
router.get('/student', function (req, res, next) {
  let nanOb = { name: 'Purusotham', city: 'Hyderabad' };
  res.json(nanOb);
});
router.get('/fibonacci', function (req, res, next) {
  let fib = [0, 1];
  let data = [];
  data.push(fib[0]);
  data.push(fib[1]);
  for (let i = 2; i < 10; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
    data.push(fib[i]);
  }
  res.json(data);
});
router.get('/fibonacci/:min/:max', function (req, res) {
  let minimum = parseInt(req.params.min);
  let maximum = parseInt(req.params.max);
  let i1 = 0,
    i2 = 1,
    i3 = 1;
  let data = [];
  while (i1 <= maximum) {
    if (i1 >= minimum) {
      data.push(i1);
    }
    i1 = i2;
    i2 = i3;
    i3 = i1 + i2;
  }
  res.json(data);
});
module.exports = router;
