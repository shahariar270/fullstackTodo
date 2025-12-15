const express = require('express');
const Todos = require('../Data/index')
const { getTodos, createTodos, deleteTodos, updateTodo, cloneTodo } = require('../control');
const router = express.Router();

router.post('/todos', createTodos);

router.get('/todos', getTodos)

router.delete('/todos/:id', deleteTodos);

router.put('/todos/:id', updateTodo)

router.post('/todos/:id/clone', cloneTodo);

module.exports = router;
