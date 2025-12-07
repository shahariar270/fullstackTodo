import { useState } from 'react'
import { useEffect } from 'react';
import { apiRoute, fetchApi } from './Ultis/helper';
import { Field, Form, Formik } from 'formik'

function App() {
  const handleOnSubmit =(values , {setSubmitting})=>{
    

  }



  useEffect(() => {
    fetchApi('todos')
  }, []);

  return (
    <>
      <h3>todo app</h3>
      <Formik
        initialValues={{
          title: '',
          description: '',
          isCompleted: false,
        }}
        onSubmit={handleOnSubmit}
      >
        <Form>
          <Field
            as='input'
            name='title'
            placeholder='enter title'
          />
        </Form>

      </Formik>

    </>
  )
}

export default App
