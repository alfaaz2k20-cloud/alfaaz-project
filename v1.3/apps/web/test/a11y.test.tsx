import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Shell } from '../src/Shell';
import { useAppStore } from '../src/store';
import * as api from '../src/api';

vi.mock('../src/api', () => ({
  submitTelemetry: vi.fn(() => Promise.resolve({ success: true }))
}));

describe('Phase 9: Accessibility and Edge Cases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const store = useAppStore.getState();
    store.setPaused(false);
    store.setScreen('S13');
    store.setSessionId('test-session-123');
  });

  it('Strictly enforces aria-hidden on the background when paused', () => {
    const { container } = render(<Shell />);
    
    // Background should not be hidden initially
    const background = container.querySelector('.min-h-screen.bg-gray-50');
    expect(background?.getAttribute('aria-hidden')).toBe('false');

    // Trigger Pause
    const pauseBtn = screen.getByText('Pause');
    fireEvent.click(pauseBtn);

    // Dialog should be present with aria-modal="true"
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeDefined();
    expect(dialog.getAttribute('aria-modal')).toBe('true');

    // Background should now be hidden
    expect(background?.getAttribute('aria-hidden')).toBe('true');
  });

  it('Fires window_blur and window_focus telemetry events', () => {
    render(<Shell />);
    
    // Simulate window blur
    fireEvent(window, new Event('blur'));
    expect(api.submitTelemetry).toHaveBeenCalledWith('test-session-123', 'window_blur', { screen: 'S13' });

    // Simulate window focus
    fireEvent(window, new Event('focus'));
    expect(api.submitTelemetry).toHaveBeenCalledWith('test-session-123', 'window_focus', { screen: 'S13' });
  });
});
