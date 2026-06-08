import type { Locale } from "@/lib/locales";
import { experience, profile, proficiencies, projects, quickFacts } from "./data";

type Project = (typeof projects)[number];

const frenchProjectTranslations: Record<string, Partial<Project>> = {
  "sekoly-note": {
    subtitle: "Une app de gestion des notes",
    summary:
      "Une application mobile pour aider les enseignants à gérer leurs classes, saisir les notes des élèves et synchroniser les résultats avec le système de l'école.",
    objective:
      "Rendre la saisie des notes pratique en dehors du bureau, avec un flux mobile pour consulter les classes attribuées, saisir les notes par matière et session, puis synchroniser les résultats quand la connexion est disponible.",
    label: "Mission client",
    role: "Développement Flutter, gestion des données hors ligne et synchronisation mobile",
    keyFeatures: [
      "Inscription et connexion des enseignants via QR code.",
      "Synchronisation des classes, élèves, matières et affectations depuis le backend de l'école.",
      "Saisie des notes par classe, matière, session d'examen et période.",
      "Stockage local hors ligne pour les classes, élèves, matières, notes et tâches de synchronisation.",
      "Synchronisation des notes vers l'API de l'école avec suivi des éléments synchronisés et non synchronisés.",
      "Import/export CSV et Google Drive pour les flux de données scolaires de secours.",
    ],
  },
  tentron: {
    subtitle: "Une app compagnon wearable",
    summary:
      "L'application mobile officielle de Tentron Technologies pour connecter des appareils wearable, diffuser les données de mouvement et gérer les mises à jour firmware.",
    objective:
      "Construire une app compagnon fiable pour le matériel wearable de Tentron, afin de découvrir les appareils, connecter les brassards et télécommandes, collecter les données de mouvement et garder les mises à jour firmware accessibles sur mobile.",
    label: "Mission client",
    role: "Développement Flutter, intégration BLE, streaming MQTT et support de mise à jour firmware",
    keyFeatures: [
      "Scan BLE et connexion pour les brassards gauche et droit ainsi que les télécommandes.",
      "Collecte de données de mouvement depuis les flux accéléromètre et gyroscope.",
      "Publication MQTT des données de mouvement et des événements des appareils distants.",
      "Recherche des versions OTA et support des mises à jour Android DFU.",
      "Écrans d'appareils connectés pour la découverte, l'état et les flux spécifiques.",
    ],
  },
  drala: {
    subtitle: "Une app de budget",
    summary:
      "Une application de finances personnelles pour suivre revenus, dépenses, budgets, objectifs d'épargne et rapports mensuels avec synchronisation offline-first.",
    objective:
      "J'avais besoin d'une manière simple de suivre mes propres dépenses. Ce premier outil personnel a évolué en application de budget plus complète pour organiser les dépenses quotidiennes, planifier les objectifs et mieux comprendre les habitudes financières dans le temps.",
    role: "Développement Flutter, architecture offline-first et interface mobile",
    keyFeatures: [
      "Suivi des dépenses et revenus avec catégories et sous-catégories.",
      "Planification des budgets et gestion des objectifs d'épargne.",
      "Rapports mensuels avec résumés sous forme de graphiques.",
      "Cache local offline-first avec synchronisation différée vers Supabase.",
      "Sélection de devise avec taux de change synchronisés.",
      "Alertes de budget et notifications de rappel quotidiennes.",
    ],
    status: "Bientôt disponible sur les stores",
    statusDescription:
      "Les apps Android et iOS sont en préparation pour leur disponibilité sur les stores après les derniers contrôles de release et distribution.",
  },
  rohy: {
    subtitle: "Une app de favoris et coffre de liens",
    summary:
      "Une app de coffre de liens pour enregistrer, prévisualiser, organiser et retrouver des ressources utiles dans une expérience Flutter local-first.",
    objective:
      "Créer un endroit ciblé pour éviter que les liens importants se perdent entre conversations, onglets de navigateur et notes dispersées, tout en rendant les ressources enregistrées plus faciles à chercher, regrouper et rouvrir.",
    role: "Développement Flutter, architecture de base locale et interface mobile",
    keyFeatures: [
      "Enregistrement de liens avec URL normalisées, titres, domaines, descriptions, images d'aperçu, favicons et temps de lecture.",
      "Génération de résumés IA pour revoir les liens enregistrés plus facilement.",
      "Organisation des liens avec tags et collections personnalisées.",
      "Flux principal avec recherche, filtres et archivage.",
      "Vue détaillée avec panneaux d'aperçu et actions rapides pour ouvrir ou partager les ressources.",
    ],
    status: "En cours",
  },
  gasydia: {
    subtitle: "Location de voiture - chauffeur et guide",
    summary:
      "Une expérience web pour un service de location de voiture, chauffeur et guide, pensée autour d'un storytelling de voyage clair et d'une découverte simple des services.",
    objective:
      "Présenter les services de location de voiture, chauffeur et guide dans une expérience web responsive qui rend les options de voyage faciles à découvrir et comparer.",
    label: "Mission client",
    role: "Design web et implémentation frontend",
    keyFeatures: [
      "Mise en page responsive pour de grandes images de voyage et de service.",
      "Sections de services claires pour une lecture rapide.",
      "Navigation simple pour découvrir les offres de location, chauffeur et guide.",
    ],
  },
};

function getLocalizedProfile(locale: Locale) {
  if (locale === "en") return profile;

  return {
    ...profile,
    role: "Développeur mobile, web & IoT",
    location: "Basé à Antananarivo, Madagascar",
    headline:
      "Je développe des apps Flutter performantes et des produits numériques connectés.",
    summary:
      "Je développe des applications mobiles cross-platform, des applications web et des systèmes matériels embarqués. Je transforme des idées complexes en produits propres, fonctionnels et adaptés exactement à vos besoins.",
    contactBlurb: {
      opening: "Vous avez un problème concret à résoudre ?",
      emphasis: "Construisons la solution ensemble.",
      prompt: "Contactez-moi via l’une de ces options :",
    },
    contactFormOption:
      "Ou laissez un message via le formulaire de contact ci-dessous.",
  };
}

function getLocalizedQuickFacts(locale: Locale) {
  if (locale === "en") return quickFacts;

  return ["4+ ans", "Mobile & Web", "IoT & Firmware"];
}

function getLocalizedProficiencies(locale: Locale) {
  if (locale === "en") return proficiencies;

  const titles = [
    "Langages",
    "Frameworks",
    "Services & bases de données",
    "Outils",
  ];

  return {
    groups: proficiencies.groups.map((group, index) => ({
      ...group,
      title: titles[index] ?? group.title,
    })),
  };
}

function getLocalizedExperience(locale: Locale) {
  if (locale === "en") return experience;

  return [
    {
      ...experience[0],
      role: "Développeur mobile",
      location: "Suisse",
      workMode: "à distance",
      summary:
        "Développement et déploiement d'applications mobiles, collaboration avec les équipes design, backend et produit, optimisation d'apps existantes pour la performance de rendu et la réactivité, et gestion des releases iOS et Android.",
    },
    {
      ...experience[1],
      role: "Développeur mobile & IoT",
      location: "États-Unis",
      workMode: "à distance",
      summary:
        "Développement d'applications Flutter multiplateformes pour contrôler et superviser les solutions IoT de l'entreprise, avec contribution au firmware pour des appareils connectés fiables.",
    },
    {
      ...experience[2],
      role: "Développeur logiciel & IoT",
      workMode: "sur site",
      summary:
        "Pilotage du développement d'outils desktop internes et maintenance du firmware des appareils IoT, afin d'améliorer la productivité de l'équipe et la fiabilité des appareils.",
    },
  ];
}

export function getLocalizedProjects(locale: Locale) {
  if (locale === "en") return projects;

  return projects.map((project) => ({
    ...project,
    ...frenchProjectTranslations[project.slug],
  }));
}

export function getPortfolioContent(locale: Locale) {
  return {
    profile: getLocalizedProfile(locale),
    quickFacts: getLocalizedQuickFacts(locale),
    proficiencies: getLocalizedProficiencies(locale),
    experience: getLocalizedExperience(locale),
    projects: getLocalizedProjects(locale),
  };
}

export function getLocalizedProjectBySlug(locale: Locale, slug: string) {
  return getLocalizedProjects(locale).find((project) => project.slug === slug);
}
