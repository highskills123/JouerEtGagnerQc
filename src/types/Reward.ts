export type RewardType = 'gift_card' | 'cash' | 'points';
export type RewardStatus = 'available' | 'claimed' | 'expired';

export interface Reward {
  id: string;
  title: string;
  description: string;
  type: RewardType;
  value: number;
  currency: string;
  status: RewardStatus;
  imageUrl?: string;
  expiresAt?: string;
  minPointsRequired: number;
}

export interface EarningEvent {
  id: string;
  userId: string;
  type: 'video' | 'game' | 'survey' | 'tournament' | 'referral';
  points: number;
  userShare: number;
  ownerShare: number;
  timestamp: string;
  description: string;
}
