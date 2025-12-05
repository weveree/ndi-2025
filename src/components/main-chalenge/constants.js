import warningModel from '@/assets/models/low_poly_computer.glb?url';
import bellModel from '@/assets/models/low_poly_office_chair.glb?url';
import loudspeakerModel from '@/assets/models/cloud_file_storage.glb?url';
import moneyBagModel from '@/assets/models/webcam.glb?url';
import policeLampModel from '@/assets/models/low_poly_computer.glb?url';
import questionMarkModel from '@/assets/models/student_penguin.glb?url';

export const ALERT_MODELS = {
  warning: { url: warningModel, scale: 1, author: {url: 'https://sketchfab.com/glcalde', name: 'glcalde'} },
  bell: { url: bellModel, scale: 2, author: {url: 'https://sketchfab.com/NoodleBaguette', name: 'NoodleBaguette'} },
  loudspeaker: { url: loudspeakerModel, scale: 1, author: {url: 'https://sketchfab.com/aniljaco', name: 'aniljaco'} },
  'money-bag': { url: moneyBagModel, scale: 2, author: {url: 'https://sketchfab.com/bswlife', name: 'bswlife'} },
  'police-lamp': { url: policeLampModel, scale: 1, author: {url: 'https://sketchfab.com/NoodleBaguette', name: 'NoodleBaguette'} },
  'question-mark': { url: questionMarkModel, scale: 0.01, author: {url: 'https://sketchfab.com/daynke', name: 'daynke'} },
};

export const ALERT_POSITIONS = [
  { x: -40, y: -30 },
  { x: -400, y: -130 },
  { x: 400, y: 230 },
  { x: -500, y: 100 },
  { x: 500, y: -30 },
  { x: 600, y: 200 },
  { x: -160, y: 70 },
  { x: 260, y: 150 },
  { x: -250, y: -30 },
  { x: -40, y: -130 },
  { x: -440, y: -30 },
  { x: -200, y: 230 },
];

export const ALERTS = {
  warning: [
    [
      {
        name: 'Microsoft Windows',
        description: "Système d'exploitation propriétaire largement utilisé dans les établissements scolaires.",
        price: -120,
        energy: -70,
      },
      {
        name: 'macOS',
        description: 'Système propriétaire Apple, coûteux mais apprécié pour son interface.',
        price: -200,
        energy: -65,
      },
      {
        name: 'Chrome OS',
        description: 'Système Google dépendant du cloud et collectant massivement les données.',
        price: -80,
        energy: -75,
      },
      {
        name: 'Windows Server',
        description: 'Serveur propriétaire Microsoft nécessitant licences et maintenance coûteuses.',
        price: -300,
        energy: -85,
      },
    ],
    [
      {
        name: 'Linux (Ubuntu, Debian, Mint, Fedora...)',
        description: 'Systèmes libres, stables et adaptés aux établissements éducatifs.',
        price: 0,
        energy: -30,
      },
      {
        name: 'Emmabuntüs',
        description: 'Distribution Linux éducative conçue pour le reconditionnement de PC.',
        price: 0,
        energy: -25,
      },
      {
        name: 'Primtux',
        description: 'Distribution française spécialement conçue pour les écoles primaires.',
        price: 0,
        energy: -28,
      },
      {
        name: 'Debian Edu / Skolelinux',
        description: 'Solution libre complète pour équiper tout un établissement scolaire.',
        price: 0,
        energy: -32,
      },
    ],
  ],

  bell: [
    [
      {
        name: 'Microsoft Office 365',
        description: 'Suite bureautique payante, stockant beaucoup dans le cloud Microsoft.',
        price: -60,
        energy: -75,
      },
      {
        name: 'Microsoft Office 365',
        description: 'Suite bureautique payante, stockant beaucoup dans le cloud Microsoft.',
        price: -60,
        energy: -75,
      },
      {
        name: 'Microsoft Office 365',
        description: 'Suite bureautique payante, stockant beaucoup dans le cloud Microsoft.',
        price: -60,
        energy: -75,
      },
      {
        name: 'Microsoft Office 365',
        description: 'Suite bureautique payante, stockant beaucoup dans le cloud Microsoft.',
        price: -60,
        energy: -75,
      },
      {
        name: 'Adobe Creative Cloud',
        description: 'Suite créative propriétaire par abonnement très coûteux.',
        price: -400,
        energy: -80,
      },
      {
        name: 'iWork (Pages, Numbers, Keynote)',
        description: "Suite bureautique Apple enfermant dans l'écosystème de la marque.",
        price: -50,
        energy: -68,
      },
      {
        name: 'WPS Office',
        description: 'Suite bureautique propriétaire chinoise avec publicités intégrées.',
        price: -40,
        energy: -70,
      },
      {
        name: 'Google Docs/Sheets/Slides',
        description: 'Suite bureautique cloud de Google nécessitant connexion permanente.',
        price: 0,
        energy: -82,
      },
    ],
    [
      {
        name: 'LibreOffice',
        description: 'Suite bureautique libre compatible avec les formats MS Office.',
        price: 0,
        energy: -25,
      },
      {
        name: 'OnlyOffice',
        description: 'Alternative libre avec interface moderne et collaboration temps réel.',
        price: 0,
        energy: -30,
      },
      {
        name: 'Collabora Online',
        description: 'Suite bureautique collaborative basée sur LibreOffice.',
        price: 0,
        energy: -28,
      },
      {
        name: 'Cryptpad',
        description: 'Suite collaborative chiffrée de bout en bout, respectueuse de la vie privée.',
        price: 0,
        energy: -20,
      },
      {
        name: 'GIMP / Inkscape / Scribus',
        description: 'Trio libre pour retouche photo, dessin vectoriel et mise en page.',
        price: 0,
        energy: -35,
      },
      {
        name: 'Calligra Suite',
        description: 'Suite bureautique KDE incluant traitement de texte et tableur.',
        price: 0,
        energy: -27,
      },
      {
        name: 'Etherpad / Framapad',
        description: 'Éditeurs collaboratifs en temps réel simples et efficaces.',
        price: 0,
        energy: -18,
      },
      {
        name: 'AbiWord / Gnumeric',
        description: 'Logiciels légers de traitement de texte et tableur.',
        price: 0,
        energy: -22,
      },
    ],
  ],

  loudspeaker: [
    [
      {
        name: 'Google Workspace for Education',
        description: 'Suite cloud de Google dédiée aux écoles, très centralisée.',
        price: 0,
        energy: -80,
      },
      {
        name: 'Microsoft 365 Education',
        description: "Cloud Microsoft pour l'éducation avec Teams et OneDrive.",
        price: -40,
        energy: -75,
      },
      {
        name: 'Dropbox Business',
        description: 'Service de stockage cloud propriétaire avec abonnement coûteux.',
        price: -150,
        energy: -72,
      },
      {
        name: 'Box for Education',
        description: 'Plateforme cloud américaine avec gestion centralisée des données.',
        price: -100,
        energy: -78,
      },
      {
        name: 'iCloud',
        description: "Service cloud Apple enfermant dans l'écosystème de la marque.",
        price: -60,
        energy: -70,
      },
      {
        name: 'WeTransfer Pro',
        description: 'Service de transfert de fichiers propriétaire par abonnement.',
        price: -120,
        energy: -68,
      },
    ],
    [
      {
        name: 'Nextcloud',
        description: 'Cloud auto-hébergeable pour fichiers, visioconférences et travail collaboratif.',
        price: 0,
        energy: -30,
      },
      {
        name: 'Seafile',
        description: 'Plateforme de synchronisation de fichiers open source et performante.',
        price: 0,
        energy: -32,
      },
      {
        name: 'ownCloud',
        description: 'Solution de cloud libre permettant le contrôle total de ses données.',
        price: 0,
        energy: -31,
      },
      {
        name: 'Cozy Cloud',
        description: 'Cloud personnel français respectueux de la vie privée.',
        price: 0,
        energy: -28,
      },
      {
        name: 'Syncthing',
        description: 'Synchronisation décentralisée de fichiers sans serveur central.',
        price: 0,
        energy: -22,
      },
      {
        name: 'Filestash',
        description: 'Interface web universelle pour accéder à différents stockages.',
        price: 0,
        energy: -25,
      },
    ],
  ],

  'money-bag': [
    [
      {
        name: 'Zoom',
        description: 'Plateforme de visio propriétaire.',
        price: -150,
        energy: -65,
      },
      {
        name: 'Microsoft Teams',
        description: "Outil de visioconférence intégré à l'écosystème Microsoft.",
        price: -100,
        energy: -70,
      },
      {
        name: 'Cisco Webex',
        description: "Solution de visioconférence d'entreprise très coûteuse.",
        price: -200,
        energy: -72,
      },
      {
        name: 'Google Meet',
        description: 'Visioconférence Google nécessitant un compte et collectant des données.',
        price: 0,
        energy: -75,
      },
      {
        name: 'GoToMeeting',
        description: 'Plateforme propriétaire avec abonnement élevé.',
        price: -180,
        energy: -68,
      },
      {
        name: 'Skype Entreprise',
        description: 'Solution Microsoft progressivement remplacée par Teams.',
        price: -90,
        energy: -66,
      },
    ],
    [
      {
        name: 'Jitsi',
        description: 'Solution de visioconférence libre, sans collecte de données.',
        price: 0,
        energy: -35,
      },
      {
        name: 'BigBlueButton',
        description: "Plateforme de visioconférence libre spécialement conçue pour l'enseignement.",
        price: 0,
        energy: -38,
      },
      {
        name: 'Galène',
        description: 'Serveur de visioconférence français léger et économe en ressources.',
        price: 0,
        energy: -30,
      },
      {
        name: 'Jami',
        description: 'Application de communication décentralisée peer-to-peer.',
        price: 0,
        energy: -28,
      },
      {
        name: 'Mumble',
        description: 'Logiciel de VoIP libre à faible latence pour la communication vocale.',
        price: 0,
        energy: -25,
      },
      {
        name: 'Element (Matrix)',
        description: 'Messagerie et visio décentralisée basée sur le protocole Matrix.',
        price: 0,
        energy: -32,
      },
    ],
  ],

  'police-lamp': [
    [
      {
        name: 'Google Chrome',
        description: 'Navigateur propriétaire extrêmement intrusif.',
        price: 0,
        energy: -90,
      },
      {
        name: 'Microsoft Edge',
        description: 'Navigateur Microsoft basé sur Chromium, collecte des données utilisateur.',
        price: 0,
        energy: -85,
      },
      {
        name: 'Opera',
        description: 'Navigateur propriétaire norvégien racheté par un consortium chinois.',
        price: 0,
        energy: -82,
      },
      {
        name: 'Safari',
        description: "Navigateur Apple enfermant dans l'écosystème de la marque.",
        price: 0,
        energy: -78,
      },
      {
        name: 'UC Browser',
        description: 'Navigateur chinois avec problèmes de sécurité et confidentialité.',
        price: 0,
        energy: -88,
      },
      {
        name: 'Vivaldi (propriétaire)',
        description: 'Navigateur basé sur Chromium avec composants propriétaires.',
        price: 0,
        energy: -75,
      },
    ],
    [
      {
        name: 'Firefox',
        description: 'Navigateur libre respectueux de la vie privée.',
        price: 0,
        energy: -40,
      },
      {
        name: 'Brave',
        description: 'Navigateur axé sur la vie privée avec bloqueur de publicités intégré.',
        price: 0,
        energy: -42,
      },
      {
        name: 'LibreWolf',
        description: 'Version de Firefox durcie pour une confidentialité maximale.',
        price: 0,
        energy: -38,
      },
      {
        name: 'Tor Browser',
        description: 'Navigateur pour navigation anonyme via le réseau Tor.',
        price: 0,
        energy: -45,
      },
      {
        name: 'Chromium (version libre)',
        description: 'Version open source de Chrome sans les composants propriétaires Google.',
        price: 0,
        energy: -48,
      },
      {
        name: 'Falkon',
        description: 'Navigateur léger basé sur QtWebEngine, respectueux de la vie privée.',
        price: 0,
        energy: -35,
      },
    ],
  ],
  'question-mark': [
    [
      {
        name: 'Un antivirus suffit pour être totalement protégé',
        description: 'Fausse sécurité : les antivirus ne protègent pas contre toutes les menaces.',
        price: 0,
        energy: -85,
      },
      {
        name: "Supprimer un fichier l'efface définitivement",
        description: 'Faux : les données restent récupérables sans suppression sécurisée.',
        price: 0,
        energy: -75,
      },
      {
        name: 'La navigation privée me rend anonyme',
        description: "Faux : elle cache seulement l'historique local, pas votre activité en ligne.",
        price: 0,
        energy: -80,
      },
      {
        name: "Un mot de passe complexe suffit s'il est long",
        description: 'Incomplet : sans double authentification, il reste vulnérable.',
        price: 0,
        energy: -70,
      },
      {
        name: 'Les logiciels gratuits sont forcément moins bons',
        description: 'Préjugé : de nombreux logiciels libres surpassent leurs équivalents payants.',
        price: 0,
        energy: -65,
      },
      {
        name: 'Le cloud est parfaitement sécurisé',
        description: 'Faux : vos données sont accessibles par le fournisseur et vulnérables aux piratages.',
        price: 0,
        energy: -90,
      },
      {
        name: "Je n'ai rien à cacher donc la vie privée m'indiffère",
        description: 'Raisonnement dangereux : la vie privée est un droit fondamental pour tous.',
        price: 0,
        energy: -95,
      },
      {
        name: 'Plus de RAM rend toujours un ordinateur plus rapide',
        description: "Faux : au-delà d'un certain seuil, l'impact est négligeable.",
        price: 0,
        energy: -60,
      },
    ],
    [
      {
        name: 'La sécurité repose sur plusieurs couches de protection',
        description: 'Vrai : antivirus + firewall + mises à jour + comportement prudent.',
        price: 0,
        energy: 85,
      },
      {
        name: 'Les données supprimées peuvent être récupérées',
        description: 'Vrai : utiliser un outil de suppression sécurisée pour effacer définitivement.',
        price: 0,
        energy: 75,
      },
      {
        name: 'La navigation privée ne protège que localement',
        description: 'Vrai : utilisez Tor ou un VPN pour un réel anonymat en ligne.',
        price: 0,
        energy: 80,
      },
      {
        name: 'La double authentification renforce significativement la sécurité',
        description: 'Vrai : elle ajoute une couche essentielle même avec un mot de passe fort.',
        price: 0,
        energy: 90,
      },
      {
        name: "Les logiciels libres peuvent être d'excellente qualité",
        description: 'Vrai : Linux, Firefox, LibreOffice rivalisent avec les solutions propriétaires.',
        price: 0,
        energy: 85,
      },
      {
        name: 'Le cloud signifie confier ses données à un tiers',
        description: "Vrai : privilégiez le chiffrement et l'auto-hébergement quand c'est possible.",
        price: 0,
        energy: 80,
      },
      {
        name: 'La vie privée numérique est un droit à protéger',
        description: "Vrai : elle protège la liberté d'expression et prévient les abus de pouvoir.",
        price: 0,
        energy: 95,
      },
      {
        name: "L'optimisation logicielle est aussi importante que le matériel",
        description: 'Vrai : un système léger et bien configuré peut surpasser un PC surpuissant.',
        price: 0,
        energy: 75,
      },
    ],
  ],
};
