import { useState } from 'react'
import { useEffect } from 'react';
import { apiRoute, fetchApi } from './Ultis/helper';

function App() {
  


  useEffect(() => {
   fetchApi('todos')
  }, []);

  return (
    <>

    </>
  )
}

export default App
