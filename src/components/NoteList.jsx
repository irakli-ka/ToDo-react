import React from 'react';
import NoteItem from './NoteItem.jsx';

const NoteList = ({ notes, search, handleDeleteNote, handleEditNote, handleToggleComplete, completedNotes, filter, darkMode }) => {
  const filteredNotes = notes.filter((note, index) => {
    if (filter === "completed") {
      return completedNotes.includes(index);
    } else if (filter === "incomplete") {
      return !completedNotes.includes(index);
    }
    return true;
  });

  return (
    <ul className="notes-list">
      {filteredNotes
        .filter((note) => note.toLowerCase().includes(search.toLowerCase()))
        .map((note, filteredIndex) => {
          const originalIndex = notes.indexOf(note);
          return (
            <NoteItem
              key={originalIndex}
              note={note}
              index={originalIndex}
              handleDeleteNote={handleDeleteNote}
              handleEditNote={handleEditNote}
              handleToggleComplete={handleToggleComplete}
              completedNotes={completedNotes}
              darkMode={darkMode}
            />
          );
        })}
    </ul>
  );
};

export default NoteList;