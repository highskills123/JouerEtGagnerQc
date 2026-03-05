import { EarningEvent, Reward } from '../types/Reward';
import {
  POINTS_PER_ACTIVITY,
  REVENUE_SHARE,
} from '../utils/constants';
import { useUserStore } from '../store/userStore';
import { useRewardStore } from '../store/rewardStore';

type ActivityType = 'video' | 'game' | 'survey' | 'tournament' | 'referral';

export class RewardService {
  /**
   * Record an earning event for a completed activity.
   * The user receives 40% of the total value, owner keeps 60%.
   */
  static recordEarning(
    type: ActivityType,
    description: string,
    basePoints?: number,
  ): EarningEvent {
    const totalPoints =
      basePoints ?? RewardService.getDefaultPoints(type);
    const userShare = Math.round(totalPoints * REVENUE_SHARE.USER);
    const ownerShare = Math.round(totalPoints * REVENUE_SHARE.OWNER);

    const event: EarningEvent = {
      id: 'evt-' + Date.now(),
      userId: useUserStore.getState().user?.id ?? 'unknown',
      type,
      points: totalPoints,
      userShare,
      ownerShare,
      timestamp: new Date().toISOString(),
      description,
    };

    // Update stores
    useUserStore.getState().addPoints(userShare);
    useRewardStore.getState().addEarningEvent(event);

    return event;
  }

  static getDefaultPoints(type: ActivityType): number {
    switch (type) {
      case 'video':
        return POINTS_PER_ACTIVITY.VIDEO_WATCH;
      case 'game':
        return POINTS_PER_ACTIVITY.GAME_PLAY;
      case 'survey':
        return POINTS_PER_ACTIVITY.SURVEY_COMPLETE;
      case 'tournament':
        return POINTS_PER_ACTIVITY.TOURNAMENT_WIN;
      case 'referral':
        return POINTS_PER_ACTIVITY.REFERRAL;
      default:
        return 0;
    }
  }

  /**
   * Claim a reward using the user's points.
   */
  static claimReward(reward: Reward): boolean {
    const { user, addPoints } = useUserStore.getState();
    if (!user || user.points < reward.minPointsRequired) {
      return false;
    }
    addPoints(-reward.minPointsRequired);
    return true;
  }
}
