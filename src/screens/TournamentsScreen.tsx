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
import { useUserStore } from '../store/userStore';
import { COLORS } from '../utils/constants';
import { formatCurrency, formatNumber } from '../utils/helpers';
import { Tournament } from '../types/Tournament';

const SAMPLE_TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    title: 'Tournoi Quiz Québec – Printemps 2024',
    description:
      'Prouvez que vous êtes le meilleur quizzer du Québec ! Top 3 gagnent des prix.',
    status: 'active',
    prizePool: 500,
    currency: 'CAD',
    maxParticipants: 100,
    currentParticipants: 67,
    startDate: new Date(Date.now() - 86400000).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    gameType: 'Quiz',
    entryFee: 0,
    leaderboard: [
      { userId: 'u1', username: 'QuizKing', score: 9850, rank: 1, prize: 200 },
      { userId: 'u2', username: 'Brillant23', score: 9210, rank: 2, prize: 150 },
      { userId: 'u3', username: 'Génie88', score: 8900, rank: 3, prize: 100 },
    ],
  },
  {
    id: 't2',
    title: 'Tournoi Mémoire Flash – Semaine 14',
    description: 'Montrez que vous avez la mémoire la plus rapide.',
    status: 'upcoming',
    prizePool: 250,
    currency: 'CAD',
    maxParticipants: 50,
    currentParticipants: 12,
    startDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 9).toISOString(),
    gameType: 'Mémoire',
    entryFee: 0,
  },
  {
    id: 't3',
    title: 'Grand Tournoi Calcul Mental – Mars',
    description:
      'Le tournoi mensuel de calcul mental avec la plus grande cagnotte !',
    status: 'completed',
    prizePool: 1000,
    currency: 'CAD',
    maxParticipants: 200,
    currentParticipants: 200,
    startDate: new Date(Date.now() - 86400000 * 10).toISOString(),
    endDate: new Date(Date.now() - 86400000).toISOString(),
    gameType: 'Math',
    entryFee: 0,
    leaderboard: [
      { userId: 'u5', username: 'MathPro', score: 12000, rank: 1, prize: 400 },
      { userId: 'u6', username: 'Calculette', score: 11500, rank: 2, prize: 300 },
      {
        userId: 'u7',
        username: 'Rapide99',
        score: 11000,
        rank: 3,
        prize: 200,
      },
    ],
  },
];

const statusLabel: Record<Tournament['status'], string> = {
  active: '🟢 En cours',
  upcoming: '🟡 À venir',
  completed: '⚪ Terminé',
};

const statusColor: Record<Tournament['status'], string> = {
  active: COLORS.success,
  upcoming: COLORS.warning,
  completed: COLORS.textSecondary,
};

export const TournamentsScreen: React.FC = () => {
  const user = useUserStore((s) => s.user);

  const handleJoin = (tournament: Tournament) => {
    if (tournament.status !== 'active' && tournament.status !== 'upcoming') {
      return;
    }
    Alert.alert(
      `Rejoindre : ${tournament.title}`,
      `Cagnotte : ${formatCurrency(tournament.prizePool, tournament.currency)}\nParticipants : ${tournament.currentParticipants}/${tournament.maxParticipants}\n\nVoulez-vous participer à ce tournoi ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Participer !',
          onPress: () =>
            Alert.alert(
              '✅ Inscrit !',
              'Vous êtes inscrit au tournoi. Bonne chance !',
            ),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Tournois" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Participez aux tournois pour remporter de l'argent réel. Les tournois
          sont gratuits !
        </Text>

        {SAMPLE_TOURNAMENTS.map((tournament) => (
          <View key={tournament.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text
                style={[
                  styles.statusBadge,
                  { color: statusColor[tournament.status] },
                ]}
              >
                {statusLabel[tournament.status]}
              </Text>
              <Text style={styles.gameType}>{tournament.gameType}</Text>
            </View>

            <Text style={styles.title}>{tournament.title}</Text>
            <Text style={styles.description}>{tournament.description}</Text>

            <View style={styles.prizeRow}>
              <View style={styles.prizeItem}>
                <Text style={styles.prizeLabel}>Cagnotte</Text>
                <Text style={styles.prizeValue}>
                  {formatCurrency(tournament.prizePool, tournament.currency)}
                </Text>
              </View>
              <View style={styles.prizeItem}>
                <Text style={styles.prizeLabel}>Participants</Text>
                <Text style={styles.prizeValue}>
                  {tournament.currentParticipants}/{tournament.maxParticipants}
                </Text>
              </View>
              <View style={styles.prizeItem}>
                <Text style={styles.prizeLabel}>Entrée</Text>
                <Text style={[styles.prizeValue, { color: COLORS.success }]}>
                  Gratuit
                </Text>
              </View>
            </View>

            {tournament.leaderboard && tournament.leaderboard.length > 0 && (
              <View style={styles.leaderboard}>
                <Text style={styles.leaderboardTitle}>🏆 Classement</Text>
                {tournament.leaderboard.slice(0, 3).map((entry) => (
                  <View key={entry.userId} style={styles.leaderboardRow}>
                    <Text style={styles.rank}>
                      {entry.rank === 1
                        ? '🥇'
                        : entry.rank === 2
                          ? '🥈'
                          : '🥉'}
                    </Text>
                    <Text
                      style={[
                        styles.leaderboardName,
                        entry.userId === user?.id && styles.currentUser,
                      ]}
                    >
                      {entry.username}
                    </Text>
                    <Text style={styles.leaderboardScore}>
                      {formatNumber(entry.score)} pts
                    </Text>
                    <Text style={styles.leaderboardPrize}>
                      {formatCurrency(entry.prize, tournament.currency)}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {tournament.status !== 'completed' && (
              <TouchableOpacity
                style={[
                  styles.joinButton,
                  tournament.status === 'upcoming' && styles.upcomingButton,
                ]}
                onPress={() => handleJoin(tournament)}
                accessibilityLabel={`Rejoindre ${tournament.title}`}
              >
                <Text style={styles.joinText}>
                  {tournament.status === 'active'
                    ? 'Participer maintenant'
                    : "S'inscrire à l'avance"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
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
    paddingBottom: 32,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: '600',
  },
  gameType: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  prizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  prizeItem: {
    alignItems: 'center',
  },
  prizeLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 2,
  },
  prizeValue: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: 'bold',
  },
  leaderboard: {
    marginBottom: 12,
  },
  leaderboardTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rank: {
    fontSize: 16,
    marginRight: 8,
    width: 24,
  },
  leaderboardName: {
    color: COLORS.text,
    fontSize: 13,
    flex: 1,
  },
  currentUser: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  leaderboardScore: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginRight: 12,
  },
  leaderboardPrize: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'right',
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  upcomingButton: {
    backgroundColor: COLORS.surfaceVariant,
    borderWidth: 1,
    borderColor: COLORS.warning,
  },
  joinText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
