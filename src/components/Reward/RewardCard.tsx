import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Reward } from '../../types/Reward';
import { COLORS } from '../../utils/constants';
import { formatCurrency, formatNumber } from '../../utils/helpers';
import { RewardService } from '../../services/RewardService';
import { useUserStore } from '../../store/userStore';

interface RewardCardProps {
  reward: Reward;
}

export const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
  const user = useUserStore((s) => s.user);
  const hasEnoughPoints = (user?.points ?? 0) >= reward.minPointsRequired;

  const handleClaim = () => {
    if (!hasEnoughPoints) {
      Alert.alert(
        'Points insuffisants',
        `Il vous faut ${formatNumber(reward.minPointsRequired)} points pour réclamer cette récompense.`,
      );
      return;
    }
    Alert.alert(
      'Réclamer la récompense',
      `Voulez-vous échanger ${formatNumber(reward.minPointsRequired)} points contre ${reward.title} (${formatCurrency(reward.value, reward.currency)}) ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: () => {
            const success = RewardService.claimReward(reward);
            if (success) {
              Alert.alert('🎉 Félicitations !', 'Récompense réclamée avec succès !');
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.typeIcon}>
          {reward.type === 'gift_card' ? '🎁' : reward.type === 'cash' ? '💵' : '⭐'}
        </Text>
        <View style={styles.info}>
          <Text style={styles.title}>{reward.title}</Text>
          <Text style={styles.description}>{reward.description}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.value}>
            {formatCurrency(reward.value, reward.currency)}
          </Text>
          <Text style={styles.points}>
            {formatNumber(reward.minPointsRequired)} pts requis
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.claimButton, !hasEnoughPoints && styles.disabledButton]}
          onPress={handleClaim}
          accessibilityLabel={`Réclamer ${reward.title}`}
        >
          <Text style={styles.claimText}>
            {hasEnoughPoints ? 'Réclamer' : 'Insuffisant'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  typeIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    color: COLORS.gold,
    fontSize: 20,
    fontWeight: 'bold',
  },
  points: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  claimButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  disabledButton: {
    backgroundColor: COLORS.surfaceVariant,
  },
  claimText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
  },
});
