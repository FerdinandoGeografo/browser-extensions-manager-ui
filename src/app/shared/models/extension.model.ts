export type Extension = {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
};

export type Filter = { isActive: boolean } | null;

export type ExtensionFilter = {
  label: string;
  filter: Filter;
};
