"use client";

import { User } from "lucide-react";

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 backdrop-blur-md border-b border-cyan/20">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan rounded-full flex items-center justify-center shadow-[0_0_15px_var(--cyan)]">
                    <span className="font-bold text-cyber-black italic">CR</span>
                </div>
                <h1 className="text-2xl font-black tracking-tighter cyber-glow italic uppercase">
                    Cyber-Reader <span className="text-magenta">v1.0</span>
                </h1>
            </div>

            <div className="flex items-center gap-4 bg-cyber-black/50 p-2 px-4 rounded-full border border-magenta/30">
                <div className="text-right">
                    <p className="text-xs text-white/50 leading-none">에이전트 ID</p>
                    <p className="text-sm font-bold text-magenta">스텔라_05</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-magenta flex items-center justify-center">
                    <User className="w-5 h-5 text-magenta" />
                </div>
            </div>
        </header>
    );
}
