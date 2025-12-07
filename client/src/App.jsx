import { useState } from 'react'
import { useEffect } from 'react';
import { apiRoute, fetchApi, initialValuesData } from './Ultis/helper';
import { Field, Form, Formik } from 'formik'
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null)
  const handleOnSubmit = (values, { setSubmitting }) => {
    if (edit?.id) {
      axios.put(`${apiRoute}/todos/${edit?.id}`, values)
      setEdit(null)
    } else {
      axios.post(`${apiRoute}/todos`, values).then(() => { }).finally()
    }

  }

  useEffect(() => {
    fetchApi('todos').then((res) => {
      setData(res.data)
    })
  }, []);

  return (
    <>
      <h3>todo app</h3>
      <Formik
        initialValues={initialValuesData(edit)}
        onSubmit={handleOnSubmit}
      >
        <Form>
          <Field
            as='input'
            name='title'
            placeholder='enter title'
          />
          <button type='submit'>submit</button>
        </Form>

      </Formik>
      <ul>
        {data.map((item, i) => (
          <li
            key={i}
          >
            {item.title}
            <button onClick={() => {
              setEdit(item)
            }} >edit</button>
          </li>
        ))}
      </ul>

    </>
  )
}

export default App
