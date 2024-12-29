import React from 'react';
import NoteItem from './NoteItem.jsx';

const NoteList = ({ notes, search, handleDeleteNote, handleEditNote, handleToggleComplete, filter, darkMode }) => {
  const filteredNotes = notes.filter((note) => {
    if (filter === "completed") {
      return note.completed;
    } else if (filter === "incomplete") {
      return !note.completed;
    }
    return true;
  });

  return (
    <ul className="notes-list">
      {filteredNotes
        .filter((note) => note.text.toLowerCase().includes(search.toLowerCase()))
        .map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            handleDeleteNote={handleDeleteNote}
            handleEditNote={handleEditNote}
            handleToggleComplete={handleToggleComplete}
            darkMode={darkMode}
          />
        ))}
    </ul>
  );
};

export default NoteList;