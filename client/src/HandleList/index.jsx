import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { apiRoute } from "../Ultis/helper";
import { deleteTodo, updateTodo, cloneTodos } from "../store/todos";

const TodoList = ({ setEdit }) => {
    const dispatch = useDispatch();
    const { todos } = useSelector((state) => state.todo);

    if (!todos) return null;

    return (
        <ul className="list">
            {todos.length === 0 ? (
                <span>you have no todo complete</span>
            ) : (
                todos.map((item) => (
                    <li key={item.id} className="list-item">
                        <label className="left">
                            <input
                                type="checkbox"
                                checked={item.isComplete}
                                onChange={(e) => {
                                    dispatch(
                                        updateTodo({
                                            id: item.id,
                                            formData: {
                                                ...item,
                                                isComplete: e.target.checked,
                                            },
                                        })
                                    );
                                }}
                            />
                            <span className={item.isComplete ? "done" : ""}>
                                {item.title}
                            </span>
                        </label>

                        <div className="right">
                            <input
                                type="date"
                                defaultValue={
                                    item.targetDate
                                        ? item.targetDate.slice(0, 10)
                                        : ""
                                }
                                onChange={(e) => {
                                    axios.put(`${apiRoute}/todos/${item.id}`, {
                                        ...item,
                                        targetDate: e.target.value,
                                    });
                                }}
                            />

                            <button
                                className="btn edit"
                                onClick={() => setEdit(item)}
                            >
                                Edit
                            </button>

                            <button
                                className="btn delete"
                                onClick={() => dispatch(deleteTodo(item.id))}
                            >
                                Delete
                            </button>

                            <button
                                className="btn"
                                onClick={() => dispatch(cloneTodos(item.id))}
                            >
                                Duplicate
                            </button>
                        </div>
                    </li>
                ))
            )}
        </ul>
    );
};

export default TodoList;
