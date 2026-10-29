export type CatalogItem = {
  id: string; name: string; url: string; description: string;
  section: string; sourcePage: string; sourceFile: string; tags: string[];
};
export type CatalogPayload = {
  version: string; generatedAt: string; name: string; homepage: string;
  repository: string; tags: string[]; items: CatalogItem[];
};
