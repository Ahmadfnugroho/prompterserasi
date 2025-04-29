import React, { useState } from "react";

function FloorNotes({ notes, onNotesChange }) {
  const [editableNotes, setEditableNotes] = useState(notes.join("\n"));
  const [fontSize, setFontSize] = useState(32); // default 16px

  const handleChange = (e) => {
    setEditableNotes(e.target.value);
    if (onNotesChange) {
      onNotesChange(e.target.value.split("\n"));
    }
  };

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 10, 70)); // batas atas 32px
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 10, 20)); // batas bawah 10px
  };

  return (
    <div className="notes">
      <div className="notes-label">CATATAN FLOOR DIRECTOR</div>
      <div style={{ marginBottom: "8px" }}>
        <button style={{ fontSize: "0.8rem" }} onClick={decreaseFontSize}>
          A-
        </button>
        <span style={{ margin: "0 8px", fontSize: "0.8rem" }}>
          {fontSize}px
        </span>
        <button style={{ fontSize: "0.8rem" }} onClick={increaseFontSize}>
          A+
        </button>
      </div>
      <div className="notes-content">
        <textarea
          rows="6"
          value={editableNotes}
          onChange={handleChange}
          style={{ fontSize: `${fontSize}px`, width: "100%" }}
        />
      </div>
    </div>
  );
}

export default FloorNotes;
