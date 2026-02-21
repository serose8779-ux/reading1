"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Mic, Play, RotateCcw, ThumbsUp, Home } from "lucide-react";
import { WordBadge } from "./WordBadge";
import { Visualizer } from "./Visualizer";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { useSpeechToText } from "../hooks/useSpeechToText";
import { cleanText, compareWords } from "../lib/utils";

interface ReaderProps {
    sentences: string[];
    title: string;
    onBack: () => void;
}

export function Reader({ sentences, title, onBack }: ReaderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { speak } = useTextToSpeech();
    const { isListening, transcript, startListening, stopListening } = useSpeechToText();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio object
    useEffect(() => {
        audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
    }, []);

    const currentTargetSentence = sentences[currentIndex];
    const targetWords = useMemo(() => currentTargetSentence.split(/\s+/), [currentTargetSentence]);
    const spokenWords = useMemo(() => cleanText(transcript).split(/\s+/), [transcript]);

    const getWordStatus = (index: number) => {
        if (index >= spokenWords.length || spokenWords[0] === "") return "pending";
        return compareWords(targetWords[index], spokenWords[index]) ? "correct" : "incorrect";
    };

    const isSentenceComplete = useMemo(() => {
        return targetWords.length > 0 && targetWords.every((_, i) => getWordStatus(i) === "correct");
    }, [targetWords, spokenWords]);

    // Play sound when sentence is complete
    useEffect(() => {
        if (isSentenceComplete && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
    }, [isSentenceComplete]);

    const handleNext = () => {
        stopListening();
        if (currentIndex < sentences.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        stopListening();
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const reset = () => {
        stopListening();
    };

    return (
        <div className="max-w-4xl w-full flex flex-col items-center gap-12 p-8">
            <div className="flex flex-col items-center gap-6 min-h-[120px] max-w-2xl px-4 text-center">
                <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-4">
                    {targetWords.map((word, wIdx) => (
                        <WordBadge key={wIdx} word={word} status={getWordStatus(wIdx)} />
                    ))}
                    {isSentenceComplete && (
                        <div className="animate-bounce ml-4">
                            <ThumbsUp className="w-10 h-10 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center gap-8 w-full bg-cyan/5 border-2 border-cyan/20 p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan to-transparent opacity-50" />

                {isListening && <Visualizer active={isListening} />}

                <p className="text-white/40 text-sm font-mono uppercase tracking-[0.2em] text-center">
                    {isListening ? "음성을 분석 중입니다..." : "음성 입력 대기 중"}
                </p>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => speak(currentTargetSentence)}
                        className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 group"
                        title="듣기"
                    >
                        <Play className="w-8 h-8 fill-white group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={isListening ? stopListening : startListening}
                        className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${isListening ? "bg-neon-red shadow-neon-red/50 scale-110" : "bg-cyan shadow-cyan/50 hover:scale-105"
                            }`}
                        title={isListening ? "중지" : "따라 읽기"}
                    >
                        <Mic className={`w-10 h-10 ${isListening ? "text-white" : "text-cyber-black"}`} />
                    </button>

                    <button
                        onClick={reset}
                        className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"
                        title="초기화"
                    >
                        <RotateCcw className="w-7 h-7" />
                    </button>
                </div>

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="px-6 py-2 rounded-full border border-cyan/30 text-cyan disabled:opacity-30 hover:bg-cyan/10 transition-colors font-bold uppercase tracking-widest text-xs"
                    >
                        PREV
                    </button>
                    <div className="flex items-center text-xs font-mono text-white/50 px-4">
                        {currentIndex + 1} / {sentences.length}
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === sentences.length - 1}
                        className="px-6 py-2 rounded-full border border-magenta/30 text-magenta disabled:opacity-30 hover:bg-magenta/10 transition-colors font-bold uppercase tracking-widest text-xs"
                    >
                        NEXT
                    </button>
                </div>

                <button
                    onClick={onBack}
                    className="mt-8 flex items-center gap-2 text-[10px] font-mono text-white/30 hover:text-cyan transition-colors uppercase tracking-[0.2em]"
                >
                    <Home className="w-3 h-3" />
                    lesson_select.return()
                </button>
            </div>

            {transcript && (
                <div className="w-full bg-magenta/5 border border-magenta/20 p-4 rounded-xl font-mono text-sm text-center">
                    <span className="text-magenta font-bold">원본 신호:</span> {transcript}
                </div>
            )}
        </div>
    );
}
