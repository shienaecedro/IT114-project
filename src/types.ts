// src/types.ts

export interface Item {
  id: number;
  category: string;
  brand: string;
  model: string;
  quantity: number;
  available: boolean;
}

export interface Facility {
  id: number;
  name: string;
  location: string;
  available: boolean;
  image?: string;
}

export interface Transaction {
  id: number;
  user: string;
  item: {
    category: string;
    brand: string;
    model: string;
  };
  type: "borrow" | "return" | "book";
  date: string;
}
