export interface RecipeStep {
  id: number;
  text: string;
  expectedOrder: number;
  icon: string;
}

export interface BugStep {
  text: string;
  isBug: boolean;
  explanation: string;
}

export interface BugChallenge {
  id: number;
  title: string;
  context: string;
  steps: BugStep[];
}

// NOTA IMPORTANTE: NESSUN NUMERO NEL TESTO! Gli studenti devono capire la logica sequenziale.
export const recipeStepsOriginal: RecipeStep[] = [
  {
    id: 1,
    expectedOrder: 1,
    icon: "🧼",
    text: "Lavare accuratamente le mani con sapone per 30 secondi e sciacquare la frutta fresca sotto l'acqua corrente"
  },
  {
    id: 2,
    expectedOrder: 2,
    icon: "🔪",
    text: "Sbucciare la mela e la banana e tagliarle a piccoli pezzi su un tagliere pulito e asciutto"
  },
  {
    id: 3,
    expectedOrder: 3,
    icon: "🥛",
    text: "Inserire la frutta a pezzetti nel bicchiere del frullatore e aggiungere il latte o bevanda vegetale"
  },
  {
    id: 4,
    expectedOrder: 4,
    icon: "🔄",
    text: "Chiudere saldamente il coperchio di sicurezza del frullatore e azionare le lame fino a ottenere una crema liscia"
  },
  {
    id: 5,
    expectedOrder: 5,
    icon: "🥤",
    text: "Versare il frullato fresco in un bicchiere e consumarlo subito per godere al massimo di vitamine e minerali"
  }
];

export const bugChallenges: BugChallenge[] = [
  {
    id: 1,
    title: "Debugging della Catena del Freddo & Igiene Domestica",
    context: "Stai esaminando l'algoritmo di conservazione della spesa appena arrivata a casa. Quale istruzione contiene un pericoloso 'bug' di contaminazione biologica?",
    steps: [
      {
        text: "Istruzione A: Riporre tempestivamente surgelati, yogurt e latte fresco nel congelatore e nel frigorifero",
        isBug: false,
        explanation: "Questa istruzione è corretta: preserva la catena del freddo e impedisce ai batteri di proliferare a temperatura ambiente."
      },
      {
        text: "Istruzione B: Appoggiare la carne cruda aperta e sgocciolante nel ripiano superiore direttamente sopra l'insalata già lavata",
        isBug: true,
        explanation: "BUG CRITICO INDIVIDUATO! 🐞 Questa è la classica 'contaminazione crociata': i liquidi e i batteri della carne cruda non devono mai gocciolare sui cibi pronti al consumo! La carne va sempre in basso e ben sigillata."
      },
      {
        text: "Istruzione C: Verificare che il termometro del frigorifero mantenga una temperatura compresa tra +2°C e +4°C",
        isBug: false,
        explanation: "Questa istruzione è corretta: è la temperatura ottimale raccomandata per la conservazione domestica sicura."
      },
      {
        text: "Istruzione D: Chiudere gli avanzi del pranzo in contenitori ermetici per alimenti prima di riporli",
        isBug: false,
        explanation: "Questa istruzione è corretta: evita scambi di odori e protegge gli alimenti dall'umidità e dall'ossigeno."
      }
    ]
  },
  {
    id: 2,
    title: "Debugging della Preparazione del Tagliere",
    context: "Uno chef sta preparando una cena in cucina. Un passaggio del suo algoritmo viola una regola igienica cruciale. Trovalo!",
    steps: [
      {
        text: "Istruzione A: Sciacquare e asciugare il tagliere in legno prima di iniziare a lavorare",
        isBug: false,
        explanation: "Istruzione corretta per iniziare con strumenti puliti."
      },
      {
        text: "Istruzione B: Tagliare il petto di pollo crudo e subito dopo usare lo stesso coltello e tagliere, senza lavarli, per affettare i pomodori dell'insalata fresca",
        isBug: true,
        explanation: "BUG IGIENICO INDIVIDUATO! 🐞 Mai utilizzare lo stesso tagliere o lo stesso coltello per carne/pesce crudi e verdure crude senza aver prima lavato accuratamente gli strumenti con acqua calda e detersivo."
      },
      {
        text: "Istruzione C: Riporre i pomodori affettati in una ciotola di vetro pulita condendoli con olio EVO",
        isBug: false,
        explanation: "Istruzione corretta e salutare."
      },
      {
        text: "Istruzione D: Cuocere accuratamente il pollo in padella fino al cuore della carne",
        isBug: false,
        explanation: "Istruzione corretta: la carne bianca va sempre cotta a fondo per eliminare eventuali batteri come la Salmonella."
      }
    ]
  }
];
