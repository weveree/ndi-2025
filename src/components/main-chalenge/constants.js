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
        description: 'Système d’exploitation propriétaire largement utilisé dans les établissements scolaires.',
        price: -120,
        energy: -70,
      },
    ],
    [
      {
        name: 'Linux (Ubuntu, Debian, Mint, Fedora...)',
        description: 'Systèmes libres, stables et adaptés aux établissements éducatifs.',
        price: 0,
        energy: -30,
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
    ],
    [
      {
        name: 'LibreOffice',
        description: 'Suite bureautique libre compatible avec les formats MS Office.',
        price: 0,
        energy: -25,
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
    ],
    [
      {
        name: 'Nextcloud',
        description: 'Cloud auto-hébergeable pour fichiers, visioconférences et travail collaboratif.',
        price: 0,
        energy: -30,
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
    ],
    [
      {
        name: 'Jitsi',
        description: 'Solution de visioconférence libre, sans collecte de données.',
        price: 0,
        energy: -35,
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
    ],
    [
      {
        name: 'Firefox',
        description: 'Navigateur libre respectueux de la vie privée.',
        price: 0,
        energy: -40,
      },
    ],
  ],

  'question-mark': [
    [
      {
        name: 'Google Search',
        description: 'Moteur de recherche hégémonique et basé sur la collecte de données.',
        price: 0,
        energy: -95,
      },
      {
        name: 'ChatGPT (version propriétaire)',
        description: "IA fermée dépendante d'infrastructures massives.",
        price: 20,
        energy: -85,
      },
    ],
    [
      {
        name: 'Ecosia',
        description: 'Moteur de recherche dont les revenus servent à planter des arbres.',
        price: 0,
        energy: -30,
      },
      {
        name: 'DuckDuckGo / Qwant',
        description: 'Moteurs de recherche plus respectueux de la vie privée.',
        price: 0,
        energy: -35,
      },
    ],
  ],
};
