import { ADMOB } from '../utils/constants';

// AdMob service – wraps expo-ads-admob calls
// In a real Expo app, import from 'expo-ads-admob'
export class AdMobService {
  static readonly bannerUnitId = ADMOB.BANNER;
  static readonly interstitialUnitId = ADMOB.INTERSTITIAL;
  static readonly rewardedUnitId = ADMOB.REWARDED;

  /**
   * Show a rewarded video ad.
   * Returns true if the user completed watching the ad.
   */
  static async showRewardedAd(): Promise<boolean> {
    try {
      // In production, use:
      // import { RewardedAd, RewardedAdEventType, TestIds } from 'expo-ads-admob';
      // const ad = RewardedAd.createForAdRequest(this.rewardedUnitId);
      // await ad.load();
      // ad.show();

      // Simulated for demo purposes
      await new Promise((r) => setTimeout(r, 1000));
      return true;
    } catch (error) {
      console.error('AdMob rewarded ad error:', error);
      return false;
    }
  }

  /**
   * Show an interstitial ad between activities.
   */
  static async showInterstitialAd(): Promise<void> {
    try {
      // In production, use:
      // import { InterstitialAd, AdEventType, TestIds } from 'expo-ads-admob';
      // const ad = InterstitialAd.createForAdRequest(this.interstitialUnitId);
      // await ad.load();
      // ad.show();

      await new Promise((r) => setTimeout(r, 500));
    } catch (error) {
      console.error('AdMob interstitial ad error:', error);
    }
  }
}
