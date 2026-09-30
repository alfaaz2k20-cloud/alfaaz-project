import React, { useEffect, useRef } from 'react';
import { S13_Form, S14_Interests, S15_Farewell } from './FormScreens';
import { useAppStore, ScreenId } from './store';
import { submitTelemetry } from './api';
import { G5_Gallery, G6_Tool, G7_Repetition } from './games/GameComponents';
// We would also import G1-G4 here normally, but placeholder is fine for S02-S09.

const COUNSEL_APPROVED_CONSENT = import.meta.env.VITE_COUNSEL_APPROVED_CONSENT === 'true';

export const Shell: React.FC = () => {
  const { currentScreen, paused, setPaused, setScreen, sessionId } = useAppStore();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleBlur = () => {
      if (sessionId && currentScreen.startsWith('S') && currentScreen !== 'S00') {
        submitTelemetry(sessionId, 'window_blur', { screen: currentScreen }).catch(() => {});
      }
    };
    const handleFocus = () => {
      if (sessionId && currentScreen.startsWith('S') && currentScreen !== 'S00') {
        submitTelemetry(sessionId, 'window_focus', { screen: currentScreen }).catch(() => {});
      }
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [sessionId, currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'S00': return <S00_Landing />;
      case 'S01': return <S01_Consent />;
      case 'S10': return <G5_Gallery onComplete={() => setScreen('S11')} />;
      case 'S11': return <G6_Tool onComplete={() => setScreen('S12')} />;
      case 'S12': return <G7_Repetition onComplete={() => setScreen('S13')} />;
      case 'S13': return <S13_Form />;
      case 'S14': return <S14_Interests />;
      case 'S15': return <S15_Farewell />;
      default: return <PlaceholderScreen id={currentScreen} />;
    }
  };

  return (
    <>
      <div 
        aria-hidden={paused ? "true" : "false"}
        className="min-h-screen bg-gray-50 flex flex-col text-gray-900"
      >
        <header className="p-4 flex justify-between items-center border-b bg-white">
          <h1 className="text-xl font-bold">Alfaaz Recruit</h1>
          {currentScreen !== 'S00' && currentScreen !== 'S01' && (
            <button 
              onClick={() => setPaused(true)}
              disabled={paused}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
            >
              Pause
            </button>
          )}
        </header>
        <main ref={mainRef} className="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col">
          {renderScreen()}
        </main>
      </div>

      {paused && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="pause-heading"
        >
          <div className="bg-white p-8 shadow rounded max-w-sm w-full text-center">
            <h1 id="pause-heading" className="text-2xl font-bold mb-4">Paused</h1>
            <p className="mb-6 text-gray-700">Your progress is saved securely.</p>
            <button 
              autoFocus
              onClick={() => setPaused(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Resume
            </button>
          </div>
        </div>
      )}

      {/* Global ARIA live region for screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="a11y-announcer"></div>
    </>
  );
};

const S00_Landing: React.FC = () => {
  const { setScreen } = useAppStore();
  return (
    <div className="flex flex-col items-center justify-center flex-1" aria-labelledby="landing-heading">
      <h2 id="landing-heading" className="text-3xl font-bold mb-4">Welcome to Alfaaz Collective</h2>
      <p className="mb-6">Walk through a day at Alfaaz. There are no right or wrong answers — only yours.</p>
      <button 
        onClick={() => setScreen('S01')}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Continue
      </button>
    </div>
  );
};

const S01_Consent: React.FC = () => {
  const { setScreen } = useAppStore();
  
  if (!COUNSEL_APPROVED_CONSENT) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <p className="font-bold">DRAFT - COUNSEL REVIEW REQUIRED</p>
        <p>Consent copy is disabled in production without legal approval.</p>
        <button 
          onClick={() => setScreen('S02')}
          className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          [DEV] Continue
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start max-w-lg mx-auto flex-1 w-full pt-10" aria-labelledby="consent-heading">
      <h2 id="consent-heading" className="text-2xl font-bold mb-4">Before we begin</h2>
      <ul className="list-disc pl-5 mb-6 space-y-2">
        <li>This is not a psychological test.</li>
        <li>Your responses help us understand how you approach real situations.</li>
        <li>Participation is completely voluntary.</li>
      </ul>
      <button 
        onClick={() => setScreen('S02')}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        I consent, Continue
      </button>
    </div>
  );
};

const PlaceholderScreen: React.FC<{ id: ScreenId }> = ({ id }) => {
  const { setScreen } = useAppStore();
  
  const handleNext = () => {
    const screens: ScreenId[] = [
      'S00','S01','S02','S03','S04','S05','S06','S07',
      'S08','S09','S10','S11','S12','S13','S14','S15'
    ];
    const currentIndex = screens.indexOf(id);
    if (currentIndex < screens.length - 1) {
      setScreen(screens[currentIndex + 1]);
    }
  };

  return (
    <div className="flex flex-col flex-1" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="text-2xl font-bold mb-4">Screen {id}</h2>
      <p className="mb-4 text-gray-700">Content for {id}</p>
      <div className="mt-auto flex justify-end">
        <button 
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
