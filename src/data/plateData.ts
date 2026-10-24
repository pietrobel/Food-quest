import { PlateIngredient, PlateChallengeLevel } from '../types';

export const plateIngredients: PlateIngredient[] = [
  // VERDURA E FRUTTA (50% del piatto sano)
  {
    id: 'spinaci',
    name: 'Spinaci saltati al vapore',
    icon: '🥬',
    category: 'veg',
    description: 'Ricchi di folati, ferro non-eme, vitamina C e fibre delicate per l\'intestino.'
  },
  {
    id: 'pomodori',
    name: 'Pomodori e Carote a fette',
    icon: '🥕',
    category: 'veg',
    description: 'Forniscono beta-carotene, licopene antiossidante e una croccantezza naturale.'
  },
  {
    id: 'broccoletti',
    name: 'Cime di Broccolo al vapore',
    icon: '🥦',
    category: 'veg',
    description: 'Straordinaria miniera di glucosinolati protettivi, potassio e vitamina K.'
  },
  {
    id: 'mela',
    name: 'Spicchi di Mela fresca',
    icon: '🍎',
    category: 'veg',
    description: 'La pectina della buccia modula l\'assorbimento degli zuccheri e dona freschezza.'
  },
  {
    id: 'frutti_bosco',
    name: 'Mirtilli e Frutti di bosco',
    icon: '🫐',
    category: 'veg',
    description: 'Contengono antocianine che proteggono la microcircolazione e la vista.'
  },

  // CEREALI INTEGRALI E TUBERI (25% del piatto)
  {
    id: 'riso_nero',
    name: 'Riso Integrale o Venere',
    icon: '🍚',
    category: 'grains',
    description: 'Carboidrati complessi a lento rilascio con crusca ricca di magnesio.'
  },
  {
    id: 'pane_segale',
    name: 'Fetta di Pane di Segale o Farro',
    icon: '🍞',
    category: 'grains',
    description: 'Farine macinate a pietra ricche di fibre insolubili ad alto potere saziante.'
  },
  {
    id: 'pasta_integrale',
    name: 'Pasta di Grano Duro Integrale',
    icon: '🍝',
    category: 'grains',
    description: 'Fornisce amido digerito gradualmente, ideale per sostenere lo studio e lo sport.'
  },
  {
    id: 'patata_dolce',
    name: 'Patata al cartoccio con buccia',
    icon: '🥔',
    category: 'grains',
    description: 'Tubero ricco di amidi e potassio: va conteggiato tra i carboidrati e non come verdura!'
  },

  // FONTI PROTEICHE SANE (25% del piatto)
  {
    id: 'lenticchie',
    name: 'Lenticchie o Ceci in umido',
    icon: '🫘',
    category: 'proteins',
    description: 'Proteine vegetali a basso impatto ecologico, ricche di ferro e senza colesterolo.'
  },
  {
    id: 'pesce_azzurro',
    name: 'Filetto di Sgombro o Salmone',
    icon: '🐟',
    category: 'proteins',
    description: 'Fornisce acidi grassi Omega-3 preziosi per le membrane cellulari e la concentrazione.'
  },
  {
    id: 'uova',
    name: 'Uovo sodo da galline all\'aperto',
    icon: '🥚',
    category: 'proteins',
    description: 'Proteine ad altissimo valore biologico, colina e luteina per il benessere visivo.'
  },
  {
    id: 'tofu_erbe',
    name: 'Tofu dorato alle erbe aromatiche',
    icon: '🧈',
    category: 'proteins',
    description: 'Fonte proteica vegetale a base di soia, ricca di calcio e versatile nei piatti.'
  },
  {
    id: 'ricotta',
    name: 'Ricotta fresca di siero',
    icon: '🧀',
    category: 'proteins',
    description: 'Latticino leggero ricco di proteine del siero ad alto assorbimento e calcio minerale.'
  },

  // CONDIMENTI E GRASSI BUONI
  {
    id: 'olio_evo',
    name: 'Un filo di Olio Extravergine d\'Oliva',
    icon: '🫒',
    category: 'fats_dairy',
    description: 'Il condimento per eccellenza: polifenoli e acido oleico che favoriscono le vitamine.'
  },
  {
    id: 'semi_mandorle',
    name: 'Gherigli di Noci e Semi di Zucca',
    icon: '🌰',
    category: 'fats_dairy',
    description: 'Aggiungono minerali (zinco, selenio) e croccantezza nobile al piatto.'
  }
];

export const plateChallengeLevels: PlateChallengeLevel[] = [
  {
    id: 1,
    title: "Livello 1: Il Piatto del Mangiar Sano Standard",
    description: "Componi un pranzo da veri campioni della nutrizione: riempi la metà del piatto con 2 porzioni di verdura/frutta, 1 porzione di cereali integrali e 1 porzione di proteine sane!",
    targetVeg: 2,
    targetGrains: 1,
    targetProteins: 1,
    bonusCondition: "Aggiungi olio EVO o frutta secca per un tocco da chef!"
  },
  {
    id: 2,
    title: "Livello 2: La Ricarica per lo Studente Sportivo",
    description: "Oggi pomeriggio c'è la partita di basket o calcetto! Componi un piatto ad alta densità energetica: servono carboidrati a lento rilascio, proteine magre digeribili e abbondante verdura ricca di potassio.",
    targetVeg: 2,
    targetGrains: 1,
    targetProteins: 1,
    bonusCondition: "Includi pesce azzurro o uovo come fonte proteica per gli Omega-3!"
  },
  {
    id: 3,
    title: "Livello 3: Sfida Green 100% Sostenibile",
    description: "Salute personale e salute del Pianeta sono collegate (Agenda 2030)! Crea un pasto interamente a base vegetale scegliendo i legumi (lenticchie o ceci) come fonte proteica.",
    targetVeg: 2,
    targetGrains: 1,
    targetProteins: 1,
    allowedItems: ['spinaci', 'pomodori', 'broccoletti', 'mela', 'frutti_bosco', 'riso_nero', 'pane_segale', 'pasta_integrale', 'patata_dolce', 'lenticchie', 'tofu_erbe', 'olio_evo', 'semi_mandorle'],
    bonusCondition: "Zero colesterolo e minima impronta di carbonio!"
  }
];
