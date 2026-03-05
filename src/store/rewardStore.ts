import { create } from 'zustand';
import { Reward, EarningEvent } from '../types/Reward';

interface RewardState {
  rewards: Reward[];
  earningHistory: EarningEvent[];
  isLoading: boolean;
  setRewards: (rewards: Reward[]) => void;
  addEarningEvent: (event: EarningEvent) => void;
  setLoading: (loading: boolean) => void;
}

const SAMPLE_REWARDS: Reward[] = [
  {
    id: 'r1',
    title: 'Carte-cadeau Tim Hortons',
    description: 'Échangez vos points pour une carte-cadeau Tim Hortons',
    type: 'gift_card',
    value: 10,
    currency: 'CAD',
    status: 'available',
    minPointsRequired: 10000,
  },
  {
    id: 'r2',
    title: 'Virement Interac',
    description: 'Recevez de l\'argent directement sur votre compte bancaire',
    type: 'cash',
    value: 5,
    currency: 'CAD',
    status: 'available',
    minPointsRequired: 5000,
  },
  {
    id: 'r3',
    title: 'Carte-cadeau Amazon',
    description: 'Magasinez sur Amazon avec votre récompense',
    type: 'gift_card',
    value: 25,
    currency: 'CAD',
    status: 'available',
    minPointsRequired: 25000,
  },
  {
    id: 'r4',
    title: 'Carte-cadeau iTunes',
    description: 'Achetez des applications, musiques et plus sur Apple Store',
    type: 'gift_card',
    value: 15,
    currency: 'CAD',
    status: 'available',
    minPointsRequired: 15000,
  },
];

export const useRewardStore = create<RewardState>((set) => ({
  rewards: SAMPLE_REWARDS,
  earningHistory: [],
  isLoading: false,
  setRewards: (rewards) => set({ rewards }),
  addEarningEvent: (event) =>
    set((state) => ({
      earningHistory: [event, ...state.earningHistory],
    })),
  setLoading: (isLoading) => set({ isLoading }),
}));
