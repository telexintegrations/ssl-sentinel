export const validHttpsUrl = (site: string): URL | null => {
  try {
    const url = new URL(site);

    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
};
