import React from "react";

function ControlPanel({
  isRunning,
  onStart,
  onPause,
  onNext,
  onPrevious, // New prop for previous functionality
  onSetup,
  onEditNotes,
  hasNext,
  hasPrevious, // New prop to control when previous is disabled
}) {
  return (
    <div className="control-panel">
      <button onClick={onSetup}>Setup</button>
      <button onClick={onStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={onPause} disabled={!isRunning}>
        Pause
      </button>
      <button onClick={onPrevious} disabled={!hasPrevious}>
        Previous Item
      </button>
      <button onClick={onNext} disabled={!hasNext}>
        Next Item
      </button>
      <button onClick={onEditNotes}>Edit Notes</button>
    </div>
  );
}

export default ControlPanel;
