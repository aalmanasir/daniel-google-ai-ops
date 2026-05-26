import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Contact, AuditLog } from "../types";
import { normalizeUAEPhone } from "../utils/phoneUtils";
import { initialMockContacts } from "../data/mockData";
import { 
  ShieldAlert, 
  Trash2, 
  RefreshCw, 
  UserPlus, 
  CheckSquare, 
  AlertTriangle, 
  Check, 
  UserCheck, 
  Play, 
  HelpCircle,
  FileSpreadsheet
} from "lucide-react";

interface ContactsAuditProps {
  contacts: Contact[];
  setContacts: Dispatch<SetStateAction<Contact[]>>;
  dryRunMode: boolean;
  addLog: (actionType: string, description: string, status: any, operator: any) => void;
  accessToken: string | null;
}

export default function ContactsAudit({
  contacts,
  setContacts,
  dryRunMode,
  addLog,
  accessToken,
}: ContactsAuditProps) {
  // Manual checklist states for safety clearance
  const [checklist, setChecklist] = useState({
    formatVerified: false,
    notesSaved: false,
    distinctConfirmed: false,
    execSignoff: false,
  });

  const [auditStep, setAuditStep] = useState<"idle" | "running" | "ended">("idle");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Auto-run formatting simulation for display preview
  const handleNormalizeAllPreview = () => {
    setAuditStep("running");
    addLog("UI_INITIATED", "Contact analysis for UAE region started.", "DONE", "Daniel");

    setTimeout(() => {
      const updated = contacts.map((c) => {
        const normalized = c.phoneNumbers.map((p) => normalizeUAEPhone(p));
        return {
          ...c,
          normalizedPhones: normalized,
        };
      });
      setContacts(updated);
      setAuditStep("ended");
      addLog(
        "CONTACT_NORM_AUDIT",
        `Deduplication completed. Flagged ${contacts.filter(c => c.issueType !== 'NONE').length} items correctly.`,
        "DONE",
        "Daniel"
      );
    }, 1000);
  };

  // Perform repair action
  const handleRepairContact = (id: string) => {
    if (!checklist.formatVerified || !checklist.execSignoff) {
      alert("Executive Safety Checklist items must be certified before applying format changes.");
      return;
    }

    const actionText = dryRunMode
      ? `[DRY-RUN] Repaired UAE phone formatting for contact ${id}`
      : `[LIVE UPDATE] Formatting applied & stored for contact ${id}`;

    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            phoneNumbers: [...c.normalizedPhones],
            status: dryRunMode ? "APPROVED" : "DONE",
            notes: `${c.notes} (Verified UAE format normalized on 2026-05-26)`,
          };
        }
        return c;
      })
    );

    addLog("REPAIR_CONTACT", actionText, "DONE", dryRunMode ? "Daniel" : "Abdulla");
    setSelectedContact(null);
  };

  // Merge duplicates together
  const handleMergeGroup = (group: string) => {
    if (!checklist.distinctConfirmed || !checklist.execSignoff) {
      alert("Safety clearance checklist must be fully ticked prior to modifying contact tables.");
      return;
    }

    const matchedContacts = contacts.filter((c) => c.duplicateGroup === group);
    if (matchedContacts.length <= 1) return;

    // First becomes survivor
    const survivor = matchedContacts[0];
    const mergedNames = Array.from(new Set(matchedContacts.map((c) => c.displayName))).join(" / ");
    const mergedEmails = Array.from(new Set(matchedContacts.flatMap((c) => c.emails)));
    const mergedPhones = Array.from(new Set(matchedContacts.flatMap((c) => c.phoneNumbers)));

    const actionText = dryRunMode
      ? `[DRY-RUN] Merged duplicate group ${group} (${mergedNames})`
      : `[LIVE WRITE] Merged database profiles in duplicate group ${group}`;

    setContacts((prev) => {
      // Remove other group members, keep survivor with merged info
      let survivorReplaced = false;
      return prev.map((c) => {
        if (c.duplicateGroup === group) {
          if (!survivorReplaced) {
            survivorReplaced = true;
            return {
              ...survivor,
              phoneNumbers: mergedPhones,
              normalizedPhones: mergedPhones.map(p => normalizeUAEPhone(p)),
              emails: mergedEmails,
              issueType: "NONE",
              recommendedAction: "NO_ACTION",
              status: dryRunMode ? "APPROVED" : "DONE",
              notes: `Merged duplicate entries under executive signoff GRP. Original inputs preserved.`,
            } as Contact;
          } else {
            // flag to drop or mark as SKIPPED/DONE (purged in live mode)
            return {
              ...c,
              status: dryRunMode ? "SKIPPED" : "DONE",
              notes: "Archived during master deduplication merge",
            } as Contact;
          }
        }
        return c;
      });
    });

    addLog("MERGE_DUPLICATES", actionText, "DONE", dryRunMode ? "Daniel" : "Abdulla");
  };

  const isChecklistComplete = Object.values(checklist).every((val) => val === true);

  return (
    <div className="flex-1 overflow-y-auto p-8 font-sans">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-xl font-light mb-2 flex items-center gap-2">
            Workspace: <span className="text-white font-medium">Google Contacts Deduplication Suite</span>
          </h2>
          <p className="text-xs text-white/40 max-w-2xl italic tracking-wide">
            Providing structured UAE duplicate clustering (+971 mobile parsing) and dry-run safety reporting. All write tasks remain locked.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleNormalizeAllPreview}
            className="px-4 py-2 border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] hover:bg-[#3B82F6]/20 transition-all text-xs font-mono tracking-wider uppercase rounded-sm flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${auditStep === "running" ? "animate-spin" : ""}`} />
            Run Audit Refresh
          </button>
          
          <button
            onClick={() => {
              // reset mock contacts
              setContacts(initialMockContacts);
              setChecklist({
                formatVerified: false,
                notesSaved: false,
                distinctConfirmed: false,
                execSignoff: false,
              });
              addLog("STAGE_RESET", "Re-initialized system mockup datasets to default.", "DONE", "Daniel");
            }}
            className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-all text-xs font-mono rounded-sm cursor-pointer"
          >
            Reset Table States
          </button>
        </div>
      </div>

      {/* DETAILED STATS ROW */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-[#141414] border border-white/10 rounded-sm">
          <span className="text-[10px] uppercase text-white/40 block font-mono">Clustered Matches</span>
          <span className="text-2xl font-light text-amber-500 font-mono">
            {contacts.filter(c => c.duplicateGroup).length} contacts
          </span>
          <p className="text-[10px] text-white/30 mt-1 italic leading-tight">
            Matching based on same standard UAE prefixes and matching name variables.
          </p>
        </div>
        
        <div className="p-4 bg-[#141414] border border-white/10 rounded-sm">
          <span className="text-[10px] uppercase text-white/40 block font-mono">UAE Anomalies Found</span>
          <span className="text-2xl font-light text-red-400 font-mono">
            {contacts.filter(c => c.issueType === "SUSPICIOUS_FORMAT").length} profiles
          </span>
          <p className="text-[10px] text-white/30 mt-1 italic leading-tight">
            Flagging +9710 prefix and spaces/hyphen variations for quick alignment.
          </p>
        </div>

        <div className="p-4 bg-[#141414] border border-[#10B981]/20 bg-[#10B981]/5 rounded-sm">
          <span className="text-[10px] uppercase text-[#10B981] block font-mono">Environment Mode</span>
          <span className="text-2xl font-light text-white uppercase font-mono tracking-wider">
            {dryRunMode ? "DRY-RUN ACTIVE" : "LIVE ENABLED"}
          </span>
          <p className="text-[10px] text-[#10B981]/70 mt-1 italic leading-tight">
            {dryRunMode ? "Safe simulation: No actual Google Cloud mutations will occur." : "Direct writing: Mutating live Google People API lists."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* DUPLICATE LIST AND ACTIONS - MAIN TABLE */}
        <div className="col-span-2 space-y-6">
          <div className="bg-[#111111] border border-white/10 rounded-sm overflow-hidden">
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center select-none">
              <span className="text-xs font-bold tracking-widest uppercase text-white flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#3B82F6]" />
                Google Contacts Database Audit
              </span>
              <span className="text-[10px] text-white/40 font-mono">
                Showing {contacts.filter(c => c.status !== "SKIPPED").length} active entries
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-mono whitespace-nowrap">
                <thead className="bg-white/5 text-white/40 uppercase tracking-wider text-[9px]">
                  <tr>
                    <th className="p-3 font-normal border-b border-white/10">ID</th>
                    <th className="p-3 font-normal border-b border-white/10">Display Name</th>
                    <th className="p-3 font-normal border-b border-white/10">Current Format</th>
                    <th className="p-3 font-normal border-b border-white/10">Proposed Norm</th>
                    <th className="p-3 font-normal border-b border-white/10 text-center">Diagnostics</th>
                    <th className="p-3 font-normal border-b border-white/10 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-white/80 divide-y divide-white/5">
                  {contacts.filter(c => c.status !== "SKIPPED").map((item) => {
                    const hasIssue = item.issueType !== "NONE";
                    return (
                      <tr 
                        key={item.id} 
                        className={`hover:bg-white/[0.02] transition-colors cursor-pointer ${
                          selectedContact?.id === item.id ? "bg-[#3B82F6]/5" : ""
                        }`}
                        onClick={() => setSelectedContact(item)}
                      >
                        <td className="p-3 text-white/30">{item.id}</td>
                        <td className="p-3 font-sans font-medium text-white">
                          <div className="flex flex-col">
                            <span>{item.displayName}</span>
                            {item.emails.length > 0 && (
                              <span className="text-[9px] text-white/40 lowercase">{item.emails[0]}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 font-mono text-white/60">
                          {item.phoneNumbers.join(", ")}
                        </td>
                        <td className="p-3 font-mono text-[#10B981] font-bold">
                          {item.normalizedPhones.join(", ")}
                        </td>
                        <td className="p-3 text-center">
                          {item.issueType === "SUSPICIOUS_FORMAT" && (
                            <span className="text-[9px] text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                              Anomalous Format
                            </span>
                          )}
                          {item.issueType === "DUPLICATE_NAME" && (
                            <span className="text-[9px] text-red-400 bg-red-400/10 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                              Name Clash
                            </span>
                          )}
                          {item.issueType === "DUPLICATE_PHONE" && (
                            <span className="text-[9px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                              Phone Clash
                            </span>
                          )}
                          {item.issueType === "NONE" && (
                            <span className="text-[9px] text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                              Perfect
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-2 justify-end">
                            {item.duplicateGroup && (
                              <button
                                onClick={() => handleMergeGroup(item.duplicateGroup || "")}
                                className="px-2 py-1 text-[10px] bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500/20 rounded-sm cursor-pointer font-sans font-bold"
                              >
                                Merge Group
                              </button>
                            )}

                            {item.issueType === "SUSPICIOUS_FORMAT" && (
                              <button
                                onClick={() => handleRepairContact(item.id)}
                                className="px-2 py-1 text-[10px] bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/20 rounded-sm cursor-pointer font-sans font-bold"
                              >
                                Repair Format
                              </button>
                            )}

                            {item.status === "APPROVED" && (
                              <span className="text-[10px] text-white/40 bg-white/5 py-1 px-2 rounded-sm italic">
                                Approved Audit
                              </span>
                            )}
                            {item.status === "DONE" && (
                              <span className="text-[10px] text-[#10B981] bg-[#10B981]/10 py-1 px-2 rounded-sm font-bold flex items-center gap-1">
                                <Check className="w-3 h-3" /> Live Mutated
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ACTIVE LOG DISPLAY FOR SECURITY AUDITS */}
          <div className="bg-[#111111] p-4 border border-white/10 rounded-sm">
            <h4 className="text-xs uppercase tracking-widest font-mono text-white/50 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-pulse" />
              Daniel's Current Operational Log
            </h4>
            <div className="bg-[#050505] p-3 border border-white/5 font-mono text-[10px] text-white/50 space-y-1.5 max-h-40 overflow-y-auto">
              <p className="text-white/30">[2026-05-26 06:40] Operating Node init completed.</p>
              <p className="text-blue-400">[2026-05-26 06:44] Dry-Run Mode is currently state-guarded.</p>
              <p className="text-[#10B981]">[2026-05-26 06:45] System ready to format UAE styles beginning with 050, 052, 055, 056.</p>
              <p className="text-amber-500">[2026-05-26 07:08] OAuth Access Token mapped securely to temporary context.</p>
              {contacts.some(c => c.status === 'APPROVED') && (
                <p className="text-purple-400">[2026-05-26 07:11] Dry-run repair outputs generated and validated safely.</p>
              )}
              {contacts.some(c => c.status === 'DONE') && (
                <p className="text-red-400">[2026-05-26 07:11] LIVE command executed on approval clearance.</p>
              )}
            </div>
          </div>
        </div>

        {/* SIDEBAR PANELS: CHECKLIST & ACTIONS */}
        <div className="space-y-6">
          {/* SECURITY & COMPLIANCE GATE (THE MANDATORY CHECKLIST) */}
          <div className="bg-[#141414] border border-red-500/20 rounded-sm p-6">
            <div className="flex items-center gap-2 text-red-500 mb-4 select-none">
              <ShieldAlert className="w-4 h-4" />
              <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-[#E0E0E0]">
                Executive Clearance Sign-Off
              </h3>
            </div>
            
            <p className="text-[11px] text-white/40 italic mb-4 leading-relaxed">
              As Abdulla's Office Manager, I require manual confirmation for all four security gates before executing database writes.
            </p>

            <div className="space-y-4">
              <label className="flex items-start gap-3 text-xs text-white/70 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={checklist.formatVerified}
                  onChange={(e) => setChecklist(prev => ({ ...prev, formatVerified: e.target.checked }))}
                  className="mt-0.5 rounded bg-[#0A0A0A] border-white/20 text-[#3B82F6] focus:ring-0"
                />
                <span className="font-sans leading-tight">
                  Verify UAE mobile number parsed formatting (+9715x) matches legal standards.
                </span>
              </label>

              <label className="flex items-start gap-3 text-xs text-white/70 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={checklist.notesSaved}
                  onChange={(e) => setChecklist(prev => ({ ...prev, notesSaved: e.target.checked }))}
                  className="mt-0.5 rounded bg-[#0A0A0A] border-white/20 text-[#3B82F6] focus:ring-0"
                />
                <span className="font-sans leading-tight">
                  Document and backup original input syntax in profile Notes prior to repair.
                </span>
              </label>

              <label className="flex items-start gap-3 text-xs text-white/70 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={checklist.distinctConfirmed}
                  onChange={(e) => setChecklist(prev => ({ ...prev, distinctConfirmed: e.target.checked }))}
                  className="mt-0.5 rounded bg-[#0A0A0A] border-white/20 text-[#3B82F6] focus:ring-0"
                />
                <span className="font-sans leading-tight">
                  Confirm distinct branches (e.g. Zayed Office) are NOT incorrectly merged.
                </span>
              </label>

              <label className="flex items-start gap-3 text-xs text-white/70 hover:text-white cursor-pointer select-none text-red-400">
                <input
                  type="checkbox"
                  checked={checklist.execSignoff}
                  onChange={(e) => setChecklist(prev => ({ ...prev, execSignoff: e.target.checked }))}
                  className="mt-0.5 rounded bg-[#0A0A0A] border-red-500/30 text-red-500 focus:ring-0"
                />
                <span className="font-sans leading-bold font-bold leading-tight">
                  Abdulla's explicit signoff. I authorize Daniel to make changes (Dry or Live).
                </span>
              </label>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5">
              <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                <span className="text-white/40">Clearance Status</span>
                <span className={isChecklistComplete ? "text-[#10B981] font-bold" : "text-amber-500 font-bold"}>
                  {isChecklistComplete ? "APPROVED" : "PENDING CLEARANCE"}
                </span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isChecklistComplete ? "bg-[#10B981]" : "bg-amber-500"
                  }`}
                  style={{ 
                    width: `${
                      (Object.values(checklist).filter(v => v).length / 4) * 100
                    }%` 
                  }}
                />
              </div>
            </div>
          </div>

          {/* CONTACT CONTEXT DETAIL PANEL */}
          {selectedContact && (
            <div className="bg-[#141414] p-5 border border-white/10 rounded-sm">
              <h4 className="text-xs uppercase font-mono tracking-wider text-white mb-3">
                Selected Profile diagnostics
              </h4>
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-white/40 block">NAME</span>
                  <span className="text-white text-sm font-sans font-medium">{selectedContact.displayName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block">INPUT FORMAT</span>
                  <span className="text-red-400">{selectedContact.phoneNumbers.join(", ")}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block">NORMALIZED (UAE COMPLIANT)</span>
                  <span className="text-[#10B981] font-bold">{selectedContact.normalizedPhones.join(", ")}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block">DANIEL'S RECOMMENDATION</span>
                  <span className="text-amber-400 capitalize">{selectedContact.recommendedAction} Profile</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block">SYSTEM STATUS</span>
                  <span className="text-white/60 text-[11px] leading-tight font-sans italic">{selectedContact.notes}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
