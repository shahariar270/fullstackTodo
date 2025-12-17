import { useState } from 'react'
import { useEffect } from 'react';
import { apiRoute, fetchApi, initialValuesData } from './Ultis/helper';
import { Field, Form, Formik } from 'formik'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { cloneTodos, createTodos, deleteTodo, fetchTodos, updateTodo } from './store/todos';

function App() {
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const { todos } = useSelector(state => state.todo)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos())

  }, [])

  const handleOnSubmit = (values, { resetForm }) => {
    setLoading(true);

    if (edit?.id) {
      dispatch(updateTodo({ id: edit?.id, formData: values }))
        .then(() => {
          setEdit(null);
          resetForm();
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      dispatch(createTodos(values))
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          console.error("Error creating todo:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const deleteHandle = async (id) => {
    setLoading(true);
    dispatch(deleteTodo(id))
    setLoading(false);
  };

  const duplicateHandler = async (id) => {
    setLoading(true)
    dispatch(cloneTodos(id));
    setLoading(false)
  }

  return (
    <div className="todo-app">
      <h2 className="header">Todo Manager</h2>

      <div className="card form-card">
        <Formik
          enableReinitialize
          initialValues={initialValuesData(edit)}
          onSubmit={handleOnSubmit}
        >
          <Form className="form">
            <Field
              name="title"
              placeholder="What do you need to do?"
              className="input"
            />
            <button type="submit" className="btn primary">
              {edit ? "Update" : "Add"}
            </button>
          </Form>
        </Formik>
      </div>

      <div className="card list-card">
        {loading ? <span>loading...</span> :
          <ul className="list">
            {todos?.length === 0 ? <span>you have no todo complete</span>
              :
              (todos.map((item) => (
                <li key={item.id} className="list-item">
                  <label className="left">
                    {/* <input
                      type="checkbox"
                      checked={item?.isComplete}
                      onChange={async (e) => {
                        const checked = e.target.checked;

                        setData(prev =>
                          prev.map(todo =>
                            todo.id === item.id ? { ...todo, isComplete: checked } : todo
                          )
                        );

                        try {
                          await axios.put(`${apiRoute}/todos/${item.id}`, {
                            ...item,
                            isComplete: checked,
                          });
                        } finally {
                          setLoading(false);
                        }
                      }}
                    /> */}
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
                      onChange={async (e) => {
                        await axios.put(`${apiRoute}/todos/${item.id}`, {
                          ...item,
                          targetDate: e.target.value,
                        });
                      }}
                    />

                    <button className="btn edit" onClick={() => setEdit(item)}>
                      Edit
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => deleteHandle(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn"
                      onClick={() => duplicateHandler(item._id)}
                    >
                      Duplicate
                    </button>
                  </div>
                </li>
              )))
            }

          </ul>
        }
      </div>
    </div>
  );
}

export default App;
