import React, { useState, useEffect } from "react";
import ControlPanel from "./components/ControlPanel";
import FloorNotes from "./components/FloorNotes";
import Timer from "./components/Timer";
import SetupModal from "./components/SetupModal";
import NotesModal from "./components/NotesModal";
import "./styles.css";

function App() {
  const [events, setEvents] = useState([
    { name: "MENYAPA SELURUH AUDIENS (ZOOM, YOUTUBE, DAN NOBAR)", duration: 5 },
    { name: "MODERATOR PERKENALKAN DIRI", duration: 5 },
  ]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [floorNotes, setFloorNotes] = useState([
    "- Pastikan semua peserta Zoom bisa mendengar",
    "- Cek koneksi YouTube live",
    "- Siapkan moderator berikutnya",
  ]);
  const [showSetup, setShowSetup] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [eventTitle, setEventTitle] = useState("SERASI 2025 EPISODE 3");

  // Initialize display
  useEffect(() => {
    if (events.length > 0) {
      setTimeLeft(events[currentEventIndex].duration * 60);
    }
  }, [events, currentEventIndex]);

  // Timer logic
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      nextEvent();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const nextEvent = () => {
    if (currentEventIndex < events.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
      setTimeLeft(events[currentEventIndex + 1].duration * 60);
      if (isRunning) {
        startTimer();
      }
    } else {
      setIsRunning(false);
    }
  };

  const handleSaveSetup = (newEvents, newNotes) => {
    setEvents(newEvents);
    setFloorNotes(newNotes);
    setCurrentEventIndex(0);
    setTimeLeft(newEvents[0]?.duration * 60 || 0);
    setIsRunning(false);
    setShowSetup(false);
  };

  const handleSaveNotes = (newNotes) => {
    setFloorNotes(newNotes);
    setShowNotes(false);
  };

  return (
    <div className="container">
      <div className="header">SERASI 2025 EPISODE 3</div>

      <div className="playing-now">
        <div className="playing-now-label">PLAYING NOW</div>
        <div className="playing-now-content">
          {events[currentEventIndex]?.name || "==OPENING=="}
        </div>
      </div>

      <div className="next-up">
        <div className="next-up-label">NEXT UP</div>
        <div className="next-up-content">
          {currentEventIndex < events.length - 1
            ? events[currentEventIndex + 1]?.name
            : "END OF EVENT"}
        </div>
      </div>

      <div className="bottom-row">
        <FloorNotes notes={floorNotes} />
        <Timer timeLeft={timeLeft} />
      </div>

      <ControlPanel
        isRunning={isRunning}
        onStart={startTimer}
        onPause={pauseTimer}
        onNext={nextEvent}
        onSetup={() => setShowSetup(true)}
        onEditNotes={() => setShowNotes(true)}
        hasNext={currentEventIndex < events.length - 1}
      />

      {showSetup && (
        <SetupModal
          title={eventTitle}
          events={events}
          initialNotes={floorNotes.join("\n")}
          onSave={(newEvents, newNotes, newTitle) => {
            setEvents(newEvents);
            setFloorNotes(newNotes);
            setEventTitle(newTitle);
            setCurrentEventIndex(0);
            setTimeLeft(newEvents[0]?.duration * 60 || 0);
            setIsRunning(false);
            setShowSetup(false);
          }}
          onClose={() => setShowSetup(false)}
        />
      )}

      {showNotes && (
        <NotesModal
          notes={floorNotes.join("\n")}
          onSave={handleSaveNotes}
          onClose={() => setShowNotes(false)}
        />
      )}
    </div>
  );
}

export default App;
