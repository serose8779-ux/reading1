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
                "px-4 py-2 rounded-lg border-2 text-2xl font-bold transition-all duration-300",
                status === "pending" && "border-cyan/30 text-white/50",
                status === "correct" && "border-neon-blue text-neon-blue shadow-[0_0_15px_rgba(77,238,234,0.5)]",
                status === "incorrect" && "border-neon-red text-neon-red shadow-[0_0_15px_rgba(255,49,49,0.5)]"
            )}
        >
            {word}
        </motion.span>
    );
}
