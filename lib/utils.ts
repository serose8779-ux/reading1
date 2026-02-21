export const cleanText = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();
};

const levenshteinDistance = (a: string, b: string): number => {
    const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,    // deletion
                    matrix[i][j - 1] + 1,    // insertion
                    matrix[i - 1][j - 1] + 1 // substitution
                );
            }
        }
    }
    return matrix[b.length][a.length];
};

const calculateSimilarity = (a: string, b: string): number => {
    const distance = levenshteinDistance(a, b);
    const maxLength = Math.max(a.length, b.length);
    if (maxLength === 0) return 1.0;
    return (maxLength - distance) / maxLength;
};

export const compareWords = (original: string, recognized: string) => {
    const s1 = cleanText(original);
    const s2 = cleanText(recognized);

    if (s1 === s2) return true;

    // Allow for fluency: if similarity is > 70%, mark as correct
    const similarity = calculateSimilarity(s1, s2);
    return similarity >= 0.7;
};
