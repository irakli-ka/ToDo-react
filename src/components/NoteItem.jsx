import React from 'react';
import editIcon from "../assets/pencil.svg";
import trashIcon from "../assets/trash.svg";

const NoteItem = ({ note, handleDeleteNote, handleEditNote, handleToggleComplete, darkMode }) => (
  <li className={darkMode ? "note-item dark" : "note-item light"}>
    <input
      type="checkbox"
      className="note-checkbox"
      onChange={() => handleToggleComplete(note.id)}
      checked={note.completed}
    />
    <span className="note-text">{note.text}</span>
    <div className="button-container">
      <button className='edit-btn' onClick={() => handleEditNote(note.id)}>
        <img src={editIcon} alt="Edit" className="svg-icon edit" />
      </button>
      <button className='delete-btn' onClick={() => handleDeleteNote(note.id)}>
        <img src={trashIcon} alt="Delete" className="svg-icon delete" />
      </button>
    </div>
  </li>
);

export default NoteItem;