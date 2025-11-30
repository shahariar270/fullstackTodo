let todos = require("../Data")

exports.getTodos = (req, res) => {
    res.status(200).json({
        message: 'Get all todo Data',
        data: todos,
    })
}

exports.createTodos = (req, res) => {
    const newTodos = req.body;
    if (newTodos && newTodos.title) {
        todos = [newTodos, ...todos]

        res.status(201).json({
            message: 'Todo Created Sussesfully',
            data: todos,
        })
    } else {
        res.status(400).json({
            message: 'Todo Not Created'
        })
    }
}

exports.deleteTodos = (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.filter(item => item.id !== id);

    if (!todo) {
        return res.status(404).json({
            message: 'No route Found'
        })
    }
    res.status(200).json({
        message: 'Data Deleted Successfully',
    })
}

exports.updateTodo = (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;

    const index = todos.findIndex((todo) => todo.id === id);

    todos[index] = { id, ...data }

    res.status(200).json({
        message: "Todo fully updated!",
        data: todos
    });
}
