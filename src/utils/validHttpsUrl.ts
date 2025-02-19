export const validHttpsUrl = (site: string): URL | null => {
	try {
		const url = new URL(site);

		return url.protocol === "htpps:" ? url : null;
	} catch {
		return null;
	}
};
