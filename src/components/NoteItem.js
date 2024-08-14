import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h5 className="card-title">{note.title}</h5>
            {/* this function used to delete note */}
            <i className="fa-solid fa-trash-can mx-4" onClick={() => { deleteNote(note._id); }} ></i>
            {/* //props.showAlert('Note Updated Successfully', 'success'); */}
            {/* this function used to edit note */}
            <i className="fa-solid fa-pen-to-square mx-4" onClick={() => { updateNote(note) }}></i>
          </div>
          <p className="card-text">{note.description}</p>


        </div>
      </div>
    </div>
  )
}

export default NoteItem
