export enum Grade {
  HG = 'High Grade',
  RG = 'Real Grade',
  MG = 'Master Grade',
  PG = 'Perfect Grade',
  SD = 'Super Deformed'
}

export enum Series {
  UC = 'Universal Century',
  SEED = 'Gundam SEED',
  OO = 'Gundam 00',
  IBO = 'Iron-Blooded Orphans',
  WITCH = 'Witch from Mercury'
}

export type Theme = 'EFSF' | 'ZEON';

export interface Lore {
  pilot: string;
  height: string;
  armaments: string[];
}

export interface Product {
  id: string;
  name: string;
  series: Series;
  grade: Grade;
  scale: string;
  price: number;
  salePrice?: number;
  image: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  isNew?: boolean;
  lore?: Lore;
  tags?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ExchangeComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface ExchangePost {
  id: string;
  author: string;
  have: string; // Model name
  want: string; // Model name or description
  condition: 'New (In Box)' | 'Built (No Box)' | 'Built (With Box)' | 'Custom Painted';
  date: string;
  image?: string;
  description?: string;
  comments?: ExchangeComment[];
  status: 'Open' | 'Pending' | 'Closed';
}

export type ViewState = 'HOME' | 'SHOP' | 'EXCHANGE' | 'DEALS' | 'CONTACT' | 'WISHLIST' | 'CHECKOUT' | 'PILOT';