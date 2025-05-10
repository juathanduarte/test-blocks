export const getLoadingMessage = (
	loadCount: number,
	t: (key: string) => string,
): string => {
	if (loadCount < 2) return t("loadingMoreProducts1");
	if (loadCount < 4) return t("loadingMoreProducts2");
	if (loadCount < 6) return t("loadingMoreProducts3");
	return t("loadingMoreProducts4");
};
