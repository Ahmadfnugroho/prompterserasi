import React from "react";

function Timer({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      <div className="timer-label">WAKTU SESI SAAT INI SELESAI DALAM:</div>
      <div className="time-display">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
}

export default Timer;
