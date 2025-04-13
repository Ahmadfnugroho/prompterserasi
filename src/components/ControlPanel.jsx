import React from "react";

function ControlPanel({
  isRunning,
  onStart,
  onPause,
  onNext,
  onSetup,
  hasNext,
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
      <button onClick={onNext} disabled={!hasNext}>
        Next Item
      </button>
    </div>
  );
}

export default ControlPanel;
