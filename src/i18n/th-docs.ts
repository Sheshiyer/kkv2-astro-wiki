const thDocModules = import.meta.glob('../content/thDocs/**/*.md');

export const hasThDocs = Object.keys(thDocModules).length > 0;
