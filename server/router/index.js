const express = require('express');
let todos = require('../Data');
const { getTodos, createTodos, deleteTodos, updateTodo } = require('../control');
const router = express.Router();

router.post('/todos', createTodos);

router.get('/todos', getTodos)

router.delete('/todos/:id', deleteTodos);

router.put('/todos/:id', updateTodo)

module.exports = router;
