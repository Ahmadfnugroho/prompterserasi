import React, { useState, useEffect, useRef } from "react";
import ControlPanel from "./components/ControlPanel";
import FloorNotes from "./components/FloorNotes";
import Timer from "./components/Timer";
import SetupModal from "./components/SetupModal";
import NotesModal from "./components/NotesModal";
import "./styles.css";

function App() {
  const [events, setEvents] = useState([]);

  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentSubEventIndex, setCurrentSubEventIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [floorNotes, setFloorNotes] = useState([]);
  const [showSetup, setShowSetup] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [eventTitle, setEventTitle] = useState("SERASI 2025 EPISODE 3");

  // Refs for auto-scrolling
  const subEventContainerRef = useRef();
  const activeSubEventRef = useRef();

  // Initialize timer and scroll position
  useEffect(() => {
    if (events.length > 0) {
      setTimeLeft(events[currentEventIndex].duration * 60);
      setCurrentSubEventIndex(0);
    }
  }, [events, currentEventIndex]);

  // Auto-scroll to active sub-event
  useEffect(() => {
    if (activeSubEventRef.current) {
      activeSubEventRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentSubEventIndex]);

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

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);

  const nextSubEvent = () => {
    const currentEvent = events[currentEventIndex];
    if (currentSubEventIndex < currentEvent.subEvents.length - 1) {
      setCurrentSubEventIndex(currentSubEventIndex + 1);
    } else {
      nextEvent();
    }
  };

  const previousSubEvent = () => {
    if (currentSubEventIndex > 0) {
      setCurrentSubEventIndex(currentSubEventIndex - 1);
    } else if (currentEventIndex > 0) {
      // Move to last sub-event of previous main event
      setCurrentEventIndex(currentEventIndex - 1);
      setCurrentSubEventIndex(
        events[currentEventIndex - 1].subEvents.length - 1
      );
    }
  };

  const nextEvent = () => {
    if (currentEventIndex < events.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
      setCurrentSubEventIndex(0);
      setTimeLeft(events[currentEventIndex + 1].duration * 60);
    } else {
      setIsRunning(false);
    }
  };

  const handleSaveSetup = (newEvents, newNotes, newTitle) => {
    setEvents(newEvents);
    setFloorNotes(newNotes);
    setEventTitle(newTitle);
    setCurrentEventIndex(0);
    setCurrentSubEventIndex(0);
    setTimeLeft(newEvents[0]?.duration * 60 || 0);
    setIsRunning(false);
    setShowSetup(false);
  };

  return (
    <div className="container">
      <div className="header">{eventTitle}</div>

      <div className="playing-now">
        <div className="playing-now-label">PLAYING NOW</div>
        <div className="playing-now-content">
          <div>
            <strong>{events[currentEventIndex]?.name || "No Event"}</strong>
            <div style={{ fontSize: "0.8em", color: "#666", marginTop: "5px" }}>
              ({currentSubEventIndex + 1}/
              {events[currentEventIndex]?.subEvents.length})
            </div>
          </div>
          <div className="sub-event-container" ref={subEventContainerRef}>
            {events[currentEventIndex]?.subEvents.map((subEvent, index) => (
              <div
                key={index}
                ref={index === currentSubEventIndex ? activeSubEventRef : null}
                className={`sub-event ${
                  index === currentSubEventIndex ? "active" : ""
                }`}
              >
                {subEvent}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="next-up">
        <div className="next-up-label">NEXT UP</div>
        <div className="next-up-content">
          {currentEventIndex < events.length - 1 ? (
            <>
              <strong>{events[currentEventIndex + 1]?.name}</strong>
              <div className="next-up-sub-event-container">
                {events[currentEventIndex + 1]?.subEvents
                  .slice(0, 3)
                  .map((subEvent, index) => (
                    <div key={index} className="next-up-sub-event">
                      {subEvent}
                    </div>
                  ))}
              </div>
            </>
          ) : (
            "END OF EVENT"
          )}
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
        onNext={nextSubEvent}
        onPrevious={previousSubEvent}
        onSetup={() => setShowSetup(true)}
        onEditNotes={() => setShowNotes(true)}
        hasNext={
          currentSubEventIndex <
            events[currentEventIndex]?.subEvents.length - 1 ||
          currentEventIndex < events.length - 1
        }
        hasPrevious={currentSubEventIndex > 0 || currentEventIndex > 0}
      />

      {showSetup && (
        <SetupModal
          title={eventTitle}
          events={events}
          initialNotes={floorNotes.join("\n")}
          onSave={handleSaveSetup}
          onClose={() => setShowSetup(false)}
        />
      )}

      {showNotes && (
        <NotesModal
          notes={floorNotes.join("\n")}
          onSave={(newNotes) => {
            setFloorNotes(newNotes.split("\n"));
            setShowNotes(false);
          }}
          onClose={() => setShowNotes(false)}
        />
      )}
    </div>
  );
}

export default App;
