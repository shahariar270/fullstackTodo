import { useState } from 'react'
import { useEffect } from 'react';
import { apiRoute, fetchApi, initialValuesData } from './Ultis/helper';
import { Field, Form, Formik } from 'formik'
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);

  const loadData = async () => {
    const res = await fetchApi('todos');
    setData(res.data);
  };

  const handleOnSubmit = async (values, { resetForm }) => {
    if (edit?.id) {
      await axios.put(`${apiRoute}/todos/${edit.id}`, values);
      setEdit(null);
    } else {
      await axios.post(`${apiRoute}/todos`, values);
    }

    await loadData();
    resetForm();
  };

  const deleteHandle = async (id) => {
    await axios.delete(`${apiRoute}/todos/${id}`);
    await loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

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
          <ul className="list">
            {data.map((item) => (
              <li key={item.id} className="list-item">
                <label className="left">
                  <input
                    type="checkbox"
                    checked={item.isComplete}
                    onChange={async (e) => {
                      await axios.put(`${apiRoute}/todos/${item.id}`, {
                        ...item,
                        isComplete: e.target.checked,
                      });
                      loadData();
                    }}
                  />
                  <span className={item.isComplete ? "done" : ""}>
                    {item.title}
                  </span>
                </label>

                <div className="right">
                  <button className="btn edit" onClick={() => setEdit(item)}>
                    Edit
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => deleteHandle(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
  }

  export default App;
