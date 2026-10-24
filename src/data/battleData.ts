import { BattleRound } from '../types';

export const battleRounds: BattleRound[] = [
  {
    id: 1,
    topic: "La guerra dei Carboidrati a Cena",
    activeSpeaker: 'pizza',
    characters: {
      pizza: "«Io sono la regina della convivialità italiana! Eppure tutti dicono che se mangi una fetta di me la sera, i miei carboidrati si trasformano istantaneamente in grasso solido mentre dormi! Ma è davvero così o è una leggenda metropolitana?»",
      burger: "«Se la pizza fa male la sera, allora io cosa dovrei dire? La sera bisogna mangiare solo proteine e digiunare fino alle 11 di domani!»",
      broccolo: "«Attenzione agli estremismi! L'organismo non possiede un orologio che blocca la digestione alle 18:00!»",
      carota: "«Esatto Bruno! Il bilancio energetico conta sulle 24 ore. I carboidrati complessi alla sera aiutano persino a produrre serotonina e conciliare il sonno!»"
    },
    question: "Chi ha ragione scientificamente riguardo ai carboidrati assunti a cena?",
    options: [
      {
        text: "Carla Carota e Bruno Broccolo: il corpo metabolizza i carboidrati complessi anche di notte, contando l'equilibrio delle 24 ore.",
        correct: true,
        explanation: "Verità scientifica confermata: il metabolismo basale è attivo anche durante il sonno per rigenerare cellule e tessuti. Eliminare drasticamente i carboidrati alla sera non è necessario."
      },
      {
        text: "Paolo Pizza: la pizza non possiede calorie assimilabili e può essere mangiata intera ogni sera poco prima di mettersi a dormire.",
        correct: false,
        explanation: "Non corretto: la pizza è un piatto unico ricco. Mangiarla in porzioni equilibrate è piacevole, ma non è priva di calorie."
      },
      {
        text: "Ugo Hamburger: la sera il metabolismo si blocca totalmente, quindi occorre consumare solo carni grasse senza alcun carboidrato.",
        correct: false,
        explanation: "Sbagliato: i pasti serali eccessivamente grassi rallentano lo svuotamento gastrico e possono disturbare pesantemente il sonno."
      }
    ],
    scratchTip: "quando ricevo [Valuta_Carboidrati v] -> SE <ora_pasto = 'cena'> E <tipo = 'carboidrato_complesso'> ALLORA dire [Digestione regolare!] per (2) secondi",
    curiosity: "I carboidrati stimolano il rilascio di triptofano, precursore della melatonina, l'ormone che favorisce un sonno ristoratore!"
  },
  {
    id: 2,
    topic: "Il dilemma del Fast Food vs Cibo Fatto in Casa",
    activeSpeaker: 'burger',
    characters: {
      pizza: "«Un momento! Almeno io ho pomodoro e basilico, ma tu Ugo Hamburger vieni sempre accusato di essere cibo spazzatura velenoso!»",
      burger: "«Un momento amici! Ma se sono preparato a casa con carne macinata magra di qualità, pane casereccio ai semi, fette di pomodoro e foglie di lattuga fresca, perché dovrei essere un demone pericoloso?»",
      broccolo: "«Ugo tocca un punto fondamentale: non è la forma del panino che fa male, ma gli ingredienti ultra-processati, le fritture in oli esausti e le salse cariche di zuccheri e sale usate nei fast food industriali!»",
      carota: "«Bravissimo Bruno! Un hamburger cucinato con materie prime fresche e senza esagerare con salse industriali è un piatto completo dignitosissimo!»"
    },
    question: "Cosa rende un panino un pasto nutriente invece di un cibo spazzatura?",
    options: [
      {
        text: "La rapidità con cui viene consumato: ingoiare il cibo in due minuti senza masticare impedisce ai grassi di depositarsi nel fegato.",
        correct: false,
        explanation: "Masticare con calma è fondamentale per avviare la digestione e percepire i segnali di sazietà dello stomaco."
      },
      {
        text: "La qualità degli ingredienti: carne magra fresca o burger vegetale, pane rustico, ortaggi croccanti e condimenti moderati.",
        correct: true,
        explanation: "Non esistono cibi da condannare a priori: la cucina domestica con ingredienti freschi trasforma anche un panino in un pasto sano e piacevole."
      },
      {
        text: "L'aggiunta abbondante di salse industriali e condimenti aromatizzati per coprire il sapore naturale degli ingredienti di base.",
        correct: false,
        explanation: "Le salse industriali spesso nascondono fino al 30% di zuccheri semplici e tanto sodio!"
      }
    ],
    scratchTip: "SE <ingredienti = 'freschi'> E <cottura = 'non_fritta'> ALLORA imposta [Valore_Nutritivo v] a (Alto) ALTRIMENTI imposta [Frequenza v] a ('Occasionale')",
    curiosity: "Puoi preparare gustosissimi burger anche con ceci frullati, carote grattugiate ed erbe aromatiche: zero colesterolo e tanto sapore!"
  },
  {
    id: 3,
    topic: "Verdure lesse scondite o cucinate con gusto?",
    activeSpeaker: 'broccolo',
    characters: {
      pizza: "«Bruno Broccolo, ammettilo: la gente ti scarta spesso perché pensa che l'unico modo per mangiarti sia bollirti nell'acqua finché non diventi grigio e scondito!»",
      burger: "«Infatti! Chi vorrebbe mangiare un vegetale molle e triste senza nemmeno un pizzico di sapore?»",
      broccolo: "«Ecco il grande errore! La cottura prolungata in tanta acqua disperde le mie vitamine idrosolubili (come la vitamina C)! Cotto al dente al vapore e condito con un filo di Olio Extravergine crudo mantengo tutti i miei tesori intatti!»",
      carota: "«E c'è di più! I miei carotenoidi e le vitamine A ed E si sciolgono nei grassi: senza un cucchiaio di buon olio EVO il corpo non riesce nemmeno ad assorbirle bene!»"
    },
    question: "Perché l'olio extravergine d'oliva è il miglior alleato delle verdure a tavola?",
    options: [
      {
        text: "Perché l'olio d'oliva consumato a crudo distrugge completamente ogni traccia di fibra vegetale facilitando la rapida digestione del pasto nello stomaco.",
        correct: false,
        explanation: "Le fibre rimangono intatte e aiutano la digestione."
      },
      {
        text: "Perché trasforma istantaneamente broccoli e carote lesse in cibi privi di calorie con la stessa consistenza di un dolce al cucchiaio.",
        correct: false,
        explanation: "L'olio EVO esalta gli aromi vegetali senza alterare la natura dell'ortaggio."
      },
      {
        text: "Perché gli acidi grassi monoinsaturi dell'olio EVO favoriscono l'assimilazione delle vitamine liposolubili (A, D, E, K) degli ortaggi.",
        correct: true,
        explanation: "La chimica della nutrizione: molte vitamine necessitano di vettori lipidici per essere assorbite dalla mucosa intestinale. L'olio EVO a crudo è ideale!"
      }
    ],
    scratchTip: "trasmetti [Aggiungi_Olio_EVO v] -> SE <vitamina = 'Liposolubile'> ALLORA attiva [Super_Assorbimento_Intestinale]",
    curiosity: "La cottura a vapore per 5-7 minuti preserva fino all'80% di vitamina C rispetto alla bollitura tradizionale prolungata!"
  },
  {
    id: 4,
    topic: "Il grande inganno del 'Bere la frutta'",
    activeSpeaker: 'carota',
    characters: {
      pizza: "«Io per fare il pieno di frutta bevo 2 litri di succo confezionato 'gusto pesca' al posto dell'acqua, così faccio prima!»",
      burger: "«Anch'io prendo sempre il nettare di frutta zuccherato al bar credendo sia la stessa cosa di un cestino di mele!»",
      broccolo: "«Allarme rosso! I succhi industriali spesso contengono zuccheri liberi concentrati privati della matrice solida della polpa!»",
      carota: "«Esattamente! Mangiare me o una mela intera costringe a masticare, invia segnali di pienezza allo stomaco e fornisce le fibre che rallentano l'ingresso degli zuccheri nel sangue!»"
    },
    question: "Qual è il reale vantaggio del consumo di frutta fresca intera rispetto ai succhi commerciali?",
    options: [
      {
        text: "La presenza di composti speciali e sostanze stimolanti brevettate capaci di velocizzare la crescita muscolare dieci volte più in fretta di qualsiasi cibo solido.",
        correct: false,
        explanation: "I succhi industriali zuccherati apportano solo calorie liquide rapide senza proteine per i muscoli."
      },
      {
        text: "Le fibre intatte che regolano l'assorbimento degli zuccheri, l'idratazione naturale e la masticazione che invia segnali di sazietà.",
        correct: true,
        explanation: "Le fibre del frutto integro creano una rete gelatinosa nello stomaco che rilascia il fruttosio in modo graduale, proteggendo il fegato e il metabolismo."
      },
      {
        text: "Il fatto che la frutta fresca d'albero non contenga alcuna molecola d'acqua, a differenza delle bevande industriali confezionate.",
        correct: false,
        explanation: "La frutta fresca è composta per oltre l'85-90% di acqua biologica purissima ricca di elettroliti."
      }
    ],
    scratchTip: "SE <forma_cibo = 'Frutto_Intero'> ALLORA imposta [Fibre] a (Presenti) E [Picco_Glicemico] a (Stabile)",
    curiosity: "Per fare un bicchiere di succo concentrato occorrono 3-4 arance, ma bevute in 30 secondi non danno la sazietà che darebbero se sbucciate e mangiate a spicchi!"
  }
];
