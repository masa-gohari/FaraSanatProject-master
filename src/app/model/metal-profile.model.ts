export interface SectionItem {
  id: string;
  title: string;
}

export interface SectionCategory {
  category: string;
  items: SectionItem[];
}
