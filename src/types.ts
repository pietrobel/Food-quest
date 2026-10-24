export type ViewMode = 
  | 'home'
  | 'plate'
  | 'battle'
  | 'detective'
  | 'game'
  | 'quiz'
  | 'minigames'
  | 'codeweek'
  | 'eco'
  | 'certificate';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface VfStatement {
  id: number;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface PlateIngredient {
  id: string;
  name: string;
  icon: string;
  category: 'veg' | 'grains' | 'proteins' | 'fats_dairy';
  description: string;
  ecoScore?: string;
}

export interface PlateChallengeLevel {
  id: number;
  title: string;
  description: string;
  targetVeg: number;
  targetGrains: number;
  targetProteins: number;
  allowedItems?: string[];
  bonusCondition?: string;
}

export interface BattleRound {
  id: number;
  topic: string;
  characters: {
    pizza: string;
    burger: string;
    broccolo: string;
    carota: string;
  };
  activeSpeaker: 'pizza' | 'burger' | 'broccolo' | 'carota';
  question: string;
  options: {
    text: string;
    correct: boolean;
    explanation: string;
  }[];
  scratchTip: string;
  curiosity: string;
}

export interface DetectiveCase {
  id: number;
  title: string;
  productName: string;
  subtitle: string;
  marketingClaim: string;
  label: {
    energyKcal: number;
    energyKj: number;
    fatTotal: number;
    fatSaturated: number;
    carbsTotal: number;
    carbsSugars: number;
    fiber: number;
    protein: number;
    salt: number;
    ingredientsList: string;
  };
  clue: string;
  question: string;
  options: {
    text: string;
    correct: boolean;
    explanation: string;
  }[];
  verdictTip: string;
}

export interface ClassifyItem {
  id: string;
  name: string;
  icon: string;
  category: 'frutta_verdura' | 'cereali' | 'proteine' | 'grassi_latticini';
  info: string;
}

export type UpdateScoreFn = (exerciseKey: string, score: number) => { 
  isNewRecord: boolean; 
  currentBest: number; 
  previousBest: number 
};

