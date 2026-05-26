import { ActiveRole } from "../types";
import { Server, ShieldCheck, Cpu, Terminal, Sparkles, BookOpen } from "lucide-react";

interface SidebarProps {
  activeRole: ActiveRole;
  setActiveRole: (role: ActiveRole) => void;
  storageUsed: string;
  storageMax: string;
}

export default function Sidebar({
  activeRole,
  setActiveRole,
  storageUsed,
  storageMax,
}: SidebarProps) {
  const roles: { id: ActiveRole; label: string; icon: any; color: string }[] = [
    {
      id: "manager",
      label: "Operations Manager",
      icon: ShieldCheck,
      color: "text-[#3B82F6] border-[#3B82F6]",
    },
    {
      id: "architect",
      label: "Automation Architect",
      icon: Cpu,
      color: "text-[#10B981] border-[#10B981]",
    },
    {
      id: "engineer",
      label: "Senior Software Engineer",
      icon: Terminal,
      color: "text-amber-500 border-amber-500",
    },
    {
      id: "partner",
      label: "Research Partner",
      icon: BookOpen,
      color: "text-[#A855F7] border-[#A855F7]",
    },
  ];

  return (
    <nav className="w-80 border-r border-white/10 flex flex-col bg-[#0D0D0D] select-none">
      {/* ACTIVE ROLE SELECTOR */}
      <div className="p-6">
        <p className="text-[10px] text-white/30 uppercase mb-4 tracking-[0.1em]">
          Active Master Role
        </p>
        
        <div className="space-y-3 mb-6">
          {roles.map((item) => {
            const isSelected = activeRole === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveRole(item.id)}
                className={`w-full text-left p-3 border rounded-sm flex items-center justify-between transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-[#3B82F6]/50 bg-[#3B82F6]/5 text-white"
                    : "border-white/5 bg-transparent text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isSelected ? "text-[#3B82F6]" : "text-white/30"}`} />
                  <span className="text-xs font-semibold">{item.label}</span>
                </div>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* ROLE CONTEXT */}
        <div className="p-4 bg-white/5 border border-white/5 rounded-sm mb-6">
          <p className="text-[10px] uppercase text-white/30 tracking-widest mb-1 font-mono">
            Daniel's Assistant Objective
          </p>
          <p className="text-[11px] text-white/60 leading-relaxed font-sans italic">
            {activeRole === "manager" &&
              "Focused on database safety, UAE contact audit reports, dry-runs, and system operations backups."}
            {activeRole === "architect" &&
              "Refining Google Cloud Tasks, Workflows pipelines, and serverless background event architectures."}
            {activeRole === "engineer" &&
              "Developing OAuth endpoints, People API, and Gemini structured data queries."}
            {activeRole === "partner" &&
              "Reviewing legal briefs, corporate frameworks, and Gulf institutional arbitration models."}
          </p>
        </div>
      </div>

      {/* STORAGE & PLAN METRICS */}
      <div className="mt-auto p-6 border-t border-white/5 bg-[#0A0A0A]/50">
        <p className="text-[10px] text-white/30 uppercase mb-4 tracking-[0.1em] font-mono">
          Ecosystem Nodes (ONLINE)
        </p>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-white/50 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              Google Cloud Compute
            </span>
            <span className="text-[#10B981] font-bold">ONLINE</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-white/50 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              GitHub APIs (v3)
            </span>
            <span className="text-[#10B981] font-bold">CONNECTED</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-white/50 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Anthropic/MCP Node
            </span>
            <span className="text-amber-500 font-bold">SYNCING</span>
          </div>
        </div>

        {/* CLOUD STORAGE PROGRESS BAR */}
        <div className="mt-5 pt-3 border-t border-white/5">
          <div className="flex justify-between text-[10px] text-white/40 font-mono mb-1.5">
            <span>Core Storage</span>
            <span>{storageUsed} / {storageMax} (47%)</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] h-1 rounded-full"
              style={{ width: "47.3%" }}
            ></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
