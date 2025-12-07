const Todos = require('../Data/index')

exports.getTodos = async (req, res) => {
    try {
        const data = await Todos.find();
        res.status(200).json({
            massage: 'data is fetch successfully',
            data: data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.createTodos = async (req, res) => {
    try {
        const newTodos = req.body;
        const id = Date.now();

        if (!newTodos || !newTodos.title) {
            return res.status(400).json({ message: 'Todo Not Created' });
        }

        const created = await Todos.create({ id, ...newTodos });

        res.status(201).json({
            message: 'Todo Created Successfully',
            data: created
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
};


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
