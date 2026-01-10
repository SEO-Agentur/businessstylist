export type UserRole = 'USER' | 'ADMIN';

export type ProductType = 'EBOOK' | 'LOOKBOOK' | 'SERVICE' | 'SUBSCRIPTION';

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface SafeUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  type: string;
  price: number;
  stripePriceId: string | null;
  active: boolean;
  features: string | null;
  imageUrl: string | null;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
}

export interface QuizResultData {
  id: string;
  resultType: string;
  answers: string;
  score: string | null;
  createdAt: Date;
}

export interface StiltypInfo {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  colors: string[];
  styles: string[];
  recommendations: string[];
}

export interface MetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
}
