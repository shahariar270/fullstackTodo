import { useState } from 'react'
import { useEffect } from 'react';
import { initialValuesData } from './Ultis/helper';
import { Field, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux';
import { createTodos, fetchTodos, updateTodo } from './store/todos';
import TodoList from './HandleList';
import { showNotification } from './store/Notifications';

function App() {
  const [edit, setEdit] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos()).then(() => {
      dispatch(showNotification({
        message: "Fetch Todo Successfully",
        type: "success",
        duration: 2000
      }))
    })

  }, [])

  const handleOnSubmit = (values, { resetForm }) => {
    setLoading(true);

    if (edit?.id) {
      dispatch(updateTodo({ id: edit?.id, formData: values }))
        .then(() => {
          setEdit(null);
          resetForm();
          dispatch(showNotification({
            message: "Update Todo Successfully",
            type: "success",
            duration: 2000
          }))
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
          dispatch(showNotification({
            message: "Create Todo Successfully",
            type: "success",
            duration: 2000
          }))
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
        <TodoList setEdit={setEdit} loading={loading} />
      </div>
    </div>
  );
}

export default App;
