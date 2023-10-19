import { useState, useEffect } from "react";

const App = () => {

  const [notes, setNotes] = useState(null);
  
  useEffect(()=> {
    fetch('http://localhost:3000/pomonotes')
    .then((res)=> res.json())
    .then((data)=> setNotes(data));
  });

  //iterates through the AJAX array and populates the data with its 
  //unique '_id', inherent from the database response
  return (
    <div className="Pomonotes">
      <h2>Pomonotes:</h2>
      {notes && notes.map(note => {
        return(
          <div key={note._id}>
            <h3>{note.title}</h3>
          </div>
        )
      })}

      <div>
        <h2>Create Pomonote</h2>
        <form>
          <input name="title"/>
          <textarea name="noteBody" />
          <button type="submit">Create noto!</button>
        </form>
      </div>
    </div>
  )
};

export default App;