
import React from 'react';
import { Status } from '../types';

interface ControlsProps {
  status: Status;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const Button: React.FC<{onClick: () => void; className: string; children: React.ReactNode}> = ({onClick, className, children}) => (
    <button
        onClick={onClick}
        className={`w-28 py-3 text-lg font-semibold rounded-lg shadow-md transform transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${className}`}
    >
        {children}
    </button>
);


const Controls: React.FC<ControlsProps> = ({ status, onStart, onPause, onReset }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      {status !== Status.Running ? (
        <Button onClick={onStart} className="bg-lime-500 hover:bg-lime-600 text-slate-900 focus:ring-lime-300">
            {status === Status.Paused ? 'Resume' : 'Start'}
        </Button>
      ) : (
        <Button onClick={onPause} className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 focus:ring-yellow-300">
          Pause
        </Button>
      )}
      <Button onClick={onReset} className="bg-slate-600 hover:bg-slate-700 text-slate-100 focus:ring-slate-400">
        Reset
      </Button>
    </div>
  );
};

export default Controls;
