// Stopwatch component
import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(prevTime => prevTime + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startAndStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const reset = () => {
    setTime(0);
  };

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const milliseconds = time % 100;
  const seconds = Math.floor(time / 100) % 60;
  const minutes = Math.floor(time / 6000) % 60;
  const hours = Math.floor(time / 360000);

  return (
    <div className="stopwatch-container">
                <p className="stopwatch-time">
                  {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}:{formatTime(milliseconds)}
                </p>
                <div className="fancy-buttons">
                            <button className="fancy-button" onClick={startAndStop}>
                              {isRunning ? 'Submit' : 'Start'}
                            </button>
                            <button className = "fancy-button" onClick = {startAndStop}>
                              Give Up
                            </button>
                </div>
                <p style={{ fontSize: '25px' }}>Come back here when you are done!</p>
    </div>
  );
};

export default Stopwatch;
