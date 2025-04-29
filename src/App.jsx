import React, { useState, useEffect } from "react";
import ControlPanel from "./components/ControlPanel";
import FloorNotes from "./components/FloorNotes";
import Timer from "./components/Timer";
import SetupModal from "./components/SetupModal";
import NotesModal from "./components/NotesModal";
import "./styles.css";

function App() {
  const [events, setEvents] = useState([]);
  const [flatList, setFlatList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [floorNotes, setFloorNotes] = useState([]);
  const [showSetup, setShowSetup] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [eventTitle, setEventTitle] = useState("SERASI 2025 EPISODE 3");
  const [transitioning, setTransitioning] = useState(false);

  const flattenEvents = (events) => {
    const flat = [];
    events.forEach((event, eventIndex) => {
      flat.push({
        type: "event",
        name: event.name,
        duration: event.duration,
        parentIndex: eventIndex,
      });
      event.subEvents.forEach((sub, subIndex) =>
        flat.push({
          type: "sub",
          name: sub,
          parentIndex: eventIndex,
        })
      );
    });
    return flat;
  };

  // Hanya set waktu awal saat pertama kali atau saat flatList berubah
  useEffect(() => {
    if (flatList.length > 0 && currentIndex === 0) {
      setTimeLeft(flatList[0].duration * 60);
    }
  }, [flatList]); // Hanya depend pada flatList

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);

  const next = () => {
    if (currentIndex < flatList.length - 1) {
      const nextItem = flatList[currentIndex + 1];

      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);

        // Hanya reset waktu jika berpindah ke event baru (type "event")
        if (nextItem.type === "event") {
          setTimeLeft(nextItem.duration * 60);
        }
        setTransitioning(false);
      }, 150);
    }
  };

  const previous = () => {
    if (currentIndex > 0) {
      const prevItem = flatList[currentIndex - 1];

      setCurrentIndex(currentIndex - 1);

      // Hanya reset waktu jika kembali ke event utama (type "event")
      if (prevItem.type === "event") {
        setTimeLeft(prevItem.duration * 60);
      }
    }
  };

  const handleSaveSetup = (newEvents, newNotes, newTitle) => {
    const flattened = flattenEvents(newEvents);
    setEvents(newEvents);
    setFlatList(flattened);
    setFloorNotes(newNotes);
    setEventTitle(newTitle);
    setCurrentIndex(0);
    setTimeLeft(flattened[0]?.duration * 60 || 0);
    setIsRunning(false);
    setShowSetup(false);
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className={`playing-now ${transitioning ? "fade-in" : ""}`}>
          <div className="playing-now-label">PLAYING NOW</div>
          <div className="playing-now-content">
            <div className="current-event">
              {flatList[currentIndex]?.name || "No Event"}
            </div>
          </div>
        </div>

        <div className="next-up">
          <div className="next-up-label">NEXT UP</div>
          <div className="next-up-content">
            {[1, 2].map((offset) => {
              const nextItem = flatList[currentIndex + offset];
              if (!nextItem) return null;
              return (
                <div
                  key={offset}
                  className={`next-event-item ${
                    offset === 2 ? "secondary" : ""
                  }`}
                >
                  {nextItem.name}
                </div>
              );
            })}
          </div>
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
        onNext={next}
        onPrevious={previous}
        onSetup={() => setShowSetup(true)}
        onEditNotes={() => setShowNotes(true)}
        hasNext={currentIndex < flatList.length - 1}
        hasPrevious={currentIndex > 0}
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
