const removeLineTranslationSymbols = (value: string | null): string => {
    if (!value) {
        return '';
    }

    return value.replace(/\r?\n/g, '');
};

const removeSpaces = (value: string | null): string => {
    if (!value) {
        return '';
    }

    return value.replace(/\s/g, '');
};

const stringArrayToLowerCase = (values: string[]): string[] => {
    return values.map((item: string) => item.toLowerCase());
};

const getDate = (value: string | null): string => {
    if (!value) {
        return '';
    }

    const date = new Date(value);
    const month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;

    return `${date.getUTCDate()}.${month}.${date.getUTCFullYear()}`;
};

export {
    removeLineTranslationSymbols,
    removeSpaces,
    stringArrayToLowerCase,
    getDate
}
