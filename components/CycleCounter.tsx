
import React from 'react';

interface CycleCounterProps {
  cycles: number;
}

const CycleCounter: React.FC<CycleCounterProps> = ({ cycles }) => {
  return (
    <div className="flex items-center justify-center space-x-2 text-slate-400 mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span className="font-medium text-slate-300">{cycles}</span>
      <span className="text-sm">sessions completed</span>
    </div>
  );
};

export default CycleCounter;
