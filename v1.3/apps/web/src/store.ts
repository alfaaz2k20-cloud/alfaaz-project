import { create } from 'zustand';

export type ScreenId = 'S00' | 'S01' | 'S02' | 'S03' | 'S04' | 'S05' | 'S06' | 'S07' | 'S08' | 'S09' | 'S10' | 'S11' | 'S12' | 'S13' | 'S14' | 'S15';

interface AppState {
  currentScreen: ScreenId;
  paused: boolean;
  sessionId: string | null;
  sjtResponses: Record<string, string>;
  formData: {
    name: string;
    email: string;
    phone: string;
    interests: string[];
    notes: string;
  };
  
  setScreen: (screen: ScreenId) => void;
  setPaused: (paused: boolean) => void;
  setSessionId: (id: string) => void;
  setSjtResponse: (scenarioId: string, optionId: string) => void;
  updateFormData: (data: Partial<AppState['formData']>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentScreen: 'S00',
  paused: false,
  sessionId: null,
  sjtResponses: {},
  formData: {
    name: '',
    email: '',
    phone: '',
    interests: [],
    notes: ''
  },

  setScreen: (screen) => set({ currentScreen: screen }),
  setPaused: (paused) => set({ paused }),
  setSessionId: (id) => set({ sessionId: id }),
  setSjtResponse: (scenarioId, optionId) => 
    set((state) => ({ 
      sjtResponses: { ...state.sjtResponses, [scenarioId]: optionId } 
    })),
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data }
    }))
}));
