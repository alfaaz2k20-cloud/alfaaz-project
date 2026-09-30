import React, { useState } from 'react';
import { useAppStore } from './store';
import { createSession, submitSJT } from './api';

export const S13_Form: React.FC = () => {
  const { setScreen, updateFormData, formData, setSessionId } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Create session in backend
      const { sessionId } = await createSession(formData.email, formData.name, formData.phone);
      setSessionId(sessionId);
      setScreen('S14');
    } catch (err) {
      setError('Failed to securely start submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 max-w-lg mx-auto w-full pt-10">
      <h2 className="text-2xl font-bold mb-2">Almost there.</h2>
      <p className="mb-6 text-gray-600">Tell us a little about yourself.</p>
      
      {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input required type="text" value={formData.name} onChange={e => updateFormData({ name: e.target.value })} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input required type="email" value={formData.email} onChange={e => updateFormData({ email: e.target.value })} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone / WhatsApp</label>
          <input required type="tel" value={formData.phone} onChange={e => updateFormData({ phone: e.target.value })} className="w-full border p-2 rounded" />
        </div>
      </div>
      
      <button disabled={loading} type="submit" className="mt-8 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Securing...' : 'Continue'}
      </button>
    </form>
  );
};

export const S14_Interests: React.FC = () => {
  const { setScreen, updateFormData, formData, sessionId, sjtResponses } = useAppStore();
  const [loading, setLoading] = useState(false);

  const interestOptions = [
    'Visual & Performing Arts',
    'Storytelling & Expression',
    'Ideas & Dialogue',
    'Community & Care',
    'Behind the Scenes',
    'Media & Communication'
  ];

  const toggleInterest = (i: string) => {
    const current = formData.interests;
    if (current.includes(i)) updateFormData({ interests: current.filter(x => x !== i) });
    else updateFormData({ interests: [...current, i] });
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      if (sessionId) {
        // Submit SJT and Finalize
        await submitSJT(sessionId, sjtResponses);
        // Note: In real app, we'd also push game telemetry here if not already streamed
      }
      setScreen('S15');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 max-w-lg mx-auto w-full pt-10">
      <h2 className="text-2xl font-bold mb-6">What kind of work excites you?</h2>
      
      <div className="space-y-2 mb-8">
        {interestOptions.map(option => (
          <label key={option} className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
            <input 
              type="checkbox" 
              checked={formData.interests.includes(option)}
              onChange={() => toggleInterest(option)}
              className="h-5 w-5 text-blue-600"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <button disabled={loading} onClick={handleFinish} className="mt-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Finalizing...' : 'Submit Assessment'}
      </button>
    </div>
  );
};

export const S15_Farewell: React.FC = () => {
  const { formData } = useAppStore();

  // In production, dominant trait is calculated by the backend.
  // For UI flow, we hardcode or pick a mock one if not available.
  const traitText = "You carry the room's weight before anyone notices it's heavy.";

  return (
    <div className="flex flex-col items-center justify-center flex-1 max-w-xl mx-auto text-center pt-20">
      <div className="mb-12">
        <h2 className="text-3xl font-serif text-blue-900 mb-6 font-bold leading-tight">
          {traitText}
        </h2>
        {formData.interests.length > 0 && (
          <p className="text-lg text-gray-700 mb-4">
            You gravitate toward <strong>{formData.interests.join(', ')}</strong> — and we see that in you.
          </p>
        )}
        <p className="text-gray-600">
          Where you land will depend on where Alfaaz needs you most right now. We'll be in touch.
        </p>
      </div>
      <div className="mt-auto text-sm text-gray-400">
        Alfaaz Collective
      </div>
    </div>
  );
};
