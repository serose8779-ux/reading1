"use client";

import { useState, useMemo } from "react";
import { Mic, Play, RotateCcw } from "lucide-react";
import { WordBadge } from "./WordBadge";
import { Visualizer } from "./Visualizer";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { useSpeechToText } from "../hooks/useSpeechToText";
import { cleanText, compareWords } from "../lib/utils";

const TARGET_SENTENCE = "Where are you from? I am from Korea.";

export function Reader() {
    const { speak } = useTextToSpeech();
    const { isListening, transcript, startListening, stopListening } = useSpeechToText();

    const targetWords = useMemo(() => TARGET_SENTENCE.split(" "), []);
    const spokenWords = useMemo(() => cleanText(transcript).split(" "), [transcript]);

    const getWordStatus = (index: number) => {
        if (index >= spokenWords.length || spokenWords[0] === "") return "pending";
        return compareWords(targetWords[index], spokenWords[index]) ? "correct" : "incorrect";
    };

    const reset = () => {
        stopListening();
    };

    return (
        <div className="max-w-4xl w-full flex flex-col items-center gap-12 p-8">
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-4 min-h-[120px] max-w-2xl px-4">
                {targetWords.map((word, i) => (
                    <WordBadge key={i} word={word} status={getWordStatus(i)} />
                ))}
            </div>

            <div className="flex flex-col items-center gap-8 w-full bg-cyan/5 border-2 border-cyan/20 p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan to-transparent opacity-50" />

                <Visualizer active={isListening} />

                <p className="text-white/40 text-sm font-mono uppercase tracking-[0.2em]">
                    {isListening ? "Listening for input..." : "Standby for transmission"}
                </p>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => speak(TARGET_SENTENCE)}
                        className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 group"
                    >
                        <Play className="w-8 h-8 fill-white group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={isListening ? stopListening : startListening}
                        className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${isListening ? "bg-neon-red shadow-neon-red/50 scale-110" : "bg-cyan shadow-cyan/50 hover:scale-105"
                            }`}
                    >
                        <Mic className={`w-10 h-10 ${isListening ? "text-white" : "text-cyber-black"}`} />
                    </button>

                    <button
                        onClick={reset}
                        className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"
                    >
                        <RotateCcw className="w-7 h-7" />
                    </button>
                </div>
            </div>

            {transcript && (
                <div className="w-full bg-magenta/5 border border-magenta/20 p-4 rounded-xl font-mono text-sm text-center">
                    <span className="text-magenta font-bold">RAW SIG:</span> {transcript}
                </div>
            )}
        </div>
    );
}
