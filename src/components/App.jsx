import { useState, useEffect } from "react";

const App = () => {
  
  useEffect(()=> {
    fetch('http://localhost:3000/pomonotes')
    .then((res)=> res.json())
    .then((data)=> console.log(data))
  })

  const [notes, setNotes] = useState('Loading notes...');


  return (
    <div>Hello World!</div>
  )
};

export default App;