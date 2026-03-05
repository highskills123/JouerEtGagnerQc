import { create } from 'zustand';

type Language = 'fr' | 'en';
type Theme = 'dark' | 'light';
type NotificationFrequency = 'all' | 'important' | 'none';

interface SettingsState {
  language: Language;
  theme: Theme;
  notifications: boolean;
  notificationFrequency: NotificationFrequency;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  adPersonalization: boolean;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  setNotifications: (enabled: boolean) => void;
  setNotificationFrequency: (frequency: NotificationFrequency) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setVibrationEnabled: (enabled: boolean) => void;
  setAdPersonalization: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: 'fr',
  theme: 'dark',
  notifications: true,
  notificationFrequency: 'all',
  soundEnabled: true,
  vibrationEnabled: true,
  adPersonalization: true,
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
  setNotifications: (notifications) => set({ notifications }),
  setNotificationFrequency: (notificationFrequency) =>
    set({ notificationFrequency }),
  setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
  setVibrationEnabled: (vibrationEnabled) => set({ vibrationEnabled }),
  setAdPersonalization: (adPersonalization) => set({ adPersonalization }),
}));
