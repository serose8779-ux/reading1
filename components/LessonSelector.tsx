"use client";

import { motion } from "framer-motion";
import { Lesson, LESSONS } from "../lib/lessons";
import { BookOpen, ChevronRight } from "lucide-react";

interface LessonSelectorProps {
    onSelect: (lesson: Lesson) => void;
}

export function LessonSelector({ onSelect }: LessonSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4 py-12">
            {LESSONS.map((lesson, idx) => (
                <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, translateY: -5 }}
                    onClick={() => onSelect(lesson)}
                    className="cursor-pointer group relative bg-cyber-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] overflow-hidden hover:border-cyan/50 transition-all duration-500 shadow-2xl hover:shadow-cyan/20"
                >
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 rounded-2xl bg-cyan/10 flex items-center justify-center mb-6 group-hover:bg-cyan/20 transition-colors">
                            <BookOpen className="w-8 h-8 text-cyan" />
                        </div>

                        <div className="mb-4">
                            <span className="text-[10px] font-mono text-cyan tracking-[0.3em] uppercase mb-2 block">
                                module_0{lesson.id}
                            </span>
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tight group-hover:text-cyan transition-colors">
                                {lesson.title}
                            </h3>
                        </div>

                        <p className="text-white/40 text-sm font-medium mb-8 flex-grow">
                            {lesson.description}
                        </p>

                        <div className="flex items-center gap-2 text-cyan font-mono text-[10px] tracking-widest uppercase group-hover:gap-4 transition-all">
                            시작하기 <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <div className="w-8 h-[1px] bg-cyan mb-1" />
                        <div className="w-4 h-[1px] bg-cyan ml-4" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
