import React, { useState } from "react";

function NotesModal({ notes, onSave, onClose }) {
  const [currentNotes, setCurrentNotes] = useState(notes);

  const handleSave = () => {
    onSave(currentNotes);
  };

  return (
    <div className="setup-form">
      <div className="setup-form-content" style={{ maxWidth: "600px" }}>
        <h2>Edit Floor Director Notes</h2>
        <textarea
          rows="10"
          value={currentNotes}
          onChange={(e) => setCurrentNotes(e.target.value)}
          style={{ width: "100%", fontFamily: "monospace", padding: "8px" }}
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
