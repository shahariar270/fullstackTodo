import { useState } from 'react'
import { useEffect } from 'react';
import { apiRoute, fetchApi } from './Ultis/helper';

function App() {
  const [count, setMessage] = useState(null);
  const data = {
    id: Date.now(),
    date:"22 nov 2025",
    isComplete:false,
    title:"learn php"
  }


  useEffect(() => {
   fetchApi('todos')
  }, []);

  return (
    <>

    </>
  )
}

export default App
