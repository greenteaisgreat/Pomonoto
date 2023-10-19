import { useState, useEffect } from "react";

const App = () => {

  const [notes, setNotes] = useState(null);
  
  useEffect(()=> {
    fetch('http://localhost:3000/pomonotes')
    .then((res)=> res.json())
    .then((data)=> setNotes(data));
  });

  return (
    <div className="noteBody">
      <h2>Pomonotes:</h2>
      {notes && notes.map(note => {
        return (
          <div> 
            <h3>{note.title}</h3>
            <h4>{note.noteBody}</h4>
          </div>
        )
      })}
    </div>
  )
};

export default App;