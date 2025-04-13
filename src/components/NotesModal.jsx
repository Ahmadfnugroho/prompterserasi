import React, { useState } from "react";

function NotesModal({ notes, onSave, onClose }) {
  const [currentNotes, setCurrentNotes] = useState(notes);

  const handleSave = () => {
    onSave(currentNotes.split("\n"));
  };

  return (
    <div className="setup-form">
      <div className="setup-form-content" style={{ maxWidth: "600px" }}>
        <h2>Edit Floor Director Notes</h2>
        <textarea
          id="notesTextarea"
          rows="10"
          value={currentNotes}
          onChange={(e) => setCurrentNotes(e.target.value)}
        />
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button onClick={handleSave}>Save Notes</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default NotesModal;
