import React, { useState } from 'react';

export const G1_Frequency: React.FC<{ onComplete: (evidence: any) => void }> = ({ onComplete }) => {
  const [round, setRound] = useState(1);
  const [slider, setSlider] = useState(50);

  const handleLock = () => {
    if (round < 6) {
      setRound(r => r + 1);
    } else {
      // Mock completion
      onComplete({ index: 0.8, level: 'HIGH', max: 1, min: 0 });
    }
  };

  return (
    <div className="game-container p-4 border rounded bg-white">
      <h3 className="font-bold mb-4">The Frequency (Empathy)</h3>
      <p>Round: {round} / 6</p>
      <div className="my-4">
        <label>Tuning: {slider}</label>
        <input 
          type="range" min="0" max="100" value={slider} 
          onChange={e => setSlider(Number(e.target.value))} 
          className="w-full"
        />
      </div>
      <button onClick={handleLock} className="px-4 py-2 bg-blue-600 text-white rounded">Lock In</button>
    </div>
  );
};

export const G2_Archive: React.FC<{ onComplete: (evidence: any) => void }> = ({ onComplete }) => {
  return (
    <div className="game-container p-4 border rounded bg-white">
      <h3 className="font-bold mb-4">The Archive (Conscientiousness)</h3>
      <p>Sorting cards...</p>
      <button onClick={() => onComplete({ index: 0.5, level: 'MODERATE' })} className="px-4 py-2 bg-blue-600 text-white rounded">Submit Round 1</button>
    </div>
  );
};

export const G3_Canvas: React.FC<{ onComplete: (evidence: any) => void }> = ({ onComplete }) => {
  return (
    <div className="game-container p-4 border rounded bg-white">
      <h3 className="font-bold mb-4">The Shared Canvas (Collaborative Spirit)</h3>
      <p>Painting with simulated partner...</p>
      <button onClick={() => onComplete({ index: 0.9, level: 'HIGH' })} className="px-4 py-2 bg-blue-600 text-white rounded">End Section</button>
    </div>
  );
};

export const G4_Grid: React.FC<{ onComplete: (evidence: any) => void }> = ({ onComplete }) => {
  return (
    <div className="game-container p-4 border rounded bg-white">
      <h3 className="font-bold mb-4">The Shifting Grid (Emotional Agility)</h3>
      <p>Rule: Circles left, Squares right...</p>
      <button onClick={() => onComplete({ index: 0.2, level: 'LOW' })} className="px-4 py-2 bg-blue-600 text-white rounded">Simulate Reversals</button>
    </div>
  );
};
