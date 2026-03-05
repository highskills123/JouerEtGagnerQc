import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Header } from '../components/Common/Header';
import { RewardService } from '../services/RewardService';
import { AdMobService } from '../services/AdMobService';
import { COLORS } from '../utils/constants';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: string;
  playCount: number;
  maxPlayCount: number;
}

const GAMES: Game[] = [
  {
    id: 'g1',
    title: 'Quiz Québec',
    description: 'Testez vos connaissances sur le Québec',
    icon: '🧠',
    points: 25,
    category: 'Quiz',
    playCount: 0,
    maxPlayCount: 5,
  },
  {
    id: 'g2',
    title: 'Mémoire Express',
    description: 'Trouvez les paires en un minimum de coups',
    icon: '🃏',
    points: 25,
    category: 'Mémoire',
    playCount: 0,
    maxPlayCount: 5,
  },
  {
    id: 'g3',
    title: 'Mots croisés',
    description: 'Complétez les mots croisés du jour',
    icon: '📝',
    points: 30,
    category: 'Mots',
    playCount: 0,
    maxPlayCount: 3,
  },
  {
    id: 'g4',
    title: 'Calcul Mental',
    description: 'Résolvez des équations mathématiques',
    icon: '🔢',
    points: 20,
    category: 'Math',
    playCount: 0,
    maxPlayCount: 10,
  },
  {
    id: 'g5',
    title: 'Devinettes',
    description: 'Trouvez la réponse aux devinettes',
    icon: '💡',
    points: 15,
    category: 'Devinettes',
    playCount: 0,
    maxPlayCount: 10,
  },
];

export const GamesScreen: React.FC = () => {
  const [games, setGames] = useState(GAMES);
  const [loading, setLoading] = useState<string | null>(null);

  const handlePlay = async (game: Game) => {
    if (game.playCount >= game.maxPlayCount) {
      Alert.alert(
        'Limite atteinte',
        `Vous avez atteint la limite de ${game.maxPlayCount} parties pour aujourd'hui. Revenez demain !`,
      );
      return;
    }
    setLoading(game.id);
    // Show an interstitial ad before the game
    await AdMobService.showInterstitialAd();
    setLoading(null);

    // Simulate playing the game
    Alert.alert(
      `🎮 ${game.title}`,
      'Partie simulée ! En production, le jeu complet sera lancé ici.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Partie terminée (+pts)',
          onPress: () => {
            setGames((prev) =>
              prev.map((g) =>
                g.id === game.id
                  ? { ...g, playCount: g.playCount + 1 }
                  : g,
              ),
            );
            RewardService.recordEarning(
              'game',
              `Jeu joué : ${game.title}`,
              game.points,
            );
            Alert.alert('🎉 Bravo !', `+${game.points} points gagnés !`);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Jouer à des jeux" showBackButton />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Jouez à des mini-jeux pour gagner des points. Chaque jeu peut être
          joué plusieurs fois par jour.
        </Text>

        {games.map((game) => {
          const isMaxed = game.playCount >= game.maxPlayCount;
          return (
            <View key={game.id} style={styles.gameCard}>
              <Text style={styles.gameIcon}>{game.icon}</Text>
              <View style={styles.gameInfo}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameDescription}>{game.description}</Text>
                <Text style={styles.gameMeta}>
                  {game.category} · {game.points} pts · {game.playCount}/
                  {game.maxPlayCount} parties
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.playButton,
                  isMaxed && styles.maxedButton,
                ]}
                onPress={() => handlePlay(game)}
                disabled={loading === game.id || isMaxed}
                accessibilityLabel={`Jouer à ${game.title}`}
              >
                <Text style={styles.playButtonText}>
                  {loading === game.id ? '...' : isMaxed ? 'Terminé' : 'Jouer'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
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
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  gameIcon: {
    fontSize: 36,
    marginRight: 12,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  gameDescription: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  gameMeta: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  playButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  maxedButton: {
    backgroundColor: COLORS.surfaceVariant,
  },
  playButtonText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
  },
});
