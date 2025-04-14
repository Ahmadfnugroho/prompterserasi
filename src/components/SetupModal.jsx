import React, { useState } from "react";
import EventItem from "./EventItem";

function SetupModal({ title, events, initialNotes, onSave, onClose }) {
  const [eventItems, setEventItems] = useState([...events]);
  const [notes, setNotes] = useState(initialNotes);
  const [localTitle, setLocalTitle] = useState(title);
  const [showBulkEditor, setShowBulkEditor] = useState(false);
  const [bulkText, setBulkText] = useState("");

  const handleNameChange = (index, newName) => {
    const updated = [...eventItems];
    updated[index].name = newName;
    setEventItems(updated);
  };

  const handleDurationChange = (index, newDuration) => {
    const updated = [...eventItems];
    updated[index].duration = newDuration;
    setEventItems(updated);
  };

  const handleRemove = (index) => {
    const updated = [...eventItems];
    updated.splice(index, 1);
    setEventItems(updated);
  };

  const handleAdd = () => {
    setEventItems([...eventItems, { name: "", duration: 1 }]);
  };

  const handleBulkImport = () => {
    const parsedItems = bulkText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.includes("="))
      .map((line) => {
        const [name, durationStr] = line.split("=");
        return {
          name: name.trim(),
          duration: parseInt(durationStr.trim(), 10) || 1,
        };
      });

    if (parsedItems.length > 0) {
      setEventItems(parsedItems);
      setShowBulkEditor(false);
      setBulkText("");
    }
  };

  const handleSave = () => {
    const validEvents = eventItems.filter((item) => item.name.trim() !== "");
    onSave(validEvents, notes.split("\n"), localTitle);
  };

  return (
    <div className="setup-form">
      <div className="setup-form-content">
        <h2>Event Setup</h2>

        <div>
          <label htmlFor="eventTitle">Event Title:</label>
          <input
            id="eventTitle"
            type="text"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
          />
        </div>

        <p>Enter your event items in order (Name, Duration in minutes):</p>

        <div id="eventItems">
          {eventItems.map((item, index) => (
            <EventItem
              key={index}
              name={item.name}
              duration={item.duration}
              onNameChange={(value) => handleNameChange(index, value)}
              onDurationChange={(value) => handleDurationChange(index, value)}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </div>

        <div style={{ marginTop: "10px" }}>
          <button className="add-event" onClick={handleAdd}>
            Add Event
          </button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setShowBulkEditor(!showBulkEditor)}
          >
            {showBulkEditor ? "Close Editor" : "Import via Text Editor"}
          </button>
        </div>

        {showBulkEditor && (
          <div style={{ marginTop: "20px" }}>
            <p>
              Enter items as: <code>Name=Duration</code> per line
            </p>
            <textarea
              rows="6"
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Opening=5\nKeynote=30\nBreak=15`}
              style={{ width: "100%", fontFamily: "monospace", padding: "8px" }}
            />
            <div style={{ marginTop: "10px", textAlign: "right" }}>
              <button onClick={handleBulkImport}>Import</button>
            </div>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <label htmlFor="initialNotes">Initial Floor Director Notes:</label>
          <textarea
            id="initialNotes"
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button onClick={handleSave}>Save Setup</button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetupModal;
