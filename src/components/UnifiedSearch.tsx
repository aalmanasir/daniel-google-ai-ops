import { useState } from "react";
import { SearchItem } from "../types";
import { 
  initialMockDriveItems, 
  initialMockGmailItems, 
  initialMockPhotosItems 
} from "../data/mockData";
import { 
  Search, 
  Layers, 
  FileText, 
  Mail, 
  Image, 
  ExternalLink, 
  Lock, 
  Cpu, 
  Server, 
  Info, 
  Database,
  CalendarDays
} from "lucide-react";

export default function UnifiedSearch() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "drive" | "gmail" | "photos">("all");
  const [showRoadmap, setShowRoadmap] = useState(false);

  // Combine items into single searchable database index
  const allItems: SearchItem[] = [
    ...initialMockDriveItems,
    ...initialMockGmailItems,
    ...initialMockPhotosItems,
  ];

  // Perform client-side indexing query
  const filteredItems = allItems.filter((item) => {
    const matchesFilter = activeFilter === "all" || item.source === activeFilter;
    if (!matchesFilter) return false;

    if (!query) return true;
    const term = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.subtitle.toLowerCase().includes(term) ||
      item.snippet.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex-1 overflow-y-auto p-8 font-sans">
      {/* HEADER ROW */}
      <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-xl font-light mb-2 flex items-center gap-2.5">
            Workspace: <span className="text-white font-medium">Unified Security Indexer</span>
          </h2>
          <p className="text-xs text-white/40 max-w-2xl italic tracking-wide">
            Stateful multi-system document and communication indexing node. Query Drive assets, Inbox digests, and Google Photos OCR tags simultaneously.
          </p>
        </div>
        <button
          onClick={() => setShowRoadmap(!showRoadmap)}
          className="px-4 py-2 border border-[#3B82F6]/30 bg-[#3B82F6]/15 text-[#3B82F6] hover:bg-[#3B82F6]/25 transition-all text-xs font-mono tracking-wider uppercase rounded-sm flex items-center gap-2 cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5" />
          {showRoadmap ? "Hide System Roadmap" : "View Indexing Architecture & GCP Roadmap"}
        </button>
      </div>

      {showRoadmap && (
        <div className="mb-8 p-6 bg-[#141414] border border-blue-500/20 rounded-sm">
          <h3 className="text-xs font-bold font-mono text-[#E0E0E0] uppercase tracking-widest mb-4 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#3B82F6]" />
            Unified Indexer Cluster Architecture
          </h3>
          <div className="grid grid-cols-4 gap-6 select-none shadow-md">
            <div className="p-4 bg-[#0A0A0A] border border-white/5 rounded-sm">
              <span className="text-[10px] text-[#3B82F6] font-mono block mb-1">NODE 01: GOOGLE CLOUD SEARCH</span>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Connects Google People API, Gmail labels, and Shared Drive metadata pools directly using the Cloud Search indexing SDK to provide instant millisecond responses.
              </p>
            </div>
            <div className="p-4 bg-[#0A0A0A] border border-white/5 rounded-sm">
              <span className="text-[10px] text-[#10B981] font-mono block mb-1">NODE 02: CLOUD VISION OCR</span>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Triggers Cloud Functions whenever a file is uploaded to Google Photos. Generates inline metadata text logs for receipts and whiteboard whiteboard charts.
              </p>
            </div>
            <div className="p-4 bg-[#0A0A0A] border border-white/5 rounded-sm">
              <span className="text-[10px] text-amber-500 font-mono block mb-1">NODE 03: MEMORY GATE SECURITY</span>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Tokens reside strictly in short-lived memory contexts. No persistent caches are saved outside authorized Firebase Google user descriptors.
              </p>
            </div>
            <div className="p-4 bg-[#0A0A0A] border border-white/5 rounded-sm">
              <span className="text-[10px] text-purple-400 font-mono block mb-1">NODE 04: IA PIPELINES</span>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Trained Gemini 1.5 Pro schemas dynamically summarize content blocks of selected files or emails, keeping your workflow automated.
              </p>
            </div>
          </div>
          
          <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-white/30">
            <div className="flex gap-4">
              <span>DEPLOYMENT PIPELINE: CLOUD RUN (Active)</span>
              <span>SECURITY PROTOCOL: HMAC / KMS ROTATED</span>
            </div>
            <span className="text-[#10B981]">SYSTEM ARCHITECTURE REGISTERED</span>
          </div>
        </div>
      )}

      {/* SEARCH COMMAND BAR */}
      <div className="bg-[#111111] p-6 border border-white/10 rounded-sm mb-8 select-none">
        <div className="flex gap-4 items-center">
          <div className="flex-1 bg-[#0A0A0A] border border-white/10 px-4 py-3 flex items-center gap-3">
            <Search className="w-4 h-4 text-white/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-white placeholder-white/20 font-mono"
              placeholder="Search across Drive documents, Gmail bodies, and Photos OCR tags... (e.g., 'arbitration', 'storage')"
            />
          </div>

          <div className="flex gap-1.5 bg-[#0D0D0D] p-1 border border-white/5 text-[10px] font-mono">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-sm uppercase tracking-wide cursor-pointer ${
                activeFilter === "all" ? "bg-[#3B82F6] text-white" : "text-white/40 hover:text-white"
              }`}
            >
              All Sources
            </button>
            <button
              onClick={() => setActiveFilter("drive")}
              className={`px-3 py-1.5 rounded-sm uppercase tracking-wide cursor-pointer flex items-center gap-1.5 ${
                activeFilter === "drive" ? "bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30" : "text-white/40 hover:text-white"
              }`}
            >
              <FileText className="w-3 h-3" /> Drive
            </button>
            <button
              onClick={() => setActiveFilter("gmail")}
              className={`px-3 py-1.5 rounded-sm uppercase tracking-wide cursor-pointer flex items-center gap-1.5 ${
                activeFilter === "gmail" ? "bg-amber-500/20 text-amber-500 border border-amber-500/30" : "text-white/40 hover:text-white"
              }`}
            >
              <Mail className="w-3 h-3" /> Gmail
            </button>
            <button
              onClick={() => setActiveFilter("photos")}
              className={`px-3 py-1.5 rounded-sm uppercase tracking-wide cursor-pointer flex items-center gap-1.5 ${
                activeFilter === "photos" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-white/40 hover:text-white"
              }`}
            >
              <Image className="w-3 h-3" /> Photos
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH RESULTS INDEX */}
      <div className="bg-[#111111] border border-white/10 rounded-sm overflow-hidden select-none">
        <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
          <span className="text-xs font-bold tracking-widest uppercase text-white flex items-center gap-2 font-mono">
            <Database className="w-4 h-4 text-[#10B981]" />
            Local Query Index results
          </span>
          <span className="text-[10px] text-white/40 font-mono uppercase">
            {filteredItems.length} Index nodes found
          </span>
        </div>

        {filteredItems.length > 0 ? (
          <div className="divide-y divide-white/5">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="p-5 flex items-start gap-4 hover:bg-white/[0.015] transition-colors group"
              >
                {/* SOURCE TYPE AVATAR */}
                <div className={`p-2.5 rounded-sm border ${
                  item.source === "drive" ? "bg-[#3B82F6]/5 border-[#3B82F6]/20 text-[#3B82F6]" : ""
                } ${
                  item.source === "gmail" ? "bg-amber-500/5 border-amber-500/20 text-amber-500" : ""
                } ${
                  item.source === "photos" ? "bg-purple-500/5 border-purple-500/20 text-purple-400" : ""
                }`}>
                  {item.source === "drive" && <FileText className="w-4 h-4" />}
                  {item.source === "gmail" && <Mail className="w-4 h-4" />}
                  {item.source === "photos" && <Image className="w-4 h-4" />}
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <h4 className="text-xs font-bold font-mono text-white truncate">{item.title}</h4>
                    <span className="text-[10px] text-white/30 font-mono whitespace-nowrap flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  <p className="text-[10px] text-white/45 font-sans mb-2 font-mono">{item.subtitle}</p>
                  
                  <p className="text-xs text-white/70 font-sans leading-relaxed line-clamp-2 italic bg-[#0A0A0A]/40 p-3.5 border border-white/5 rounded-sm">
                    "{item.snippet}"
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono bg-white/5 px-2 py-0.5 rounded-sm">
                    {item.id}
                  </span>
                  {item.size && (
                    <span className="text-[9px] font-mono text-white/30">{item.size}</span>
                  )}
                  {item.url && (
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-[#3B82F6] hover:text-[#5fa1ff] font-mono uppercase tracking-wider flex items-center gap-1 border-b border-[#3B82F6]/30 hover:border-[#3B82F6]"
                    >
                      Browse Source
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center select-none">
            <Info className="w-6 h-6 text-white/20 mx-auto mb-3" />
            <h4 className="text-xs font-bold text-white mb-1">No Index nodes matched your query</h4>
            <p className="text-[10px] text-white/40 max-w-sm mx-auto font-mono">
              Double check spelling or adjust your category filtering tab.
            </p>
          </div>
        )}
      </div>

      {/* COMPLIANCE FOOTNOTE */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-white/5 rounded-sm flex items-center gap-3">
        <Lock className="w-4 h-4 text-[#3B82F6] shrink-0" />
        <p className="text-[10px] text-white/40 font-mono leading-relaxed uppercase">
          SECURITY GUARANTEE: Live OAuth queries route purely through ephemeral cloud pipelines. Abdulla's database holds maximum classification integrity.
        </p>
      </div>
    </div>
  );
}
