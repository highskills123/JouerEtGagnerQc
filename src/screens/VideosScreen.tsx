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

interface VideoItem {
  id: string;
  title: string;
  duration: string;
  points: number;
  category: string;
  watched: boolean;
}

const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'Découvrez les nouvelles voitures 2024',
    duration: '0:30',
    points: 10,
    category: 'Automobile',
    watched: false,
  },
  {
    id: 'v2',
    title: 'Offres spéciales printemps – Mode',
    duration: '0:45',
    points: 10,
    category: 'Mode',
    watched: false,
  },
  {
    id: 'v3',
    title: 'Application bancaire RBC – Gérez votre argent',
    duration: '0:30',
    points: 10,
    category: 'Finance',
    watched: false,
  },
  {
    id: 'v4',
    title: 'Recettes faciles – Cuisiner en 5 minutes',
    duration: '1:00',
    points: 10,
    category: 'Cuisine',
    watched: false,
  },
  {
    id: 'v5',
    title: 'Voyagez au Québec cet été',
    duration: '0:30',
    points: 10,
    category: 'Voyage',
    watched: false,
  },
];

export const VideosScreen: React.FC = () => {
  const [videos, setVideos] = useState(SAMPLE_VIDEOS);
  const [loading, setLoading] = useState<string | null>(null);

  const handleWatch = async (video: VideoItem) => {
    if (video.watched) {
      Alert.alert('Déjà regardé', 'Vous avez déjà regardé cette vidéo.');
      return;
    }
    setLoading(video.id);
    const watched = await AdMobService.showRewardedAd();
    setLoading(null);

    if (watched) {
      setVideos((prev) =>
        prev.map((v) => (v.id === video.id ? { ...v, watched: true } : v)),
      );
      RewardService.recordEarning(
        'video',
        `Vidéo regardée : ${video.title}`,
        video.points,
      );
      Alert.alert('🎉 Bravo !', `+${video.points} points gagnés !`);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Regarder des vidéos" showBackButton />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Regardez des publicités vidéo pour gagner des points. Chaque vidéo
          vaut 10 points.
        </Text>

        {videos.map((video) => (
          <View key={video.id} style={styles.videoCard}>
            <View style={styles.thumbnail}>
              <Text style={styles.playIcon}>{video.watched ? '✅' : '▶️'}</Text>
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              <Text style={styles.videoMeta}>
                {video.category} · {video.duration}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.watchButton,
                video.watched && styles.watchedButton,
              ]}
              onPress={() => handleWatch(video)}
              disabled={loading === video.id || video.watched}
              accessibilityLabel={`Regarder : ${video.title}`}
            >
              <Text style={styles.watchButtonText}>
                {loading === video.id
                  ? '...'
                  : video.watched
                    ? '✓'
                    : `+${video.points}`}
              </Text>
            </TouchableOpacity>
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
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  playIcon: {
    fontSize: 24,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  videoMeta: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  watchButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 50,
    alignItems: 'center',
  },
  watchedButton: {
    backgroundColor: COLORS.accent,
  },
  watchButtonText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
  },
});
