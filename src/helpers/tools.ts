const removeLineTranslationSymbols = (value: string | null): string => {
    if (!value) {
        return '';
    }

    return value.replace(/\r?\n/g, '');
};

export {
    removeLineTranslationSymbols
}
