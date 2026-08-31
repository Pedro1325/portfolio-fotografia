export interface Photo {
  id: string;
  category: string;
  src: string | null;
  caption: string;
  featured: boolean;
  selected: boolean;
  order: number;
}

export interface Category {
  id: string;
  page: string;
  label: string;
  status: string;
  note: string;
}

export interface Photographer {
  name: string;
  role: string;
  location: string;
  bio: string;
  email: string;
  phone: string;
  instagram: string;
  whatsapp: string;
}

export interface PortfolioData {
  photographer: Photographer;
  categories: Category[];
  photos: Photo[];
}
