import { useState } from 'react'
import { useEffect } from 'react';
import { apiRoute } from './Ultis/helper';

function App() {
  const [count, setMessage] = useState(null);
  const data = {
    id: Date.now(),
    date:"22 nov 2025",
    isComplete:false,
    title:"learn php"
  }


  useEffect(() => {
    fetch(`${apiRoute}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }, []);

  return (
    <>

    </>
  )
}

export default App
