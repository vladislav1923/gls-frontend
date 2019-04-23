const removeLineTranslationSymbols = (value: string | null): string => {
    if (!value) {
        return '';
    }

    return value.replace(/\r?\n/g, '');
};

const stringArrayToLowerCase = (values: string[]): string[] => {
    return values.map((item: string) => item.toLowerCase());
};

export {
    removeLineTranslationSymbols,
    stringArrayToLowerCase
}
