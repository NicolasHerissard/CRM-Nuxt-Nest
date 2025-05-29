export interface Client {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  comments?: string;
  status: string;
  authsId?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Article {
  id: number;
  name: string;
  description: string;
  priceHT: number;
  tva: number;
  priceTTC: number;
  created_at?: string;
  updated_at?: string;
}

export interface Appointments {
  id?: number;
  title: string;
  start: Date;
  end: Date;
  clientId: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}