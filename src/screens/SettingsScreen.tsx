import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Header } from '../components/Common/Header';
import { useSettingsStore } from '../store/settingsStore';
import { COLORS } from '../utils/constants';

interface SettingRowProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}

const SettingToggle: React.FC<SettingRowProps> = ({
  label,
  description,
  value,
  onValueChange,
}) => (
  <View style={styles.settingRow}>
    <View style={styles.settingInfo}>
      <Text style={styles.settingLabel}>{label}</Text>
      {description ? (
        <Text style={styles.settingDesc}>{description}</Text>
      ) : null}
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: COLORS.surfaceVariant, true: COLORS.primary }}
      thumbColor={COLORS.text}
      accessibilityLabel={label}
    />
  </View>
);

export const SettingsScreen: React.FC = () => {
  const {
    language,
    notifications,
    notificationFrequency,
    soundEnabled,
    vibrationEnabled,
    adPersonalization,
    setLanguage,
    setNotifications,
    setNotificationFrequency,
    setSoundEnabled,
    setVibrationEnabled,
    setAdPersonalization,
  } = useSettingsStore();

  const handleLanguageChange = () => {
    Alert.alert('Langue / Language', 'Choisissez votre langue', [
      { text: 'Français', onPress: () => setLanguage('fr') },
      { text: 'English', onPress: () => setLanguage('en') },
      { text: 'Annuler', style: 'cancel' },
    ]);
  };

  const handleFrequencyChange = () => {
    Alert.alert('Fréquence des notifications', '', [
      {
        text: 'Toutes les notifications',
        onPress: () => setNotificationFrequency('all'),
      },
      {
        text: 'Importantes seulement',
        onPress: () => setNotificationFrequency('important'),
      },
      { text: 'Aucune', onPress: () => setNotificationFrequency('none') },
      { text: 'Annuler', style: 'cancel' },
    ]);
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Politique de confidentialité',
      'Vos données sont traitées conformément à la loi 25 du Québec et au RGPD. Nous ne vendons jamais vos données personnelles.',
    );
  };

  const handleTerms = () => {
    Alert.alert(
      'Conditions d\'utilisation',
      'En utilisant JouerEtGagner, vous acceptez de partager 60% des revenus publicitaires avec l\'opérateur de l\'application.',
    );
  };

  const frequencyLabels: Record<string, string> = {
    all: 'Toutes',
    important: 'Importantes',
    none: 'Aucune',
  };

  return (
    <View style={styles.container}>
      <Header title="Options" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Language */}
        <Text style={styles.sectionHeader}>Général</Text>
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={handleLanguageChange}
            accessibilityLabel="Changer la langue"
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Langue</Text>
              <Text style={styles.settingDesc}>
                {language === 'fr' ? 'Français' : 'English'}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <Text style={styles.sectionHeader}>Notifications</Text>
        <View style={styles.section}>
          <SettingToggle
            label="Activer les notifications"
            description="Recevez des alertes pour les nouveaux tournois et récompenses"
            value={notifications}
            onValueChange={setNotifications}
          />
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.settingRow}
            onPress={handleFrequencyChange}
            accessibilityLabel="Fréquence des notifications"
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Fréquence</Text>
              <Text style={styles.settingDesc}>
                {frequencyLabels[notificationFrequency]}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Sound & Vibration */}
        <Text style={styles.sectionHeader}>Son et haptique</Text>
        <View style={styles.section}>
          <SettingToggle
            label="Sons"
            description="Sons lors des gains et notifications"
            value={soundEnabled}
            onValueChange={setSoundEnabled}
          />
          <View style={styles.divider} />
          <SettingToggle
            label="Vibrations"
            description="Retour haptique lors des interactions"
            value={vibrationEnabled}
            onValueChange={setVibrationEnabled}
          />
        </View>

        {/* Privacy */}
        <Text style={styles.sectionHeader}>Confidentialité</Text>
        <View style={styles.section}>
          <SettingToggle
            label="Publicités personnalisées"
            description="Permettre la personnalisation des annonces (revenus plus élevés)"
            value={adPersonalization}
            onValueChange={setAdPersonalization}
          />
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.settingRow}
            onPress={handlePrivacyPolicy}
            accessibilityLabel="Politique de confidentialité"
          >
            <Text style={styles.settingLabel}>
              Politique de confidentialité
            </Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.settingRow}
            onPress={handleTerms}
            accessibilityLabel="Conditions d'utilisation"
          >
            <Text style={styles.settingLabel}>
              Conditions d'utilisation
            </Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* About */}
        <Text style={styles.sectionHeader}>À propos</Text>
        <View style={styles.section}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Version</Text>
            <Text style={styles.settingDesc}>1.0.0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Partage des revenus</Text>
            <Text style={[styles.settingDesc, { color: COLORS.accent }]}>
              Vous : 40% · App : 60%
            </Text>
          </View>
        </View>
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
  sectionHeader: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 4,
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '500',
  },
  settingDesc: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.surfaceVariant,
    marginLeft: 16,
  },
  chevron: {
    color: COLORS.textSecondary,
    fontSize: 20,
  },
});
