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


exports.deleteTodos = async (req, res) => {
    const id = req.params.id;
    const deleted = await Todos.findOneAndDelete({ id: id });

    if (!deleted) {
        return res.status(404).json({
            message: 'No route Found'
        })
    }
    res.status(200).json({
        message: 'Data Deleted Successfully',
    })
}

exports.updateTodo = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const updated = await Todos.findOneAndUpdate(
        { id: id },
        data,
        { new: true, runValidators: true }
    );


    res.status(200).json({
        message: "Todo fully updated!",
        data: updated
    });
};

exports.cloneTodo = async (req, res) => {
    try {
        const clonedId = req.params.id;
        const todo = await Todos.findOne({ id: clonedId }).lean();

        if (!todo) {
            return res.status(404).json({ message: "todo not found" });
        }

        delete todo._id;
        todo.title += " (copy)";

        const newid = Date.now().toString();
        const newTodo = await Todos.create({ id: newid, ...todo });
        res.status(201).json(newTodo);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

