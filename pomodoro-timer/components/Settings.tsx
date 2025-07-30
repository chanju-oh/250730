
import React from 'react';

interface SettingsProps {
  focusDuration: number;
  setFocusDuration: (value: number) => void;
  restDuration: number;
  setRestDuration: (value: number) => void;
  isDisabled: boolean;
}

const SettingsInput: React.FC<{label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; isDisabled: boolean; id: string;}> = ({label, value, onChange, isDisabled, id}) => (
    <div className="flex flex-col items-center">
        <label htmlFor={id} className="text-sm font-medium text-slate-400 mb-2">{label}</label>
        <input
            id={id}
            type="number"
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            className="w-24 bg-slate-700 border border-slate-600 text-white text-center rounded-lg p-2 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            min="1"
        />
    </div>
);


const Settings: React.FC<SettingsProps> = ({ focusDuration, setFocusDuration, restDuration, setRestDuration, isDisabled }) => {
  return (
    <div className="flex justify-center space-x-8">
      <SettingsInput 
        label="Focus (min)"
        id="focus-duration"
        value={focusDuration}
        onChange={(e) => setFocusDuration(parseInt(e.target.value, 10))}
        isDisabled={isDisabled}
      />
      <SettingsInput 
        label="Rest (min)"
        id="rest-duration"
        value={restDuration}
        onChange={(e) => setRestDuration(parseInt(e.target.value, 10))}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default Settings;
