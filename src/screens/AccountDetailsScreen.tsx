import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Header } from '../components/Common/Header';
import { RewardCard } from '../components/Reward/RewardCard';
import { useUserStore } from '../store/userStore';
import { useRewardStore } from '../store/rewardStore';
import { COLORS } from '../utils/constants';
import {
  formatCurrency,
  formatNumber,
  pointsToCad,
  canWithdraw,
  formatDate,
} from '../utils/helpers';

export const AccountDetailsScreen: React.FC = () => {
  const user = useUserStore((s) => s.user);
  const rewards = useRewardStore((s) => s.rewards);
  const earningHistory = useRewardStore((s) => s.earningHistory);
  const balance = pointsToCad(user?.points ?? 0);
  const withdrawable = canWithdraw(user?.points ?? 0);

  const handleWithdrawInterac = () => {
    Alert.alert(
      '✅ Demande envoyée',
      'Votre virement Interac sera traité dans 3-5 jours ouvrables.',
    );
  };

  const handleWithdrawGiftCard = () => {
    Alert.alert(
      '✅ Demande envoyée',
      'Votre carte-cadeau vous sera envoyée par courriel.',
    );
  };

  const handleWithdraw = () => {
    if (!withdrawable) {
      Alert.alert(
        'Solde insuffisant',
        `Il vous faut au moins 1 000 points (${formatCurrency(1, 'CAD')}) pour effectuer un retrait. Continuez à jouer !`,
      );
      return;
    }
    Alert.alert(
      'Demander un retrait',
      `Solde disponible : ${formatCurrency(balance, 'CAD')}\n\nChoisissez votre méthode de retrait :`,
      [
        { text: 'Virement Interac', onPress: handleWithdrawInterac },
        { text: 'Carte-cadeau', onPress: handleWithdrawGiftCard },
        { text: 'Annuler', style: 'cancel' },
      ],
    );
  };

  const activityIcon: Record<string, string> = {
    video: '🎬',
    game: '🎮',
    survey: '📋',
    tournament: '🏆',
    referral: '🤝',
  };

  return (
    <View style={styles.container}>
      <Header title="Mon Compte" showBackButton />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.username?.charAt(0).toUpperCase() ?? '?'}
            </Text>
          </View>
          <Text style={styles.username}>{user?.username}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>⭐ Niveau {user?.level}</Text>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceStat}>
            <Text style={styles.balanceLabel}>Solde actuel</Text>
            <Text style={styles.balanceValue}>
              {formatCurrency(balance, 'CAD')}
            </Text>
          </View>
          <View style={styles.balanceDivider} />
          <View style={styles.balanceStat}>
            <Text style={styles.balanceLabel}>Total gagné</Text>
            <Text style={styles.balanceValue}>
              {formatCurrency(pointsToCad(user?.totalEarned ?? 0), 'CAD')}
            </Text>
          </View>
          <View style={styles.balanceDivider} />
          <View style={styles.balanceStat}>
            <Text style={styles.balanceLabel}>Points</Text>
            <Text style={[styles.balanceValue, { color: COLORS.primary }]}>
              {formatNumber(user?.points ?? 0)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.withdrawButton,
            !withdrawable && styles.withdrawDisabled,
          ]}
          onPress={handleWithdraw}
          accessibilityLabel="Demander un retrait"
        >
          <Text style={styles.withdrawText}>
            💳 Demander un retrait
          </Text>
          {!withdrawable && (
            <Text style={styles.withdrawHint}>
              Min. 1 000 pts requis
            </Text>
          )}
        </TouchableOpacity>

        {/* Rewards Section */}
        <Text style={styles.sectionTitle}>🎁 Récompenses disponibles</Text>
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}

        {/* Earning History */}
        {earningHistory.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>📜 Historique des gains</Text>
            {earningHistory.slice(0, 10).map((event) => (
              <View key={event.id} style={styles.historyRow}>
                <Text style={styles.historyIcon}>
                  {activityIcon[event.type] ?? '⭐'}
                </Text>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyDesc}>{event.description}</Text>
                  <Text style={styles.historyDate}>
                    {formatDate(event.timestamp)}
                  </Text>
                </View>
                <Text style={styles.historyPoints}>
                  +{event.userShare} pts
                </Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    marginBottom: 12,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: 'bold',
  },
  username: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  email: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 10,
  },
  levelBadge: {
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  levelText: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: '700',
  },
  balanceCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    justifyContent: 'space-around',
  },
  balanceStat: {
    alignItems: 'center',
    flex: 1,
  },
  balanceDivider: {
    width: 1,
    backgroundColor: COLORS.surfaceVariant,
  },
  balanceLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 4,
  },
  balanceValue: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: 'bold',
  },
  withdrawButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  withdrawDisabled: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  withdrawText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  withdrawHint: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 4,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  historyIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  historyInfo: {
    flex: 1,
  },
  historyDesc: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  historyDate: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  historyPoints: {
    color: COLORS.success,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
