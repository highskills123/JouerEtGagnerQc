import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Header } from '../components/Common/Header';
import { Card } from '../components/Common/Card';
import { useUserStore } from '../store/userStore';
import { COLORS } from '../utils/constants';
import { formatNumber, pointsToCad, formatCurrency } from '../utils/helpers';
import { BottomTabParamList } from '../components/Navigation/BottomTabNavigator';
import { RootStackParamList } from '../components/Navigation/RootNavigator';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ActivityButtonProps {
  icon: string;
  label: string;
  description: string;
  color: string;
  onPress: () => void;
}

const ActivityButton: React.FC<ActivityButtonProps> = ({
  icon,
  label,
  description,
  color,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.activityButton, { borderColor: color }]}
    onPress={onPress}
    activeOpacity={0.85}
    accessibilityRole="button"
    accessibilityLabel={label}
  >
    <Text style={styles.activityIcon}>{icon}</Text>
    <View style={styles.activityInfo}>
      <Text style={styles.activityLabel}>{label}</Text>
      <Text style={styles.activityDescription}>{description}</Text>
    </View>
    <Text style={[styles.activityArrow, { color }]}>›</Text>
  </TouchableOpacity>
);

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const user = useUserStore((s) => s.user);
  const balance = pointsToCad(user?.points ?? 0);

  return (
    <View style={styles.container}>
      <Header showAccountButton title="JouerEtGagner" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card */}
        <Card style={styles.balanceCard} accent>
          <Text style={styles.balanceLabel}>Solde disponible</Text>
          <Text style={styles.balanceAmount}>
            {formatCurrency(balance, 'CAD')}
          </Text>
          <Text style={styles.pointsText}>
            {formatNumber(user?.points ?? 0)} points
          </Text>
        </Card>

        {/* Activity Buttons */}
        <Text style={styles.sectionTitle}>Gagner des récompenses</Text>

        <ActivityButton
          icon="🎬"
          label="Regarder des vidéos"
          description="Gagnez 10 pts par vidéo regardée"
          color={COLORS.secondary}
          onPress={() => navigation.navigate('Videos')}
        />

        <ActivityButton
          icon="🎮"
          label="Jouer à des jeux"
          description="Gagnez 25 pts par partie jouée"
          color={COLORS.primary}
          onPress={() => navigation.navigate('Games')}
        />

        <ActivityButton
          icon="📋"
          label="Répondre à des sondages"
          description="Gagnez 50 pts par sondage complété"
          color={COLORS.accent}
          onPress={() => navigation.navigate('Surveys')}
        />

        {/* Info Banner */}
        <Card style={styles.infoBanner}>
          <Text style={styles.infoTitle}>💡 Comment ça marche ?</Text>
          <Text style={styles.infoText}>
            Complétez des activités pour gagner des points. Vos points
            représentent 40 % des revenus générés. Échangez-les contre des
            cartes-cadeaux ou de l'argent réel !
          </Text>
        </Card>
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
  balanceCard: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 8,
  },
  balanceLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  balanceAmount: {
    color: COLORS.gold,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pointsText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  activityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
  },
  activityIcon: {
    fontSize: 32,
    marginRight: 14,
  },
  activityInfo: {
    flex: 1,
  },
  activityLabel: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  activityDescription: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  activityArrow: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  infoBanner: {
    marginTop: 16,
  },
  infoTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  infoText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
});
