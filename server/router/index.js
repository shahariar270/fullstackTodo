const express = require('express');
const Todos = require('../Data/index')
const { getTodos, createTodos, deleteTodos, updateTodo } = require('../control');
const router = express.Router();

router.post('/todos', createTodos);

router.get('/todos', getTodos)

router.delete('/todos/:id', deleteTodos);

router.put('/todos/:id', updateTodo)

router.post('/todos/:id/clone', async (req, res) => {
    const todoID = await Todos.findById(req.params.id).lean();
    if (!todoID) {
        return res.status(404).json({ message: "todo not found" });
    }

    delete todoID._id;
    todoID.title += " (copy)";

    const newProduct = await Todos.create(todoID);
    res.status(201).json(newProduct);
})

module.exports = router;
