const { body, validationResult } = require('express-validator');
const Todo = require('../models/todo');
function getTodos(req, res) {
  Todo.find((err, todos_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(todos_list);
    }
  });
}
const createTodo = [
  body('item')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('min should be 3 and max length to be 100')
    .escape()
    .withMessage(
      'Only alphabets and numbers allowed. No special characters allowed'
    ),
  body('status')
    .trim()
    .isLength({ min: 8, max: 10 })
    .withMessage('in range of 8 to 10 characters'),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      console.log(req.body);
      let { item, status } = req.body;
      let todoObject = new Todo({ item, status });
      todoObject.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json({ status: 'adding todo complete' });
        }
      });
      //todos.push({ item, status });
    }
  },
];
function deleteTodo(req, res) {
  Todo.findByIdAndDelete(req.params._id, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json(`todo with _id as ${req.params._id} is removed`);
    }
  });
  // console.log(req.params.indexToDelete);
  // let newTodos = todos.filter((val, index) => {
  //   if (index === parseInt(req.params.indexToDelete)) {
  //     console.log('Came in return false');
  //     return false;
  //   } else {
  //     return true;
  //   }
  // });
  // console.log(newTodos);
  // todos = newTodos;
  // todos.log(todos);
  // res.json({ status: 'successfully dleted' });
}
module.exports = { getTodos, createTodo, deleteTodo };
