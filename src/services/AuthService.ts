import { User } from '../types/User';
import { generateReferralCode } from '../utils/helpers';

// Simulated auth service – replace with real backend calls in production
export class AuthService {
  static async login(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    // Simulated network delay
    await new Promise((r) => setTimeout(r, 500));
    if (!email || !password) {
      throw new Error('Identifiants invalides');
    }
    const user: User = {
      id: 'user-' + Date.now(),
      username: email.split('@')[0],
      email,
      balance: 0,
      totalEarned: 0,
      level: 1,
      points: 0,
      referralCode: generateReferralCode('user-001'),
      friends: [],
      createdAt: new Date().toISOString(),
    };
    return { user, token: 'mock-jwt-token' };
  }

  static async register(
    username: string,
    email: string,
    password: string,
    referralCode?: string,
  ): Promise<{ user: User; token: string }> {
    await new Promise((r) => setTimeout(r, 500));
    const id = 'user-' + Date.now();
    const user: User = {
      id,
      username,
      email,
      balance: 0,
      totalEarned: 0,
      level: 1,
      points: referralCode ? 100 : 0, // bonus points for referral
      referralCode: generateReferralCode(id),
      friends: [],
      createdAt: new Date().toISOString(),
    };
    return { user, token: 'mock-jwt-token' };
  }

  static async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 100));
  }
}
