# JouerEtGagner 🎮🎁

Application mobile de récompenses – Gagnez de l'argent en jouant !

## Description

JouerEtGagner est une application mobile React Native (Expo) qui permet aux utilisateurs de gagner des cartes-cadeaux ou de l'argent réel en :
- 🎬 **Regardant des vidéos publicitaires**
- 🎮 **Jouant à des mini-jeux**
- 📋 **Répondant à des sondages**
- 🏆 **Participant à des tournois**

### Modèle de revenus
- **60%** des revenus publicitaires reviennent à l'opérateur de l'application
- **40%** des revenus sont redistribués aux utilisateurs sous forme de points

## Structure du projet

```
JouerEtGagner/
├── package.json
├── app.json
├── tsconfig.json
├── babel.config.js
├── .env.example
└── src/
    ├── App.tsx
    ├── screens/
    │   ├── HomeScreen.tsx          # Écran principal
    │   ├── VideosScreen.tsx        # Regarder des vidéos
    │   ├── GamesScreen.tsx         # Jouer à des jeux
    │   ├── SurveysScreen.tsx       # Répondre à des sondages
    │   ├── TournamentsScreen.tsx   # Tournois
    │   ├── FriendsScreen.tsx       # Amis & parrainage
    │   ├── SettingsScreen.tsx      # Options
    │   └── AccountDetailsScreen.tsx # Détails du compte
    ├── components/
    │   ├── Navigation/
    │   │   ├── BottomTabNavigator.tsx
    │   │   └── RootNavigator.tsx
    │   ├── Common/
    │   │   ├── Header.tsx
    │   │   ├── Button.tsx
    │   │   └── Card.tsx
    │   └── Reward/
    │       └── RewardCard.tsx
    ├── services/
    │   ├── RewardService.ts        # Logique de récompenses
    │   ├── AdMobService.ts         # Intégration Google AdMob
    │   ├── AuthService.ts          # Authentification
    │   └── ApiService.ts           # Appels API
    ├── store/
    │   ├── userStore.ts            # État utilisateur (Zustand)
    │   ├── rewardStore.ts          # État récompenses (Zustand)
    │   └── settingsStore.ts        # Paramètres (Zustand)
    ├── types/
    │   ├── User.ts
    │   ├── Reward.ts
    │   └── Tournament.ts
    └── utils/
        ├── constants.ts
        ├── helpers.ts
        └── validation.ts
```

## Navigation

- **Onglet Accueil** : Boutons « Regarder des vidéos », « Jouer à des jeux », « Répondre à des sondages » + bouton compte en haut à gauche
- **Onglet Tournois** : Liste des tournois actifs, à venir et terminés
- **Onglet Amis** : Système de parrainage, liste d'amis
- **Onglet Options** : Langue, notifications, son, confidentialité

## Installation

```bash
# Installer les dépendances
npm install

# Lancer l'application
npm start

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios
```

## Configuration

Copier `.env.example` vers `.env` et renseigner vos identifiants :

```bash
cp .env.example .env
```

- **ADMOB_APP_ID** : Identifiant de l'application Google AdMob
- **ADMOB_REWARDED_UNIT_ID** : ID de l'unité de publicité vidéo récompensée
- **API_BASE_URL** : URL de votre API backend

## Technologies utilisées

- **React Native** avec **Expo** (~50.0.0)
- **TypeScript** pour la sécurité du typage
- **React Navigation** v6 (Stack + Bottom Tabs)
- **Zustand** pour la gestion d'état
- **Google AdMob** via `expo-ads-admob` pour la monétisation

## Licence

Propriétaire – Tous droits réservés © JouerEtGagner