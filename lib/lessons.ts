export interface Lesson {
    id: number;
    title: string;
    description: string;
    sentences: string[];
}

export const LESSONS: Lesson[] = [
    {
        id: 1,
        title: "Lesson 1",
        description: "Where are you from?",
        sentences: [
            "Where are you from?",
            "I am from Korea.",
            "Where is he from?",
            "He is from Canada."
        ]
    },
    {
        id: 2,
        title: "Lesson 2",
        description: "How do you feel?",
        sentences: [
            "How do you feel?",
            "I am sad.",
            "How does he feel?",
            "He is happy."
        ]
    },
    {
        id: 3,
        title: "Lesson 3",
        description: "What do you want to be?",
        sentences: [
            "What do you want to be?",
            "I want to be a doctor."
        ]
    }
];
