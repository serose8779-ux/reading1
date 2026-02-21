import { Header } from "@/components/Header";
import { Reader } from "@/components/Reader";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,243,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <Header />

      <div className="z-10 w-full flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <span className="text-cyan text-xs font-mono tracking-widest uppercase mb-2">mission_objective</span>
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter text-center">
            Speak the <span className="text-cyan">Code</span>
          </h2>
        </div>

        <Reader />
      </div>

      <footer className="fixed bottom-6 text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase">
        system_integrity_certified // neural_link_stable
      </footer>
    </main>
  );
}
