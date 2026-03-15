// src/types/character.ts

export type Tier = 'SSS' | 'SS' | 'S' | 'A' | 'B' | 'C' | 'D';

export interface Character {
  id: number;
  name_kor: string;
  name: string;
  tier: Tier;
  image: string;
  tags: string[];
}

export interface TagGroup {
  title: string;
  tags: string[];
}
