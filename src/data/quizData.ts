import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: "Equilibrio Nutrizionale",
    question: "Cosa si intende per 'alimentazione varia ed equilibrata' secondo le linee guida della salute pubblica?",
    options: [
      "Assumere regolarmente integratori vitaminici concentrati per poter mangiare cibi identici a ogni pasto",
      "Consumare un'ampia varietà di alimenti nelle opportune quantità, senza demonizzare singoli cibi",
      "Eliminare drasticamente qualsiasi forma di carboidrato e consumare soltanto verdure cotte a vapore",
      "Saltare abitualmente i pasti principali per compensare spuntini pomeridiani particolarmente abbondanti"
    ],
    correctIndex: 1,
    explanation: "La varietà garantisce l'apporto di tutti i nutrienti essenziali (vitamine, minerali, fibre, proteine e carboidrati), poiché nessun singolo alimento contiene da solo tutto ciò di cui il corpo ha bisogno."
  },
  {
    id: 2,
    category: "Idratazione",
    question: "Perché l'acqua è considerata il nutriente più vitale per il nostro corpo?",
    options: [
      "Serve unicamente per idratare la bocca e la gola durante la stagione estiva o negli ambienti riscaldati",
      "Può essere interamente sostituita da tè zuccherato o bevande isotoniche senza alcun impatto sui reni",
      "Compone oltre il 60% del peso corporeo e regola la temperatura, la digestione e le funzioni cognitive",
      "Fornisce calorie pronte all'uso per sostenere direttamente lo sforzo muscolare durante le gare sportive"
    ],
    correctIndex: 2,
    explanation: "L'acqua è indispensabile per la termoregolazione, per trasportare i nutrienti alle cellule e per mantenere vigile l'attenzione durante lo studio. È bene berne circa 1,5 - 2 litri al giorno a sorsi regolari."
  },
  {
    id: 3,
    category: "Frutta e Verdura",
    question: "Cosa raccomanda la regola nutrizionale dei '5 colori del benessere' per frutta e verdura?",
    options: [
      "Consumare ogni giorno 5 porzioni alternando i diversi colori naturali (rosso, verde, giallo, bianco, viola)",
      "Scegliere per cinque giorni consecutivi ortaggi dello stesso identico colore per concentrare una singola vitamina specifica",
      "Sostituire la verdura fresca con cinque confezioni di caramelle gommose arricchite con aromi di frutta",
      "Consumare esclusivamente frutta e ortaggi esotici importati che presentano tonalità cromatiche più intense"
    ],
    correctIndex: 0,
    explanation: "Ogni pigmento naturale riflette fitocomposti protettivi differenti: il rosso apporta licopene, l'arancione beta-carotene, il verde folati e clorofilla, il viola antocianine, e il bianco polifenoli."
  },
  {
    id: 4,
    category: "Cereali e Carboidrati",
    question: "Qual è la differenza nutrizionale principale tra cereali integrali e cereali raffinati?",
    options: [
      "I cereali raffinati hanno il triplo delle vitamine e forniscono energia immediata senza apportare calorie",
      "I cereali integrali sono alimenti formulati in laboratorio chimico e privi di amidi complessi naturali",
      "I cereali integrali mantengono crusca e germe, apportando più fibre, sali minerali e rilascio graduale",
      "Non vi è alcuna differenza nella composizione, cambia unicamente la consistenza al momento della cottura"
    ],
    correctIndex: 2,
    explanation: "Il chicco integrale conserva la fibra esterna e il germe ricco di nutrienti, prolungando il senso di sazietà e modulando la glicemia senza picchi improvvisi."
  },
  {
    id: 5,
    category: "Fonti Proteiche",
    question: "I legumi (come ceci, fagioli, lenticchie e piselli) perché sono particolarmente preziosi?",
    options: [
      "Apportano solo grassi saturi e colesterolo pesante, pertanto andrebbero sempre eliminati da qualsiasi tavola moderna",
      "Forniscono proteine vegetali, fibre e amidi a lento assorbimento con un impatto ambientale contenuto",
      "Hanno un profilo chimico del tutto identico allo zucchero bianco e non contengono alcun sale minerale utile all'organismo",
      "Sostituiscono completamente l'acqua da bere perché contengono liquidi sufficienti per l'idratazione"
    ],
    correctIndex: 1,
    explanation: "I legumi uniti ai cereali costituiscono un profilo amminoacidico completo, tipico della Dieta Mediterranea, riducendo l'impronta idrica e di carbonio rispetto alle carni rosse."
  },
  {
    id: 6,
    category: "Etichette Alimentari",
    question: "In che ordine compaiono gli ingredienti sull'etichetta obbligatoria di un prodotto preconfezionato?",
    options: [
      "In ordine alfabetico rigoroso per facilitare la ricerca dei singoli allergeni da parte del consumatore",
      "In ordine decrescente di peso: il primo ingrediente dell'elenco è quello presente in quantità maggiore",
      "In ordine crescente di costo economico delle materie prime utilizzate durante la produzione in fabbrica",
      "In ordine puramente casuale stabilito dai grafici pubblicitari in base allo spazio grafico disponibile"
    ],
    correctIndex: 1,
    explanation: "L'elenco degli ingredienti è obbligatoriamente in ordine decrescente di peso: se lo zucchero o il sale sono tra le primissime posizioni, il prodotto ne contiene elevate percentuali."
  },
  {
    id: 7,
    category: "Zuccheri Semplici",
    question: "Nella tabella nutrizionale, cosa indica la riga 'di cui zuccheri' sotto la voce Carboidrati?",
    options: [
      "La quota di carboidrati semplici ad assorbimento rapido, sia naturalmente presenti che aggiunti",
      "La percentuale totale di fibre insolubili benefiche che favoriscono la regolarità del nostro intestino",
      "La concentrazione esatta di sale marino iodato disciolto nelle varie fasi della preparazione del cibo",
      "La frazione di grassi monoinsaturi e polinsaturi essenziali per la protezione del sistema circolatorio"
    ],
    correctIndex: 0,
    explanation: "La dicitura 'di cui zuccheri' specifica i carboidrati a catena corta. È raccomandato limitare gli zuccheri liberi aggiunti a meno del 10% dell'apporto energetico totale quotidiano."
  },
  {
    id: 8,
    category: "Sale e Sodio",
    question: "Qual è il limite massimo giornaliero di sale raccomandato dall'Organizzazione Mondiale della Sanità (OMS)?",
    options: [
      "Circa 50 grammi al giorno, corrispondenti all'incirca a un bicchiere da cucina colmo di sale fino",
      "Nessun limite quantitativo, in quanto il sodio non esercita alcuna influenza sulla pressione arteriosa",
      "Almeno tre cucchiai colmi a ogni pasto per garantire il reintegro continuo degli elettroliti corporei",
      "Circa 5 grammi al giorno (pari a circa un cucchiaino da tè), conteggiando anche quello già nei cibi"
    ],
    correctIndex: 3,
    explanation: "Consumare meno di 5g di sale al giorno protegge il cuore e le arterie. Per insaporire le pietanze è ottima abitudine usare spezie, erbe aromatiche e succo di limone."
  },
  {
    id: 9,
    category: "Data di Scadenza",
    question: "Cosa differenzia 'Da consumarsi entro il' rispetto a 'Da consumarsi preferibilmente entro il'?",
    options: [
      "Entrambe le diciture impongono il divieto assoluto di consumo allo scoccare esatto della mezzanotte",
      "'Preferibilmente entro' riguarda la qualità ottimale: oltre la data il cibo integro resta sicuro",
      "La dicitura 'preferibilmente entro' è riservata per legge unicamente all'acqua minerale in bottiglia",
      "'Consumarsi entro' è facoltativa e indica semplicemente che il sapore del prodotto sarà più intenso"
    ],
    correctIndex: 1,
    explanation: "'Consumarsi entro' è una data tassativa di sicurezza microbiologica per prodotti freschi deperibili. 'Preferibilmente entro' riguarda invece la fragranza e il sapore ottimale."
  },
  {
    id: 10,
    category: "Sicurezza nel Frigorifero",
    question: "Come vanno disposti gli alimenti nei ripiani del frigorifero di casa?",
    options: [
      "In modo del tutto casuale, posizionando carne cruda aperta a diretto contatto con verdure già lavate",
      "Rispettando le zone termiche: carne/pesce crudi in basso, verdure nei cassetti e cibi cotti in alto",
      "Mantenendo la temperatura costante a +18°C e lasciando tutti i contenitori privi di coperchio chiuso",
      "Inserendo tutti i cibi ancora bollenti appena tolti dal fuoco direttamente nel congelatore superiore"
    ],
    correctIndex: 1,
    explanation: "Il freddo nel frigorifero non è uniforme: la zona più fredda (in basso) evita lo sviluppo batterico sui cibi crudi deperibili e previene gocciolamenti di contaminazione crociata."
  },
  {
    id: 11,
    category: "Spreco Alimentare",
    question: "Quale strategia quotidiana è più efficace per ridurre lo spreco di cibo a casa e a scuola?",
    options: [
      "Acquistare grandi scorte promozionali di cibi freschi a breve scadenza senza alcuna pianificazione",
      "Gettare tempestivamente ogni piccolo avanzo del pranzo nella spazzatura senza tentare di riusarlo",
      "Pianificare i pasti settimanali, redigere la lista della spesa e riutilizzare gli avanzi con ricette",
      "Rifiutare sistematicamente la porzione di verdura della mensa scolastica lasciandola intatta sul piatto"
    ],
    correctIndex: 2,
    explanation: "Pianificazione della spesa, porzionatura corretta e cucina del riuso (come torte salate o polpette con pane raffermo) trasformano il cibo avanzato in una risorsa sostenibile."
  },
  {
    id: 12,
    category: "Prima Colazione",
    question: "Perché fare una colazione equilibrata è importante per uno studente di scuola secondaria?",
    options: [
      "Provoca sonnolenza marcata e rallenta i riflessi durante le interrogazioni della prima ora di lezione",
      "Fornisce energia costante a muscoli e cervello per memoria e attenzione dopo il digiuno della notte",
      "Consente di non dover bere alcun liquido durante l'intera mattinata scolastica senza disidratarsi",
      "Non apporta alcun beneficio fisiologico comprovato rispetto al digiunare fino all'orario di cena"
    ],
    correctIndex: 1,
    explanation: "Una combinazione di cereali complessi, una fonte di proteine o latticino/bevanda vegetale e un frutto ricarica le scorte di glicogeno e sostiene il rendimento scolastico."
  },
  {
    id: 13,
    category: "Grassi Buoni",
    question: "L'olio extravergine d'oliva (EVO) perché è un pilastro celebrato della Dieta Mediterranea?",
    options: [
      "Apporta acidi grassi monoinsaturi e polifenoli antiossidanti preziosi per la salute cardiovascolare",
      "È composto principalmente da zuccheri semplici e conservanti artificiali sintetici aggiunti durante la spremitura a freddo",
      "Presenta la stessa identica struttura molecolare dei grassi idrogenati sintetici usati nei dolciumi industriali pesanti",
      "Risulta dannoso per l'organismo se consumato a crudo e andrebbe sempre sostituito con strutto fuso"
    ],
    correctIndex: 0,
    explanation: "L'acido oleico e i polifenoli dell'olio EVO a crudo favoriscono la salute cardiovascolare e aiutano l'assorbimento delle vitamine liposolubili (A, D, E, K)."
  },
  {
    id: 14,
    category: "Relazione col Cibo",
    question: "Se durante una festa di compleanno mangi una fetta di torta con gli amici, quale atteggiamento è sano?",
    options: [
      "Sentirsi fortemente in colpa e imporsi un digiuno punitivo per le successive quarantotto ore di fila",
      "Vivere il momento con gioia e serenità: la salute dipende dall'equilibrio complessivo nel tempo",
      "Decidere di abbandonare qualsiasi buona abitudine alimentare ritenendo ormai rovinata la propria salute",
      "Svolgere immediatamente cinque ore di attività fisica estenuante per bruciare ogni singola caloria"
    ],
    correctIndex: 1,
    explanation: "Il cibo è nutrimento ma anche socialità e piacere. Un approccio equilibrato non richiede privazioni o punizioni, ma favorisce la consapevolezza e la serenità."
  },
  {
    id: 15,
    category: "Microbiota Intestinale",
    question: "Cosa nutre i batteri 'buoni' che vivono nel nostro intestino (il microbiota)?",
    options: [
      "Il consumo quotidiano e abbondante di bevande gassate ed energy drink ad altissimo tenore di caffeina e coloranti sintetici",
      "Le fibre prebiotiche presenti in ortaggi, frutta fresca, cereali integrali e legumi tradizionali",
      "I grassi saturi e gli additivi chimici contenuti negli snack industriali fritti e confezionati a lunga scadenza",
      "Le caramelle gommose dolcificate artificialmente che non contengono alcun residuo vegetale vivo"
    ],
    correctIndex: 1,
    explanation: "I microrganismi benefici del nostro intestino fermentano le fibre alimentari producendo acidi grassi a catena corta, fondamentali per le difese immunitarie e il benessere generale."
  },
  {
    id: 16,
    category: "Spuntini Intelligenti",
    question: "Quale combinazione rappresenta una merenda pomeridiana equilibrata prima di fare sport o compiti?",
    options: [
      "Un pacchetto intero di patatine fritte industriali accompagnato da una lattina di cola zuccherata",
      "Nessun tipo di alimento solido né liquido per evitare qualsiasi sensazione di pienezza gastrica",
      "Un frutto fresco di stagione con una manciata di noci oppure uno yogurt bianco naturale con semi",
      "Quattro fette consecutive di torta farcita con crema al burro e glassa di zucchero commerciale"
    ],
    correctIndex: 2,
    explanation: "La frutta apporta zuccheri semplici naturali e acqua, mentre la frutta secca o lo yogurt forniscono grassi buoni o proteine che prolungano l'energia senza picchi di sonnolenza."
  },
  {
    id: 17,
    category: "Stagionalità e KM Zero",
    question: "Perché preferire ortaggi e frutta di stagione e di provenienza locale fa bene alla salute e all'ambiente?",
    options: [
      "I prodotti colti a naturale maturazione offrono più micronutrienti e tagliano le emissioni dei trasporti",
      "Gli ortaggi di stagione presentano sempre lo stesso identico sapore a prescindere dal terreno di origine e dal clima",
      "I vegetali coltivati in serre riscaldate e illuminate artificialmente all'estero garantiscono una densità vitaminica superiore",
      "La stagionalità è un concetto commerciale moderno privo di risvolti sul piano della sostenibilità reale ed ecologica"
    ],
    correctIndex: 0,
    explanation: "I vegetali colti a piena maturazione naturale esprimono la massima densità vitaminica e organolettica, minimizzando il consumo di combustibili per lunghi trasporti refrigerati."
  },
  {
    id: 18,
    category: "Igiene in Cucina",
    question: "Perché è fondamentale lavarsi bene le mani con acqua e sapone prima di iniziare a cucinare?",
    options: [
      "Serve unicamente per scaldare le articolazioni delle dita prima di maneggiare mestoli e posate calde",
      "Per eliminare batteri nocivi e prevenire contaminazioni pericolose sugli alimenti che andiamo a toccare",
      "È una precauzione puramente facoltativa e trascurabile che ha senso applicare solo all'interno dei grandi laboratori industriali",
      "Non ha alcuna utilità pratica se durante le preparazioni culinarie si utilizzano taglieri in plastica"
    ],
    correctIndex: 1,
    explanation: "Le mani sono il principale veicolo di trasferimento di batteri. Lavarsi per almeno 30 secondi con sapone prima di toccare cibo cotto o crudo è la prima linea di difesa igienica."
  },
  {
    id: 19,
    category: "Pesce e Omega-3",
    question: "Perché il pesce azzurro (sgombro, alici, sarde) è spesso raccomandato nella dieta giovanile?",
    options: [
      "Non contiene alcuna proteina e possiede lo stesso identico valore nutrizionale dell'amido di riso",
      "È un prodotto ultra-processato arricchito artificialmente con addensanti chimici di origine minerale",
      "È ricco di acidi grassi Omega-3, proteine nobili, iodio e vitamina D utili per cervello e vista",
      "Fornisce esclusivamente zuccheri semplici a rapido assorbimento per sostenere la corsa prolungata"
    ],
    correctIndex: 2,
    explanation: "Il pesce azzurro locale è economico, sostenibile e ricchissimo di acidi grassi Omega-3 preziosi per lo sviluppo neurologico, la concentrazione e la vista."
  },
  {
    id: 20,
    category: "Consapevolezza Pubblicitaria",
    question: "Cosa dovrebbe fare un consumatore critico di fronte alla scritta 'Light' o 'Senza grassi' su un prodotto?",
    options: [
      "Acquistarlo fidandosi ciecamente dello slogan pubblicitario nella convinzione che non abbia calorie",
      "Leggere la tabella nutrizionale: spesso i cibi senza grassi aggiungono più zuccheri per dare sapore",
      "Consumarne quantità illimitate convinti che i prodotti etichettati come light brucino i grassi corporei",
      "Evitare qualsiasi verifica degli ingredienti ritenendo le informazioni scritte superflue per la salute"
    ],
    correctIndex: 1,
    explanation: "Molti prodotti pubblicizzati come privi di grassi compensano la perdita di consistenza e palatabilità con zuccheri, sciroppi o additivi. La lettura della tabella fuga ogni dubbio!"
  }
];
