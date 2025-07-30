
import React, { useState, useEffect, useCallback } from 'react';
import { TimerMode, Status } from './types';
import TimerDisplay from './components/TimerDisplay';
import Settings from './components/Settings';
import Controls from './components/Controls';
import CycleCounter from './components/CycleCounter';

const App: React.FC = () => {
  const [focusDuration, setFocusDuration] = useState(25);
  const [restDuration, setRestDuration] = useState(5);
  const [timerMode, setTimerMode] = useState<TimerMode>(TimerMode.Focus);
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [completedCycles, setCompletedCycles] = useState(0);

  const isTimerActive = status === Status.Running || status === Status.Paused;

  const totalDuration = (timerMode === TimerMode.Focus ? focusDuration : restDuration) * 60;

  // Effect for timer countdown
  useEffect(() => {
    let intervalId: number | undefined;

    if (status === Status.Running) {
      intervalId = window.setInterval(() => {
        setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [status]);

  // Effect for mode switching when timer reaches zero
  useEffect(() => {
    if (timeLeft === 0 && status === Status.Running) {
      if (timerMode === TimerMode.Focus) {
        setTimerMode(TimerMode.Rest);
        setTimeLeft(restDuration * 60);
      } else { // It was Rest mode
        setTimerMode(TimerMode.Focus);
        setTimeLeft(focusDuration * 60);
        setCompletedCycles((prev) => prev + 1);
      }
    }
  }, [timeLeft, status, timerMode, restDuration, focusDuration]);

  // Update timeLeft when durations are changed while idle
  useEffect(() => {
    if (status === Status.Idle) {
      setTimeLeft(focusDuration * 60);
      setTimerMode(TimerMode.Focus);
    }
  }, [focusDuration, status]);

  const handleStart = useCallback(() => {
    if (status === Status.Idle) {
      setTimeLeft(focusDuration * 60);
      setTimerMode(TimerMode.Focus);
    }
    setStatus(Status.Running);
  }, [status, focusDuration]);

  const handlePause = useCallback(() => {
    setStatus(Status.Paused);
  }, []);

  const handleReset = useCallback(() => {
    setStatus(Status.Idle);
    setTimerMode(TimerMode.Focus);
    setTimeLeft(focusDuration * 60);
    setCompletedCycles(0);
  }, [focusDuration]);
  
  const handleFocusDurationChange = (value: number) => {
    if(value > 0) setFocusDuration(value);
  }
  
  const handleRestDurationChange = (value: number) => {
    if(value > 0) setRestDuration(value);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white font-sans">
      <main className="w-full max-w-md mx-auto bg-slate-800/50 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-sm border border-slate-700/50">
        <h1 className="text-3xl font-bold text-center text-lime-300">Pomodoro Timer</h1>
        <p className="text-center text-slate-400 mb-6">
          Currently: <span className={`font-semibold ${timerMode === TimerMode.Focus ? 'text-lime-400' : 'text-orange-400'}`}>{timerMode}</span>
        </p>

        <TimerDisplay 
          timeLeft={timeLeft}
          totalDuration={totalDuration}
          timerMode={timerMode}
        />
        
        <CycleCounter cycles={completedCycles} />

        <Controls
          status={status}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
        
        <div className="mt-8 pt-6 border-t border-slate-700">
            <Settings
              focusDuration={focusDuration}
              setFocusDuration={handleFocusDurationChange}
              restDuration={restDuration}
              setRestDuration={handleRestDurationChange}
              isDisabled={isTimerActive}
            />
        </div>
      </main>
      <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>© 2025 오찬주. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
