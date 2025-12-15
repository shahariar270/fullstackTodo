import { useState } from 'react'
import { useEffect } from 'react';
import { apiRoute, fetchApi, initialValuesData } from './Ultis/helper';
import { Field, Form, Formik } from 'formik'
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    const res = await fetchApi('todos');
    setData(res.data);
  };

  const handleOnSubmit = async (values, { resetForm }) => {
    setLoading(true)
    try {
      if (edit?.id) {
        const res = await axios.put(`${apiRoute}/todos/${edit.id}`, values);
        setData((prev) =>
          prev.map((item) =>
            item.id === edit?.id ? res.data.data : item
          ))
        setEdit(null);
      } else {
        const res = await axios.post(`${apiRoute}/todos`, values);
        setData((prev) => [res.data.data, ...prev]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
      resetForm();
    }
  };

  const deleteHandle = async (id) => {
    setLoading(true);

    await axios.delete(`${apiRoute}/todos/${id}`);

    setData(prev => prev.filter(item => item.id !== id));

    setLoading(false);
  };

  const duplicateHandler = async(id) => {
    const res = await axios.post(`${apiRoute}/todos/${id}/clone`);
    setData((prev) =>
      prev.map((item) =>
        item.id === edit?.id ? res.data.data : item
      ))

  }

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
        {loading ? <span>loading...</span> :
          <ul className="list">
            {data?.length === 0 ? <span>you have no todo complete</span>
              :
              (data.map((item) => (
                <li key={item.id} className="list-item">
                  <label className="left">
                    <input
                      type="checkbox"
                      checked={item.isComplete}
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
                      onChange={async (e) => {
                        await axios.put(`${apiRoute}/todos/${item.id}`, {
                          ...item,
                          targetDate: e.target.value,
                        });
                        loadData();
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
