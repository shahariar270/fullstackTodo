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
    <>
      <h3>todo app</h3>

      <Formik
        enableReinitialize
        initialValues={initialValuesData(edit)}
        onSubmit={handleOnSubmit}
      >
        <Form>
          <Field
            as="input"
            name="title"
            placeholder="enter title"
          />
          <button type="submit">submit</button>
        </Form>
      </Formik>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.title}

            <button onClick={() => setEdit(item)}>edit</button>

            <button onClick={() => deleteHandle(item.id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
