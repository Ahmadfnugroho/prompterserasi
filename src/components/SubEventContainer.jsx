import React, { useEffect, useRef } from "react";

function SubEventContainer({ subEvents, currentIndex }) {
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      const activeElement =
        containerRef.current.querySelector(".sub-event.active");
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [currentIndex, subEvents]);

  return (
    <div className="sub-event-container" ref={containerRef}>
      {subEvents.map((subEvent, index) => (
        <div
          key={index}
          className={`sub-event ${index === currentIndex ? "active" : ""}`}
        >
          {subEvent}
        </div>
      ))}
    </div>
  );
}

export default SubEventContainer;
