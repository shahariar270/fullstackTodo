import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { apiRoute } from "../Ultis/helper";
import { deleteTodo, updateTodo, cloneTodos, fetchTodos } from "../store/todos";
import { Tab } from "../component/Tab";
import { useEffect, useState } from "react";
import { showNotification } from "../store/Notifications";

const TodoList = ({ setEdit, loading }) => {
    const dispatch = useDispatch();
    const { todos } = useSelector((state) => state.todo);
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);


    if (!todos) return null;

    const filteredTodos = todos.filter(todo => {
        if (activeTab === "active") return !todo.isComplete;
        if (activeTab === "completed") return todo.isComplete;
        return true;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentTodos = filteredTodos.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

    return (
        <>
            <Tab
                active={activeTab}
                onChange={setActiveTab}
                tabs={[
                    { title: 'All', key: 'all' },
                    { title: 'Active', key: 'active' },
                    { title: 'Completed', key: 'completed' },
                ]}
            />
            {loading ? <div>Loading...</div> :
                (
                    <ul className="list">
                        {filteredTodos.length === 0 ? (
                            <span>you have no todo complete</span>
                        ) : (
                            currentTodos.map((item) => (
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
                                            onClick={() => {
                                                dispatch(deleteTodo(item.id)).then(()=>{
                                                    dispatch(showNotification({
                                                        type:'info',
                                                        message: 'Todo Delete successfully'
                                                    }))
                                                })
                                            }}
                                        >
                                            Delete
                                        </button>

                                        <button
                                            className="btn"
                                            onClick={() => {
                                                dispatch(cloneTodos(item.id)).then(()=>{
                                                    dispatch(showNotification({
                                                        type:'info',
                                                        message: 'Todo clone successfully',
                                                        duration: 6000
                                                    }))
                                                })
                                            }}
                                        >
                                            Duplicate
                                        </button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={currentPage === index + 1 ? "active" : ""}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

        </>
    );
};

export default TodoList;
