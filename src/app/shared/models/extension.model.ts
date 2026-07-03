export interface Extension {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
}

export type Filter = { isActive: boolean } | null;

export interface ExtensionFilter {
  label: string;
  filter: Filter;
}
