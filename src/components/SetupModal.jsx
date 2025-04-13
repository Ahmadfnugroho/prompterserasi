import React, { useState } from "react";
import EventItem from "./EventItem";

function SetupModal({ title, events, initialNotes, onSave, onClose }) {
  const [eventItems, setEventItems] = useState([...events]);
  const [notes, setNotes] = useState(initialNotes);
  const [localTitle, setLocalTitle] = useState(title);

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

        <button className="add-event" onClick={handleAdd}>
          Add Event
        </button>

        <div>
          <label htmlFor="initialNotes">Initial Floor Director Notes:</label>
          <textarea
            id="initialNotes"
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button onClick={handleSave}>Save Setup</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default SetupModal;
