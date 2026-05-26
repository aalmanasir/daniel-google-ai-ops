interface StatusRowProps {
  doneCount: number;
  preparedCount: number;
  approvalCount: number;
  recommendedCount: number;
  activeView: "dashboard" | "subscriptions" | "contacts" | "search";
  setActiveView: (view: "dashboard" | "subscriptions" | "contacts" | "search") => void;
}

export default function StatusRow({
  doneCount,
  preparedCount,
  approvalCount,
  recommendedCount,
  activeView,
  setActiveView,
}: StatusRowProps) {
  return (
    <div className="grid grid-cols-5 border-b border-white/10 select-none bg-[#0D0D0D]">
      {/* SYSTEM DASHBOARD */}
      <div 
        onClick={() => setActiveView("dashboard")}
        className={`p-5 border-r border-white/10 hover:bg-white/[0.02] transition-colors cursor-pointer group ${
          activeView === "dashboard" ? "bg-white/[0.015] border-b-2 border-b-[#3B82F6]" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className={`text-[10px] font-bold uppercase tracking-widest italic flex items-center gap-1.5 ${
            activeView === "dashboard" ? "text-[#3B82F6]" : "text-white/40 group-hover:text-[#3B82F6]"
          }`}>
            <span className={`w-1 h-1 rounded-full ${activeView === "dashboard" ? "bg-[#3B82F6] animate-pulse" : "bg-white/30"}`} />
            Systems Dashboard
          </span>
          <span className="text-[10px] font-mono text-white/30 group-hover:text-white transition-colors">
            ACTIVE NODE
          </span>
        </div>
        <p className="text-xs text-white/80 line-clamp-1 font-sans">
          Overview of Google AI, Workspace, GCP & GitHub states
        </p>
      </div>

      {/* SUBSCRIPTIONS AUDIT */}
      <div 
        onClick={() => setActiveView("subscriptions")}
        className={`p-5 border-r border-white/10 hover:bg-white/[0.02] transition-colors cursor-pointer group ${
          activeView === "subscriptions" ? "bg-white/[0.015] border-b-2 border-b-purple-500" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className={`text-[10px] font-bold uppercase tracking-widest italic flex items-center gap-1.5 ${
            activeView === "subscriptions" ? "text-purple-400" : "text-white/40 group-hover:text-purple-400"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            Subscriptions Optimization
          </span>
          <span className="text-[10px] font-mono text-amber-500 group-hover:text-amber-400 transition-colors bg-amber-500/10 px-1.5 py-0.5 rounded-sm">
            May Audit
          </span>
        </div>
        <p className="text-xs text-white/80 line-clamp-1 font-sans">
          Cancel duplicate and redundant licensing contracts
        </p>
      </div>

      {/* CONTACTS INTEGRITY AUDIT */}
      <div 
        onClick={() => setActiveView("contacts")}
        className={`p-5 border-r border-white/10 hover:bg-white/[0.02] transition-colors cursor-pointer group ${
          activeView === "contacts" ? "bg-white/[0.015] border-b-2 border-b-blue-500" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className={`text-[10px] font-bold uppercase tracking-widest italic flex items-center gap-1.5 ${
            activeView === "contacts" ? "text-blue-400" : "text-white/40 group-hover:text-blue-400"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${approvalCount > 0 ? "bg-amber-500 animate-pulse" : "bg-[#10B981]"}`} />
            Contacts Audit
          </span>
          <span className="text-xs font-mono text-white/40 group-hover:text-blue-400 transition-colors bg-white/5 px-1.5 py-0.5 rounded-sm">
            {approvalCount} Pending
          </span>
        </div>
        <p className="text-xs text-white/80 line-clamp-1 font-sans">
          UAE Mobile formatting checks & profiles deduplication
        </p>
      </div>

      {/* UNIFIED SEARCH INDEXER */}
      <div 
        onClick={() => setActiveView("search")}
        className={`p-5 border-r border-white/10 hover:bg-white/[0.02] transition-colors cursor-pointer group ${
          activeView === "search" ? "bg-white/[0.015] border-b-2 border-b-[#10B981]" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className={`text-[10px] font-bold uppercase tracking-widest italic flex items-center gap-1.5 ${
            activeView === "search" ? "text-[#10B981]" : "text-white/40 group-hover:text-[#10B981]"
          }`}>
            <span className="w-1 h-1 bg-[#10B981] rounded-full" />
            Workspace Finder
          </span>
          <span className="text-xs font-mono text-white/40 group-hover:text-[#10B981] transition-colors">
            {preparedCount} pools indexed
          </span>
        </div>
        <p className="text-xs text-white/80 line-clamp-1 font-sans">
          Query unified indexes of Drive files, Gmail & Photos OCR
        </p>
      </div>

      {/* SYSTEM METRICS (STATION STATE) */}
      <div className="p-5 bg-[#080808] border-r border-white/5 select-none text-right">
        <div className="flex items-center justify-between md:justify-end gap-3 mb-1 text-[10px] font-mono leading-none">
          <span className="text-white/30 uppercase tracking-wider">Storage Node Allocation</span>
          <span className="text-[#10B981] font-bold">14.2 / 30 TB</span>
        </div>
        <p className="text-[11px] text-white/50 font-mono tracking-tight font-sans truncate">
          Encrypted, HSM rotated keys secure cloud connections
        </p>
      </div>
    </div>
  );
}
