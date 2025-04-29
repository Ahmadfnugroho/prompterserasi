import React from "react";

function Timer({ timeLeft }) {
  const minutes = Math.floor(Math.abs(timeLeft) / 60);
  const seconds = Math.abs(timeLeft) % 60;
  const isWarning = timeLeft <= 120 && timeLeft >= 0;
  const isOverdue = timeLeft < 0;

  return (
    <div className="timer">
      <div className="timer-label">
        {isOverdue ? "WAKTU BERLEBIH:" : "SISA WAKTU:"}
      </div>
      <div
        className={`time-display ${isWarning ? "warning" : ""} ${
          isOverdue ? "overdue" : ""
        }`}
      >
        {isOverdue ? "-" : ""}
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
}

export default Timer;
