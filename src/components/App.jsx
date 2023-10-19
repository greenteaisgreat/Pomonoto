import { useState, useEffect } from "react";
import axios from 'axios';

const App = () => {

  const [notes, setNotes] = useState(null);

  //createForm.title & createForm.noteBody are the values in <form> further down
  const [createForm, setForm] = useState({
    title: '',
    noteBody: ''
  });

  //fetches note title and body from mongoDB
  useEffect(()=> {
    fetch('http://localhost:3000/pomonotes')
    .then((res)=> res.json())
    .then((data)=> setNotes(data));
    //very important to specify an empty array (no dependencies) if you don't 
    //want the request to constantly fire off!
  }, []);


  const updateForm = (e) => {
    //name is 'title' & 'noteBody' on <form> and value is the keystroke from createForm
    const {name, value} = e.target;
    console.log({name, value});
    setForm({
      //destructures the createForm object ({title: '', noteBody: ''})
      ...createForm,
      //array destructuring so that more than one character can be typed into the field 🤯
      //otherwise, it would just reassign the first character every time; adheres to the concept
      //of immutability or pure functional programming
      [name]: value
    });
  };

  const createPomonote = async (e) => {
    //prevents the page from reloading on submit btn
    e.preventDefault();

    const response = await axios.post('http://localhost:3000/pomonotes', createForm);
    console.log('create note res', response);

    //destructures the array so as to not change the original array; immutability
    setNotes([...notes, response.data]);

    setForm({title: '', noteBody: ''});
  }
  
  //iterates through the AJAX array and populates the data with its 
  //unique '_id', inherent from the database response
  return (
    <div className="Pomonotes">
      <h2>🍅Pomonotes:</h2>
      {notes && notes.map(note => {
        return(
          //whenever looping through values in React, each item must have a unique key (note._id)
          <div key={note._id}>
            <h3>{note.title}</h3>
          </div>
        )
      })}

      <div>
        <h2>Create a Pomonote!</h2>
        <form onSubmit={createPomonote}>
          <label>
            Give your note an optional title:
            <input value={createForm.title} onChange={updateForm} name="title" />
          </label>
          <label>
            Write your note:
            <textarea value={createForm.noteBody} onChange={updateForm} name="noteBody" />
          </label>
          <button type="submit">Create noto!<br />🍅</button>
        </form>
      </div>
    </div>
  )
};

export default App;