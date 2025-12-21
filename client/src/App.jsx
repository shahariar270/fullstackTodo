import { useState } from 'react'
import { useEffect } from 'react';
import { initialValuesData } from './Ultis/helper';
import { Field, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux';
import { createTodos, fetchTodos, updateTodo } from './store/todos';
import TodoList from './HandleList';

function App() {
  const [edit, setEdit] = useState(null);
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
        <TodoList setEdit={setEdit} />
      </div>
    </div>
  );
}

export default App;
