import { create } from 'zustand';
import { User } from '../types/User';
import { generateReferralCode } from '../utils/helpers';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  updateBalance: (amount: number) => void;
  addPoints: (points: number) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

const DEFAULT_USER: User = {
  id: 'demo-user-001',
  username: 'Joueur',
  email: 'demo@joueretgagner.com',
  balance: 0,
  totalEarned: 0,
  level: 1,
  points: 0,
  referralCode: generateReferralCode('demo-user-001'),
  friends: [],
  createdAt: new Date().toISOString(),
};

export const useUserStore = create<UserState>((set) => ({
  user: DEFAULT_USER,
  isAuthenticated: true,
  isLoading: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  updateBalance: (amount) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            balance: state.user.balance + amount,
            totalEarned:
              amount > 0
                ? state.user.totalEarned + amount
                : state.user.totalEarned,
          }
        : null,
    })),
  addPoints: (points) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, points: state.user.points + points }
        : null,
    })),
  logout: () => set({ user: null, isAuthenticated: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
