
import React from 'react';
import { TimerMode } from '../types';

interface TimerDisplayProps {
  timeLeft: number;
  totalDuration: number;
  timerMode: TimerMode;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, totalDuration, timerMode }) => {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  const radius = 100;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = totalDuration > 0 ? timeLeft / totalDuration : 0;
  const strokeDashoffset = circumference - progress * circumference;

  const progressColor = timerMode === TimerMode.Focus ? 'stroke-lime-400' : 'stroke-orange-400';

  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto my-6">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="#334155" // slate-700
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className={`${progressColor} transition-all duration-300 ease-linear`}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute">
        <span className="text-6xl font-mono font-bold text-slate-100">
          {minutes}:{seconds}
        </span>
      </div>
    </div>
  );
};

export default TimerDisplay;
