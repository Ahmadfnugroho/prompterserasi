import React from "react";

function EventItem({
  name,
  detail,
  duration,
  onNameChange,
  onDetailChange,
  onDurationChange,
  onRemove,
}) {
  return (
    <div className="event-item">
      <input
        type="text"
        className="event"
        placeholder="Event name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <input
        type="text"
        className="detail"
        placeholder="Event detail"
        value={detail}
        onChange={(e) => onDetailChange(e.target.value)}
      />
      <input
        type="number"
        className="time"
        placeholder="Minutes"
        value={duration}
        onChange={(e) => onDurationChange(parseInt(e.target.value) || 1)}
      />
      <button className="remove-btn" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}

export default EventItem;
