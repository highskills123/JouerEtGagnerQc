import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Header } from '../components/Common/Header';
import { useUserStore } from '../store/userStore';
import { COLORS } from '../utils/constants';
import { isValidReferralCode } from '../utils/validation';

interface Friend {
  id: string;
  username: string;
  level: number;
  points: number;
  joinedAt: string;
  referred: boolean;
}

const SAMPLE_FRIENDS: Friend[] = [
  {
    id: 'f1',
    username: 'Marie_QC',
    level: 3,
    points: 2400,
    joinedAt: '2024-01-15',
    referred: true,
  },
  {
    id: 'f2',
    username: 'LucTremblay',
    level: 5,
    points: 8900,
    joinedAt: '2024-02-03',
    referred: false,
  },
  {
    id: 'f3',
    username: 'Sophie88',
    level: 2,
    points: 1200,
    joinedAt: '2024-03-10',
    referred: true,
  },
];

export const FriendsScreen: React.FC = () => {
  const user = useUserStore((s) => s.user);
  const addPoints = useUserStore((s) => s.addPoints);
  const [friends] = useState(SAMPLE_FRIENDS);
  const [referralInput, setReferralInput] = useState('');

  const handleInvite = () => {
    const code = user?.referralCode ?? '';
    Alert.alert(
      'Inviter un ami',
      `Partagez votre code de parrainage :\n\n${code}\n\nVous gagnez 100 points pour chaque ami qui s'inscrit avec votre code !`,
      [
        {
          text: 'Copier le code',
          onPress: () => Alert.alert('Code copié !', code),
        },
        { text: 'Fermer', style: 'cancel' },
      ],
    );
  };

  const handleApplyReferral = () => {
    if (!isValidReferralCode(referralInput.trim())) {
      Alert.alert(
        'Code invalide',
        'Le format du code de parrainage est incorrect. Ex: JEG-ABCD-EFGH',
      );
      return;
    }
    addPoints(100);
    setReferralInput('');
    Alert.alert('🎉 Code appliqué !', '+100 points de bienvenue gagnés !');
  };

  return (
    <View style={styles.container}>
      <Header title="Amis" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Referral Section */}
        <View style={styles.referralCard}>
          <Text style={styles.referralTitle}>🤝 Parrainage</Text>
          <Text style={styles.referralSubtitle}>
            Invitez des amis et gagnez 100 points par ami inscrit
          </Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeLabel}>Votre code</Text>
            <Text style={styles.codeValue}>{user?.referralCode}</Text>
          </View>
          <TouchableOpacity
            style={styles.inviteButton}
            onPress={handleInvite}
            accessibilityLabel="Inviter un ami"
          >
            <Text style={styles.inviteText}>📤 Inviter un ami</Text>
          </TouchableOpacity>
        </View>

        {/* Apply Referral Code */}
        <View style={styles.applyCard}>
          <Text style={styles.sectionTitle}>Entrer un code de parrainage</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="JEG-XXXX-XXXX"
              placeholderTextColor={COLORS.textSecondary}
              value={referralInput}
              onChangeText={setReferralInput}
              autoCapitalize="characters"
              accessibilityLabel="Code de parrainage"
            />
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyReferral}
              accessibilityLabel="Appliquer le code"
            >
              <Text style={styles.applyText}>Appliquer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Friends List */}
        <Text style={styles.sectionTitle}>
          Mes amis ({friends.length})
        </Text>

        {friends.map((friend) => (
          <View key={friend.id} style={styles.friendCard}>
            <View style={styles.friendAvatar}>
              <Text style={styles.friendAvatarText}>
                {friend.username.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{friend.username}</Text>
              <Text style={styles.friendMeta}>
                Niveau {friend.level} · {friend.points} pts
              </Text>
              {friend.referred && (
                <Text style={styles.referredTag}>✓ Parrainé(e)</Text>
              )}
            </View>
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
  referralCard: {
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  referralTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  referralSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 12,
  },
  codeBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  codeLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 4,
  },
  codeValue: {
    color: COLORS.gold,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  inviteButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  inviteText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 15,
  },
  applyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: 10,
    padding: 12,
    color: COLORS.text,
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  friendAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  friendAvatarText: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  friendMeta: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  referredTag: {
    color: COLORS.accent,
    fontSize: 11,
    marginTop: 2,
  },
});
