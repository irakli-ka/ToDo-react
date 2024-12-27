import React from 'react';

const Modal = ({ isModalOpen, setIsModalOpen, newNote, setNewNote, handleAddNote, darkMode, editingNote, setEditingNote }) => {
  const handleClose = () => {
    setIsModalOpen(false);
    setNewNote("");
    setEditingNote(null);
  };

  return (
    isModalOpen && (
      <div className="modal">
        <div className={darkMode ? "modal-content dark" : "modal-content light"}>
          <h2>{editingNote !== null ? "EDIT NOTE" : "NEW NOTE"}</h2>
          <input
            type="text"
            placeholder="Input your note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className={darkMode ? "dark-input" : "light-input"}
          />
          <button className="modal-cancel-btn" onClick={handleClose}>CANCEL</button>
          <button className="modal-add-btn" onClick={handleAddNote}>{editingNote !== null ? "SAVE" : "APPLY"}</button>
        </div>
      </div>
    )
  );
};

export default Modal;