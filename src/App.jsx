import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import NoteList from './components/NoteList.jsx';
import Modal from './components/Modal.jsx';
import noNotesImage from './assets/no-notes.png';
import noNotesImageLight from './assets/no-notes-light.png';
import undo from './assets/turn-left.svg';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");
  const [editingNote, setEditingNote] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [deletedNote, setDeletedNote] = useState(null);
  const [undoTimer, setUndoTimer] = useState(0);

  useEffect(() => {
    if (!isInitialized) {
      const savedNotes = localStorage.getItem("notes");
      const savedDarkMode = localStorage.getItem("darkMode");

      console.log("Retrieved from localStorage:", { savedNotes, savedDarkMode });

      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
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
        const updatedNotes = notes.map(note =>
          note.id === editingNote ? { ...note, text: newNote.trim() } : note
        );
        setNotes(updatedNotes);
        setEditingNote(null);
      } else {
        const newNoteObj = {
          id: uuidv4(),
          text: newNote.trim(),
          completed: false,
        };
        setNotes([...notes, newNoteObj]);
      }
      setNewNote("");
      setIsModalOpen(false);
    }
  };

  const handleDeleteNote = (id) => {
    const noteToDelete = notes.find(note => note.id === id);
    const noteIndex = notes.findIndex(note => note.id === id);
    setDeletedNote({ note: noteToDelete, index: noteIndex });
    setNotes(notes.filter(note => note.id !== id));
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

  const handleEditNote = (id) => {
    const noteToEdit = notes.find(note => note.id === id);
    setNewNote(noteToEdit.text);
    setEditingNote(id);
    setIsModalOpen(true);
  };

  const handleToggleComplete = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, completed: !note.completed } : note
    ));
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
            filter={filter}
            darkMode={darkMode}
          />
        )}
      </div>
      {deletedNote && (
        <div className="undo-container">
          <button className="undo-button" onClick={handleUndoDelete}>
            ({undoTimer}) Undo <img src={undo} alt="Undo"/>
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