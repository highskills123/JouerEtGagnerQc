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
import { COLORS } from '../utils/constants';

interface SurveyQuestion {
  id: string;
  text: string;
  options: string[];
  answered: boolean;
  selectedOption: number | null;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  points: number;
  estimatedTime: string;
  category: string;
  questions: SurveyQuestion[];
  completed: boolean;
}

const SAMPLE_SURVEYS: Survey[] = [
  {
    id: 's1',
    title: 'Sondage consommation alimentaire',
    description: 'Dites-nous vos habitudes alimentaires',
    points: 50,
    estimatedTime: '2 min',
    category: 'Style de vie',
    completed: false,
    questions: [
      {
        id: 'q1',
        text: 'Combien de fois par semaine mangez-vous au restaurant ?',
        options: ['Jamais', '1-2 fois', '3-5 fois', 'Tous les jours'],
        answered: false,
        selectedOption: null,
      },
      {
        id: 'q2',
        text: 'Quel type de cuisine préférez-vous ?',
        options: ['Québécoise', 'Italienne', 'Asiatique', 'Mexicaine'],
        answered: false,
        selectedOption: null,
      },
    ],
  },
  {
    id: 's2',
    title: 'Sondage technologie mobile',
    description: 'Partagez votre expérience mobile',
    points: 50,
    estimatedTime: '3 min',
    category: 'Technologie',
    completed: false,
    questions: [
      {
        id: 'q1',
        text: 'Quel est votre système d\'exploitation mobile ?',
        options: ['Android', 'iOS', 'Les deux', 'Autre'],
        answered: false,
        selectedOption: null,
      },
      {
        id: 'q2',
        text: 'Combien d\'heures par jour passez-vous sur votre téléphone ?',
        options: ['Moins de 1h', '1-3h', '3-6h', 'Plus de 6h'],
        answered: false,
        selectedOption: null,
      },
    ],
  },
  {
    id: 's3',
    title: 'Sondage divertissement',
    description: 'Vos préférences en matière de divertissement',
    points: 50,
    estimatedTime: '2 min',
    category: 'Divertissement',
    completed: false,
    questions: [
      {
        id: 'q1',
        text: 'Quelle plateforme de streaming utilisez-vous ?',
        options: ['Netflix', 'Amazon Prime', 'Disney+', 'Illico'],
        answered: false,
        selectedOption: null,
      },
      {
        id: 'q2',
        text: 'Combien de films regardez-vous par mois ?',
        options: ['0-2', '3-5', '6-10', 'Plus de 10'],
        answered: false,
        selectedOption: null,
      },
    ],
  },
];

export const SurveysScreen: React.FC = () => {
  const [surveys, setSurveys] = useState(SAMPLE_SURVEYS);
  const [activeSurveyId, setActiveSurveyId] = useState<string | null>(null);

  const activeSurvey = surveys.find((s) => s.id === activeSurveyId);

  const handleAnswer = (
    surveyId: string,
    questionId: string,
    optionIndex: number,
  ) => {
    setSurveys((prev) =>
      prev.map((s) =>
        s.id === surveyId
          ? {
              ...s,
              questions: s.questions.map((q) =>
                q.id === questionId
                  ? { ...q, answered: true, selectedOption: optionIndex }
                  : q,
              ),
            }
          : s,
      ),
    );
  };

  const handleSubmit = (survey: Survey) => {
    const allAnswered = survey.questions.every((q) => q.answered);
    if (!allAnswered) {
      Alert.alert(
        'Sondage incomplet',
        'Veuillez répondre à toutes les questions.',
      );
      return;
    }

    setSurveys((prev) =>
      prev.map((s) => (s.id === survey.id ? { ...s, completed: true } : s)),
    );
    setActiveSurveyId(null);
    RewardService.recordEarning(
      'survey',
      `Sondage complété : ${survey.title}`,
      survey.points,
    );
    Alert.alert('🎉 Merci !', `+${survey.points} points gagnés !`);
  };

  if (activeSurvey) {
    return (
      <View style={styles.container}>
        <Header title={activeSurvey.title} showBackButton />
        <ScrollView contentContainerStyle={styles.scroll}>
          {activeSurvey.questions.map((question, qIndex) => (
            <View key={question.id} style={styles.questionCard}>
              <Text style={styles.questionText}>
                {qIndex + 1}. {question.text}
              </Text>
              {question.options.map((option, oIndex) => (
                <TouchableOpacity
                  key={oIndex}
                  style={[
                    styles.optionButton,
                    question.selectedOption === oIndex &&
                      styles.selectedOption,
                  ]}
                  onPress={() =>
                    handleAnswer(activeSurvey.id, question.id, oIndex)
                  }
                  accessibilityLabel={option}
                >
                  <Text
                    style={[
                      styles.optionText,
                      question.selectedOption === oIndex &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => handleSubmit(activeSurvey)}
            accessibilityLabel="Soumettre le sondage"
          >
            <Text style={styles.submitText}>
              Soumettre (+{activeSurvey.points} pts)
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Répondre à des sondages" showBackButton />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Complétez des sondages pour gagner 50 points chacun. Votre opinion
          compte !
        </Text>

        {surveys.map((survey) => (
          <View key={survey.id} style={styles.surveyCard}>
            <View style={styles.surveyHeader}>
              <Text style={styles.surveyCategory}>{survey.category}</Text>
              {survey.completed && (
                <Text style={styles.completedBadge}>✓ Complété</Text>
              )}
            </View>
            <Text style={styles.surveyTitle}>{survey.title}</Text>
            <Text style={styles.surveyDescription}>{survey.description}</Text>
            <View style={styles.surveyFooter}>
              <Text style={styles.surveyMeta}>
                ⏱ {survey.estimatedTime} · {survey.points} pts
              </Text>
              <TouchableOpacity
                style={[
                  styles.startButton,
                  survey.completed && styles.completedButton,
                ]}
                onPress={() =>
                  survey.completed
                    ? Alert.alert('Sondage déjà complété', 'Revenez demain pour de nouveaux sondages.')
                    : setActiveSurveyId(survey.id)
                }
                accessibilityLabel={`Commencer ${survey.title}`}
              >
                <Text style={styles.startButtonText}>
                  {survey.completed ? '✓' : 'Commencer'}
                </Text>
              </TouchableOpacity>
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
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  surveyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  surveyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  surveyCategory: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  completedBadge: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  surveyTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  surveyDescription: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 12,
  },
  surveyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  surveyMeta: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  startButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  completedButton: {
    backgroundColor: COLORS.surfaceVariant,
  },
  startButtonText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
  },
  questionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  questionText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '33',
  },
  optionText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  selectedOptionText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
