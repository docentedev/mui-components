export const addExtraVoidData = <T>(data: T[] | undefined, itemsPerPage = 10) => {
    if (!data) {
        return [];
    }
    const voidItems = itemsPerPage - data.length;
    return [...data, ...Array(voidItems < 0 ? 0 : voidItems).fill({})];
};
