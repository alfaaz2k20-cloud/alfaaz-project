import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Shell } from '../src/Shell';
import { useAppStore } from '../src/store';

describe('Shell Flow', () => {
  beforeEach(() => {
    useAppStore.setState({ currentScreen: 'S00', paused: false });
  });

  it('completes the full flow from S00 to S15', () => {
    render(<Shell />);
    
    // S00
    expect(screen.getByText(/Welcome to Alfaaz/i)).toBeDefined();
    fireEvent.click(screen.getByText(/Continue/i));

    // S01 (Consent logic - fallback because VITE_COUNSEL_APPROVED_CONSENT is false in test)
    expect(screen.getByText(/COUNSEL REVIEW REQUIRED/i)).toBeDefined();
    fireEvent.click(screen.getByText(/\[DEV\] Continue/i));

    // S02 to S15
    for (let i = 2; i <= 15; i++) {
      const id = i < 10 ? `S0${i}` : `S${i}`;
      expect(screen.getByText(`Screen ${id}`)).toBeDefined();
      fireEvent.click(screen.getByText(/Continue/i));
    }

    // After S15, the flow is complete (the mock calls alert)
    // We just ensure we reached S15 successfully.
    expect(useAppStore.getState().currentScreen).toBe('S15');
  });

  it('handles pause and resume', () => {
    render(<Shell />);
    fireEvent.click(screen.getByText(/Continue/i)); // Move to S01
    fireEvent.click(screen.getByText(/\[DEV\] Continue/i)); // Move to S02

    // Click Pause
    fireEvent.click(screen.getByText(/Pause/i));
    expect(screen.getByText(/Your progress is saved/i)).toBeDefined();

    // Click Resume
    fireEvent.click(screen.getByText(/Resume/i));
    expect(screen.getByText('Screen S02')).toBeDefined();
  });
});
