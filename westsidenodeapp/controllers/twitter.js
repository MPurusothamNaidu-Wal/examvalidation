const { body, validationResult } = require('express-validator');
let twitter = [
  {
    title: 'Kashmir Files',
    body: 'Film based on assassination of kashmiri pandits',
    date_of_creation: '202-02-21',
    author: 'Vivek Agnihotri',
    category: 'entertainment',
  },
];
function getTwitter(req, res) {
  res.json(twitter);
}
const createTwitter = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('Title must be minimum 5 characters to 50 characters')
    .isAlphanumeric()
    .withMessage(
      'Only alphabets and numbers are allowed. No special characters are allowed'
    ),
  body('body')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Body must be atleast 5 characters to atmost 200 characters')
    .escape(),
  body('author')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Author must be minimum 5 characters to 100 characters')
    .isAlphanumeric()
    .withMessage(
      'Only alphabets and numbers are allowed. No special characters are allowed'
    ),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      console.log(req.body);
      let { title, body, date_of_creation, author, category } = req.body;
      twitter.push({ title, body, date_of_creation, author, category });
      res.json({ status: 'adding tweet complete' });
    }
  },
];
function deleteTwitter(req, res) {
  console.log(req.params.indexToDelete);
  let newTwitter = twitter.filter((val, index) => {
    if (index === parseInt(req.params.indexToDelete)) {
      console.log('Came in return false');
      return false;
    } else {
      return true;
    }
  });
  console.log(newTwitter);
  twitter = newTwitter;
  res.json({ status: 'successfully deleted' });
}
function delAll(req,res) {
    twitter = [];
    res.send({ status: 'All product details are removed' });
}
module.exports = { getTwitter, createTwitter, deleteTwitter, delAll };
