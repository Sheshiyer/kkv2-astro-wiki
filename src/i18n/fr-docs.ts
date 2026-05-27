const frDocModules = import.meta.glob('../content/frDocs/**/*.md');

export const hasFrDocs = Object.keys(frDocModules).length > 0;
