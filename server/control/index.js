const Todos =require('../Data/index')

exports.getTodos =async (req, res) => {
   try {
    const data = await Todos.find();
    res.status(200).json({
        massage: 'data is fetch successfully',
        data:data
    })
   } catch (error) {
    console.log(error);
   }
}

exports.createTodos = (req, res) => {
    const newTodos = req.body;
    if (newTodos && newTodos.title) {
        todos = [newTodos, ...todos]
        const todoId = Date.new();

        res.status(201).json({
            message: 'Todo Created Sussesfully',
            data: {todoId , todoId},
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
