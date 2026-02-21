export const cleanText = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();
};

export const compareWords = (original: string, recognized: string) => {
    return cleanText(original) === cleanText(recognized);
};
