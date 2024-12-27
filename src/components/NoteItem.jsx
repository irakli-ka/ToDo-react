import React from 'react';
import editIcon from "../assets/pencil.svg";
import trashIcon from "../assets/trash.svg";

const NoteItem = ({ note, index, handleDeleteNote, handleEditNote, handleToggleComplete, completedNotes, darkMode }) => (
  <li className={darkMode ? "note-item dark" : "note-item light"}>
    <input
      type="checkbox"
      className="note-checkbox"
      onChange={() => handleToggleComplete(index)}
      checked={completedNotes.includes(index)}
    />
    <span className="note-text">{note}</span>
    <div className="button-container">
      <button className='edit-btn' onClick={() => handleEditNote(index)}>
        <img src={editIcon} alt="Edit" className="svg-icon edit" />
      </button>
      <button className='delete-btn' onClick={() => handleDeleteNote(index)}>
        <img src={trashIcon} alt="Delete" className="svg-icon delete" />
      </button>
    </div>
  </li>
);

export default NoteItem;