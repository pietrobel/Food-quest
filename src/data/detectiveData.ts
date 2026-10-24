import { DetectiveCase } from '../types';

export const detectiveCases: DetectiveCase[] = [
  {
    id: 1,
    title: "Caso n. 1: I Cereali della Colazione 'Super Fit'",
    productName: "Crispy Choco Energy Flakes",
    subtitle: "Pubblicità sulla scatola: «Con tutta la forza naturale del grano dorato!»",
    marketingClaim: "Con vitamine B6 e Ferro! Per iniziare la giornata con un pieno di vigore!",
    label: {
      energyKcal: 412,
      energyKj: 1735,
      fatTotal: 8.5,
      fatSaturated: 3.2,
      carbsTotal: 74.0,
      carbsSugars: 32.5,
      fiber: 3.8,
      protein: 6.8,
      salt: 0.85,
      ingredientsList: "Farina di frumento raffinata (45%), ZUCCHERO (2° ingrediente), sciroppo di glucosio-fruttosio (4° ingrediente), cacao magro in polvere, olio di palma, emulsionante: lecitina di soia, sale, aromi, vitamine (B6, B12), ferro ridotto."
    },
    clue: "🔍 Indizio del Detective: Controlla la voce 'di cui zuccheri' e la posizione dello zucchero nella lista ingredienti obbligatoria!",
    question: "Cosa scopre l'indagine del detective analizzando questa etichetta nutrizionale?",
    options: [
      {
        text: "Che la lista ingredienti è priva di qualsiasi dolcificante e contiene solo farina d'avena purissima al 100%.",
        correct: false,
        explanation: "Falso: il primo ingrediente è farina raffinata e il secondo è zucchero da tavola!"
      },
      {
        text: "Che oltre un terzo del peso (32,5 g su 100 g) è formato da zuccheri semplici: è un dolce mascherato da cereale!",
        correct: true,
        explanation: "Elementare! Nonostante lo slogan salutistico, 32,5g di zuccheri su 100g indicano una massiccia presenza di zuccheri liberi aggiunti."
      },
      {
        text: "Che i valori nutrizionali obbligatori per legge sono facoltativi e non riflettono la composizione reale del cibo.",
        correct: false,
        explanation: "La tabella nutrizionale è disciplinata dal Regolamento UE 1169/2011 ed è legalmente vincolante e veritiera."
      }
    ],
    verdictTip: "Regola d'oro: Quando scegli cereali per la colazione, cerca prodotti con meno di 10-12g di zuccheri per 100g e cereali integrali al primo posto!"
  },
  {
    id: 2,
    title: "Caso n. 2: Lo Snack Salato 'Leggero e Sottile'",
    productName: "Sfogliette Croccanti al Rosmarino",
    subtitle: "Pubblicità: «Leggerezza da sgranocchiare, senza grassi idrogenati!»",
    marketingClaim: "Cotte al forno! Lo snack leggero ideale per la pausa studio!",
    label: {
      energyKcal: 440,
      energyKj: 1850,
      fatTotal: 14.0,
      fatSaturated: 1.8,
      carbsTotal: 67.0,
      carbsSugars: 2.1,
      fiber: 4.0,
      protein: 9.5,
      salt: 3.8,
      ingredientsList: "Farina di grano tenero tipo 0, olio di girasole alto oleico, SALE MARINO IODATO (3,8%), rosmarino disidratato (1,2%), estratto di malto d'orzo, agente lievitante: carbonato acido di sodio."
    },
    clue: "🔍 Indizio del Detective: Ispeziona attentamente il valore della riga 'Sale' e confrontalo con il limite OMS di 5 grammi al giorno!",
    question: "Quale trappola nutrizionale ha smascherato l'analisi del detective?",
    options: [
      {
        text: "Un contenuto di sale altissimo (3,8 g su 100 g): un solo pacchetto copre oltre metà del limite giornaliero dell'OMS!",
        correct: true,
        explanation: "Brillante deduzione! Spesso gli snack 'cotti al forno' compensano la minor quantità di grassi aumentando vertiginosamente il sale per stimolare l'appetito."
      },
      {
        text: "La presenza occulta di oltre cinquanta grammi di zucchero caramellato che annulla la croccantezza dello snack salato.",
        correct: false,
        explanation: "Gli zuccheri sono solo 2,1g, il vero problema nascosto qui è il sodio!"
      },
      {
        text: "L'utilizzo del rosmarino disidratato che altera le proprietà organolettiche rendendo lo snack non commestibile a scuola.",
        correct: false,
        explanation: "Il rosmarino è un'erba aromatica preziosa, non è affatto pericoloso."
      }
    ],
    verdictTip: "Un alimento è considerato 'ad alto contenuto di sale' se supera 1,2g - 1,5g di sale per 100g di prodotto!"
  },
  {
    id: 3,
    title: "Caso n. 3: Il Duello degli Yogurt da Banco Frigo",
    productName: "Dessert Cremoso Fragola & Panna",
    subtitle: "Confronto tra Yogurt Bianco Naturale vs Dessert Aromatizzato",
    marketingClaim: "Con latte fresco italiano e succo di fragole deliziose!",
    label: {
      energyKcal: 118,
      energyKj: 498,
      fatTotal: 4.2,
      fatSaturated: 2.7,
      carbsTotal: 16.5,
      carbsSugars: 15.2,
      fiber: 0.1,
      protein: 3.2,
      salt: 0.10,
      ingredientsList: "Yogurt (latte intero, fermenti lattici vivi), preparazione alla fragola (zucchero, purea di fragola 3,5%, sciroppo di glucosio, amido modificato di mais, colorante: carminio, correttore di acidità: acido citrico), zucchero aggiunto, aromi naturali."
    },
    clue: "🔍 Indizio del Detective: Uno yogurt bianco naturale contiene circa 4g di zuccheri (solo lattosio). Questo ne ha 15,2g!",
    question: "Cosa differenzia questo vasetto da un vero yogurt bianco naturale con fragole fresche a pezzetti aggiunte da te?",
    options: [
      {
        text: "È completamente privo di latte vaccino ed è stato preparato solo con acqua distillata e coloranti sintetici vietati.",
        correct: false,
        explanation: "La base di latte c'è, ma è arricchita con notevoli quantità di zuccheri e sciroppi."
      },
      {
        text: "Contiene ben 11 g di zuccheri aggiunti per vasetto (quasi 3 bustine!) con pochissima frutta reale (3,5%) e amidi.",
        correct: true,
        explanation: "Esatto! È più vicino a un budino dolce che a uno yogurt probiotico. La soluzione vincente è prendere yogurt bianco intero e metterci dentro vera frutta fresca!"
      },
      {
        text: "Fornisce meno calorie di un bicchiere di tè amaro perché i preparati alla fragola distruggono i nutrienti del latte.",
        correct: false,
        explanation: "Le calorie sono quasi il triplo rispetto a uno yogurt bianco magro naturale."
      }
    ],
    verdictTip: "Se vuoi uno yogurt alla frutta genuino: prendi yogurt naturale non zuccherato e aggiungi tu frutta di stagione tagliata al momento!"
  },
  {
    id: 4,
    title: "Caso n. 4: La Bevanda '100% Frutti Rossi'",
    productName: "Nettare Delizia ai Frutti di Bosco",
    subtitle: "Sulla bottiglia compare un grande cesto di mirtilli, more e lamponi",
    marketingClaim: "Pieno di antiossidanti naturali della foresta!",
    label: {
      energyKcal: 56,
      energyKj: 238,
      fatTotal: 0.1,
      fatSaturated: 0.0,
      carbsTotal: 13.2,
      carbsSugars: 13.0,
      fiber: 0.2,
      protein: 0.3,
      salt: 0.01,
      ingredientsList: "Acqua, succo di mela da concentrato (35%), purea di frutti di bosco (mirtillo, lampone, mora) in percentuale totale 10%, ZUCCHERO, sciroppo di fruttosio, acidificante: acido citrico, aromi."
    },
    clue: "🔍 Indizio del Detective: Leggi attentamente il primo ingrediente e la percentuale reale di frutti di bosco pubblicizzati sulla copertina!",
    question: "Qual è il verdetto del detective su questa bibita?",
    options: [
      {
        text: "La bottiglia racchiude il cento per cento di succo puro spremuto a freddo da more e mirtilli di bosco senza diluizioni.",
        correct: false,
        explanation: "L'etichetta dice chiaramente che i frutti di bosco sono appena il 10% e l'ingrediente principale è l'acqua!"
      },
      {
        text: "Il primo ingrediente è semplice acqua e i pregiati frutti di bosco mostrati sull'etichetta rappresentano solo il 10%!",
        correct: true,
        explanation: "Un classico trucco di marketing visivo: le immagini mostrano frutti costosi ma la bottiglia contiene principalmente acqua, zuccheri e succhi base economici."
      },
      {
        text: "La bevanda apporta un quantitativo di fibre insolubili pari a un abbondante piatto di cereali integrali da colazione.",
        correct: false,
        explanation: "Le fibre sono pressoché nulle (0,2g), quindi non ha alcun potere saziante."
      }
    ],
    verdictTip: "Cerca sempre la dicitura '100% Succo di frutta senza zuccheri aggiunti' o, meglio ancora, sgranocchia frutti interi!"
  }
];
