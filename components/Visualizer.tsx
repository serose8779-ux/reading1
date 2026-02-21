"use client";

import { motion } from "framer-motion";

export function Visualizer({ active }: { active: boolean }) {
    return (
        <div className="flex items-center justify-center gap-1 h-12">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1 bg-cyan"
                    animate={
                        active
                            ? {
                                height: [10, 40, 15, 35, 10],
                            }
                            : { height: 4 }
                    }
                    transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: i * 0.1,
                    }}
                />
            ))}
        </div>
    );
}
