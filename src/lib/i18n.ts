
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "connect_wallet": "Connect Wallet",
      "disconnect": "Disconnect",
      "connecting": "Connecting...",
      
      // Authentication
      "login": "Login",
      "signup": "Sign Up",
      "email": "Email",
      "password": "Password",
      "confirm_password": "Confirm Password",
      "forgot_password": "Forgot Password?",
      "already_have_account": "Already have an account?",
      "dont_have_account": "Don't have an account?",
      "sign_in_here": "Sign in here",
      "sign_up_here": "Sign up here",
      
      // App Title and Description
      "app_title": "MindChain",
      "app_subtitle": "Your decentralized mental health companion. Track your progress, earn rewards, and maintain complete control over your personal data.",
      
      // Features
      "private_secure": "100% Private & Secure",
      "private_secure_desc": "Your data is encrypted and stored decentrally. Only you have access to your personal journal.",
      "automatic_rewards": "Automatic Rewards",
      "automatic_rewards_desc": "Earn MIND tokens for your consistency and progress. Smart contracts ensure fair rewards.",
      "professional_access": "Access to Professionals",
      "professional_access_desc": "Consult psychologists directly via the platform. Secure payments through smart contracts.",
      "personalized_tracking": "Personalized Tracking",
      "personalized_tracking_desc": "Daily journaling, mood tracking, personal goals. Timestamped proof of your progress on blockchain.",
      "supportive_community": "Supportive Community",
      "supportive_community_desc": "Join an anonymous and supportive community. Share your victories, find support.",
      "total_control": "Total Control",
      "total_control_desc": "Your data belongs to you. Export, delete, or transfer your information whenever you want.",
      
      // Dashboard
      "current_streak": "Current Streak",
      "days": "days",
      "total_entries": "Total Entries",
      "level": "Level",
      "current_mood": "Current Mood",
      "weekly_progress": "Weekly Progress",
      "weekly_progress_desc": "You have completed {{percent}}% of your weekly goals",
      
      // Tabs
      "journal": "Journal",
      "mood": "Mood",
      "rewards": "Rewards",
      "community": "Community",
      
      // Journal
      "todays_journal": "Today's Journal",
      "encrypted": "Encrypted",
      "save": "Save",
      "saving": "Saving...",
      "journal_placeholder": "Express your thoughts, emotions, and reflections safely...",
      "writing_suggestions": "Writing Suggestions",
      "writing_suggestions_desc": "Need inspiration? Click on a suggestion to get started.",
      "privacy_notice": "100% Private and Secure",
      "privacy_notice_desc": "Your entries are end-to-end encrypted and stored decentrally. Only you have access to your personal data.",
      
      // Mood Tracking
      "how_do_you_feel": "How do you feel?",
      "daily_tracking": "Daily tracking",
      "save_mood": "Save my mood",
      "mood_saved": "Mood saved! 💚",
      "mood_saved_desc": "Your mood ({{rating}}/10) has been saved. +5 MIND tokens earned!",
      "weekly_trend": "Weekly Trend",
      "weekly_trend_desc": "Your mood over the last 7 days",
      
      // Mood labels
      "very_difficult": "Very difficult",
      "difficult": "Difficult",
      "not_great": "Not great",
      "below_average": "Below average",
      "neutral": "Neutral",
      "okay": "Okay",
      "good": "Good",
      "very_good": "Very good",
      "excellent": "Excellent",
      "fantastic": "Fantastic",
      
      // CTA
      "revolutionize_wellbeing": "Revolutionize Your Mental Wellbeing",
      "revolutionize_desc": "Join thousands of users who have already started their transformation with MindChain. Your journey to better wellbeing starts here.",
      "learn_more": "Learn More",
      
      // Theme
      "dark_mode": "Dark Mode",
      "light_mode": "Light Mode",
      "language": "Language",
    }
  },
  fr: {
    translation: {
      // Navigation
      "connect_wallet": "Connecter Wallet",
      "disconnect": "Déconnecter",
      "connecting": "Connexion...",
      
      // Authentication
      "login": "Connexion",
      "signup": "Inscription",
      "email": "Email",
      "password": "Mot de passe",
      "confirm_password": "Confirmer le mot de passe",
      "forgot_password": "Mot de passe oublié ?",
      "already_have_account": "Vous avez déjà un compte ?",
      "dont_have_account": "Vous n'avez pas de compte ?",
      "sign_in_here": "Connectez-vous ici",
      "sign_up_here": "Inscrivez-vous ici",
      
      // App Title and Description
      "app_title": "MindChain",
      "app_subtitle": "Votre compagnon de santé mentale décentralisé. Suivez vos progrès, gagnez des récompenses, et gardez le contrôle total de vos données personnelles.",
      
      // Features
      "private_secure": "100% Privé & Sécurisé",
      "private_secure_desc": "Vos données sont cryptées et stockées de manière décentralisée. Vous seul avez accès à votre journal intime.",
      "automatic_rewards": "Récompenses Automatiques",
      "automatic_rewards_desc": "Gagnez des MIND tokens pour votre régularité et vos progrès. Smart contracts garantissent des récompenses équitables.",
      "professional_access": "Accès aux Professionnels",
      "professional_access_desc": "Consultez des psychologues directement via la plateforme. Paiements sécurisés par smart contracts.",
      "personalized_tracking": "Suivi Personnalisé",
      "personalized_tracking_desc": "Journaling quotidien, suivi d'humeur, objectifs personnels. Preuves horodatées de vos progrès sur blockchain.",
      "supportive_community": "Communauté Bienveillante",
      "supportive_community_desc": "Rejoignez une communauté anonyme et soutenante. Partagez vos victoires, trouvez du soutien.",
      "total_control": "Contrôle Total",
      "total_control_desc": "Vos données vous appartiennent. Exportez, supprimez, ou transférez vos informations quand vous voulez.",
      
      // Dashboard
      "current_streak": "Série Actuelle",
      "days": "jours",
      "total_entries": "Entrées Totales",
      "level": "Niveau",
      "current_mood": "Humeur Actuelle",
      "weekly_progress": "Progrès cette semaine",
      "weekly_progress_desc": "Vous avez complété {{percent}}% de vos objectifs hebdomadaires",
      
      // Tabs
      "journal": "Journal",
      "mood": "Humeur",
      "rewards": "Récompenses",
      "community": "Communauté",
      
      // Journal
      "todays_journal": "Journal d'aujourd'hui",
      "encrypted": "Crypté",
      "save": "Sauvegarder",
      "saving": "Sauvegarde...",
      "journal_placeholder": "Exprimez vos pensées, émotions, et réflexions en toute sécurité...",
      "writing_suggestions": "Suggestions d'écriture",
      "writing_suggestions_desc": "Besoin d'inspiration ? Cliquez sur une suggestion pour commencer.",
      "privacy_notice": "100% Privé et Sécurisé",
      "privacy_notice_desc": "Vos entrées sont cryptées end-to-end et stockées de manière décentralisée. Seul vous avez accès à vos données personnelles.",
      
      // Mood Tracking
      "how_do_you_feel": "Comment vous sentez-vous ?",
      "daily_tracking": "Suivi quotidien",
      "save_mood": "Enregistrer mon humeur",
      "mood_saved": "Humeur enregistrée! 💚",
      "mood_saved_desc": "Votre humeur ({{rating}}/10) a été sauvegardée. +5 MIND tokens gagnés!",
      "weekly_trend": "Tendance de la semaine",
      "weekly_trend_desc": "Votre humeur au cours des 7 derniers jours",
      
      // Mood labels
      "very_difficult": "Très difficile",
      "difficult": "Difficile",
      "not_great": "Pas génial",
      "below_average": "Moyen-",
      "neutral": "Neutre",
      "okay": "Correct",
      "good": "Bien",
      "very_good": "Très bien",
      "excellent": "Excellent",
      "fantastic": "Fantastique",
      
      // CTA
      "revolutionize_wellbeing": "Révolutionnez Votre Bien-être Mental",
      "revolutionize_desc": "Rejoignez des milliers d'utilisateurs qui ont déjà commencé leur transformation avec MindChain. Votre voyage vers un meilleur bien-être commence ici.",
      "learn_more": "En savoir plus",
      
      // Theme
      "dark_mode": "Mode Sombre",
      "light_mode": "Mode Clair",
      "language": "Langue",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
