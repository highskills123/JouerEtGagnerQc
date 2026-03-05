import { REVENUE_SHARE, WITHDRAWAL } from './constants';

/**
 * Calculate the user's share of earnings from an activity.
 * @param totalValue Total value of the activity reward
 * @returns User's share (40%)
 */
export const calculateUserShare = (totalValue: number): number => {
  return parseFloat((totalValue * REVENUE_SHARE.USER).toFixed(2));
};

/**
 * Calculate the owner's share of earnings from an activity.
 * @param totalValue Total value of the activity reward
 * @returns Owner's share (60%)
 */
export const calculateOwnerShare = (totalValue: number): number => {
  return parseFloat((totalValue * REVENUE_SHARE.OWNER).toFixed(2));
};

/**
 * Convert points to CAD dollar value.
 */
export const pointsToCad = (points: number): number => {
  return parseFloat((points * WITHDRAWAL.POINTS_TO_CAD).toFixed(2));
};

/**
 * Check if user has enough points to withdraw.
 */
export const canWithdraw = (points: number): boolean => {
  return points >= WITHDRAWAL.MIN_POINTS;
};

/**
 * Format a monetary value to CAD display string.
 */
export const formatCurrency = (amount: number, currency = 'CAD'): string => {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format a large number with commas.
 */
export const formatNumber = (n: number): string => {
  return new Intl.NumberFormat('fr-CA').format(n);
};

/**
 * Format a date to a human-readable French string.
 */
export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Generate a random referral code.
 */
export const generateReferralCode = (userId: string): string => {
  const prefix = userId.replace(/[^a-zA-Z0-9]/g, '').substring(0, 4).toUpperCase().padEnd(4, '0');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const suffix = Array.from({ length: 4 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join('');
  return `JEG-${prefix}-${suffix}`;
};
