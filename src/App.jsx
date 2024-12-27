import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import NoteList from './components/NoteList.jsx';
import Modal from './components/Modal.jsx';
import noNotesImage from './assets/no-notes.png';
import noNotesImageLight from './assets/no-notes-light.png';
import undo from './assets/turn-left.svg';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");
  const [editingNote, setEditingNote] = useState(null);
  const [completedNotes, setCompletedNotes] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [deletedNote, setDeletedNote] = useState(null);
  const [undoTimer, setUndoTimer] = useState(0);

  useEffect(() => {
    if (!isInitialized) {
      const savedNotes = localStorage.getItem("notes");
      const savedCompletedNotes = localStorage.getItem("completedNotes");
      const savedDarkMode = localStorage.getItem("darkMode");

      console.log("Retrieved from localStorage:", { savedNotes, savedCompletedNotes, savedDarkMode });

      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
      if (savedCompletedNotes) {
        setCompletedNotes(JSON.parse(savedCompletedNotes));
      }
      if (savedDarkMode) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);
  
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("completedNotes", JSON.stringify(completedNotes));
    }
  }, [completedNotes, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }
  }, [darkMode, isInitialized]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#232323" : "#ffffff";
    document.body.style.color = darkMode ? "#ffffff" : "#000000";
  }, [darkMode]);

  const handleAddNote = () => {
    if (newNote.trim()) {
      if (editingNote !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editingNote] = newNote.trim();
        setNotes(updatedNotes);
        setEditingNote(null);
      } else {
        setNotes([...notes, newNote.trim()]);
      }
      setNewNote("");
      setIsModalOpen(false);
    }
  };

  const handleDeleteNote = (index) => {
    const noteToDelete = notes[index];
    setDeletedNote({ note: noteToDelete, index });
    setNotes(notes.filter((_, i) => i !== index));
    setUndoTimer(5);

    const countdown = setInterval(() => {
      setUndoTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setDeletedNote(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleUndoDelete = () => {
    if (deletedNote) {
      const updatedNotes = [...notes];
      updatedNotes.splice(deletedNote.index, 0, deletedNote.note);
      setNotes(updatedNotes);
      setDeletedNote(null);
      setUndoTimer(0);
    }
  };

  const handleEditNote = (index) => {
    setNewNote(notes[index]);
    setEditingNote(index);
    setIsModalOpen(true);
  };

  const handleToggleComplete = (index) => {
    setCompletedNotes((prev) => {
      const newCompletedNotes = [...prev];
      if (newCompletedNotes.includes(index)) {
        return newCompletedNotes.filter((i) => i !== index);
      } else {
        newCompletedNotes.push(index);
        return newCompletedNotes;
      }
    });
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <div className="search-bar-container">
        <SearchBar
          search={search}
          setSearch={setSearch}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          filter={filter}
          setFilter={setFilter}
        />
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          +
        </button>
      </div>
      <div className="main-content">
        {notes.length === 0 ? (
          <div className="no-notes">
            <img src={darkMode ? noNotesImage : noNotesImageLight} alt="No notes" className="no-notes-image" />
            <p className={darkMode ? "empty-dark" : "empty-light"}>Empty...</p>
          </div>
        ) : (
          <NoteList
            notes={notes}
            search={search}
            handleDeleteNote={handleDeleteNote}
            handleEditNote={handleEditNote}
            handleToggleComplete={handleToggleComplete}
            completedNotes={completedNotes}
            filter={filter}
            darkMode={darkMode}
          />
        )}
      </div>
      {deletedNote && (
        <div className="undo-container">
          <button className="undo-button" onClick={handleUndoDelete}>
          ({undoTimer}) Undo    <img src={undo}/>
          </button>
        </div>
      )}
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        newNote={newNote}
        setNewNote={setNewNote}
        handleAddNote={handleAddNote}
        darkMode={darkMode}
        editingNote={editingNote}
        setEditingNote={setEditingNote}
      />
    </div>
  );
}

export default App;