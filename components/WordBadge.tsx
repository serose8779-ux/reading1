"use client";

import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface WordBadgeProps {
    word: string;
    status: "pending" | "correct" | "incorrect";
}

export function WordBadge({ word, status }: WordBadgeProps) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "text-4xl font-black transition-all duration-500 tracking-tight",
                status === "pending" && "text-white/20",
                status === "correct" && "text-neon-blue drop-shadow-[0_0_8px_rgba(77,238,234,0.8)] scale-110",
                status === "incorrect" && "text-neon-red drop-shadow-[0_0_8px_rgba(255,49,49,0.8)]"
            )}
        >
            {word}
        </motion.span>
    );
}
