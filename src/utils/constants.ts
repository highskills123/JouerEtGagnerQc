// Revenue sharing configuration
export const REVENUE_SHARE = {
  OWNER: 0.60, // 60% for the owner
  USER: 0.40,  // 40% for the user
};

// Points values per activity
export const POINTS_PER_ACTIVITY = {
  VIDEO_WATCH: 10,
  GAME_PLAY: 25,
  SURVEY_COMPLETE: 50,
  TOURNAMENT_WIN: 500,
  REFERRAL: 100,
};

// Withdrawal thresholds
export const WITHDRAWAL = {
  MIN_POINTS: 1000,
  POINTS_TO_CAD: 0.001, // 1000 points = $1 CAD
};

// App colors
export const COLORS = {
  primary: '#6C63FF',
  secondary: '#FF6584',
  accent: '#43B89C',
  background: '#1a1a2e',
  surface: '#16213e',
  surfaceVariant: '#0f3460',
  text: '#FFFFFF',
  textSecondary: '#A0A0B0',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  gold: '#FFD700',
};

// App routes
export const ROUTES = {
  HOME: 'Home',
  VIDEOS: 'Videos',
  GAMES: 'Games',
  SURVEYS: 'Surveys',
  TOURNAMENTS: 'Tournaments',
  FRIENDS: 'Friends',
  SETTINGS: 'Settings',
  ACCOUNT_DETAILS: 'AccountDetails',
};

// AdMob Unit IDs (replace with real IDs in production)
export const ADMOB = {
  APP_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',
  BANNER: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  INTERSTITIAL: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  REWARDED: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
};
