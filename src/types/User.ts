export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  balance: number;
  totalEarned: number;
  level: number;
  points: number;
  referralCode: string;
  friends: string[];
  createdAt: string;
}
