import React, { useState } from "react";
import EventItem from "./EventItem";

function SetupModal({ title, events, initialNotes, onSave, onClose }) {
  const [eventItems, setEventItems] = useState([...events]);
  const [notes, setNotes] = useState(initialNotes);
  const [localTitle, setLocalTitle] = useState(title);
  const [showTextEditor, setShowTextEditor] = useState(false);
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

  const handleSubEventsChange = (index, newSubEvents) => {
    const updated = [...eventItems];
    updated[index].subEvents = newSubEvents.split("\n").filter((s) => s.trim());
    setEventItems(updated);
  };

  const handleAdd = () => {
    setEventItems([
      ...eventItems,
      {
        name: "",
        duration: "",
        subEvents: ["Sub-event 1", "Sub-event 2"],
      },
    ]);
  };

  const handleRemove = (index) => {
    const updated = [...eventItems];
    updated.splice(index, 1);
    setEventItems(updated);
  };

  const handleBulkImport = () => {
    const lines = bulkText.split("\n").filter((line) => line.trim());
    const newEvents = [];

    let currentEvent = null;

    lines.forEach((line) => {
      // Event header format: "Event Name | Duration"
      if (line.includes("|")) {
        const [name, duration] = line.split("|").map((part) => part.trim());
        if (name) {
          currentEvent = {
            name,
            duration: parseInt(duration) || 5,
            subEvents: [],
          };
          newEvents.push(currentEvent);
        }
      }
      // Sub-event (starts with "-")
      else if (line.startsWith("-") && currentEvent) {
        currentEvent.subEvents.push(line.substring(1).trim());
      }
      // Regular line (add as sub-event)
      else if (currentEvent) {
        currentEvent.subEvents.push(line.trim());
      }
    });

    if (newEvents.length > 0) {
      setEventItems(newEvents);
      setShowTextEditor(false);
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
          <label>Event Title:</label>
          <input
            type="text"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
          />
        </div>

        <div style={{ margin: "15px 0", fontSize: "12px" }}>
          <button onClick={() => setShowTextEditor(!showTextEditor)}>
            {showTextEditor ? "Hide Text Editor" : "Import via Text Editor"}
          </button>
        </div>

        {showTextEditor && (
          <div style={{ marginBottom: "20px", fontSize: "12px" }}>
            <p>
              <strong>Format:</strong>
              <br />
              1. Event Name | Duration (in minutes)
              <br />
              2. Sub-events (one per line, optionally starting with "-")
              <br />
              3. Blank line between events
            </p>
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Opening | 5\n- Welcome guests\n- Introduce speakers\n\nSession 1 | 15\n- Presentation\n- Q&A`}
              style={{
                width: "100%",
                height: "200px",
                padding: "8px",
                fontSize: "12px",
              }}
            />
            <div style={{ marginTop: "10px", fontSize: "10px" }}>
              <button onClick={handleBulkImport}>Import Events</button>
              <button
                onClick={() => {
                  setShowTextEditor(false);
                  setBulkText("");
                }}
                style={{ marginLeft: "10px", fontSize: "10px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div id="eventItems" style={{ marginTop: "15px", fontSize: "12px" }}>
          {eventItems.map((item, index) => (
            <div key={index} className="event-item">
              <input
                type="text"
                placeholder="Event name"
                value={item.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
              />
              <input
                type="number"
                placeholder="Duration (minutes)"
                value={item.duration}
                onChange={(e) =>
                  handleDurationChange(index, parseInt(e.target.value) || 1)
                }
              />
              <textarea
                style={{ fontSize: "12px" }}
                placeholder="Sub-events (one per line)"
                value={item.subEvents.join("\n")}
                onChange={(e) => handleSubEventsChange(index, e.target.value)}
                rows={4}
              />
              <button onClick={() => handleRemove(index)}>Remove</button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "15px", fontSize: "10px" }}>
          <button onClick={handleAdd}>Add Event</button>
        </div>

        <div style={{ marginTop: "20px", fontSize: "12px" }}>
          <label>Floor Director Notes:</label>
          <textarea
            style={{ fontSize: "12px" }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetupModal;
