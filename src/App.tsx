/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import StatusRow from "./components/StatusRow";
import ContactsAudit from "./components/ContactsAudit";
import UnifiedSearch from "./components/UnifiedSearch";
import Dashboard from "./components/Dashboard";
import SubscriptionsAudit from "./components/SubscriptionsAudit";
import { Contact, AuditLog, ActiveRole } from "./types";
import { initialMockContacts, initialAuditLogs } from "./data/mockData";
import { initAuth, googleSignIn, logout } from "./lib/firebaseAuth";
import { User } from "firebase/auth";
import { ShieldCheck, ToggleLeft, ToggleRight, LogOut, Loader2, Sparkles, Terminal } from "lucide-react";

export default function App() {
  // Application Modes & Roles
  const [activeRole, setActiveRole] = useState<ActiveRole>("manager");
  const [activeView, setActiveView] = useState<"dashboard" | "subscriptions" | "contacts" | "search">("dashboard");
  
  // Data States
  const [contacts, setContacts] = useState<Contact[]>(initialMockContacts);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [dryRunMode, setDryRunMode] = useState<boolean>(true);

  // Authentication States
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initialize google auth state listener on app launch
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        setAuthLoading(false);
        addLog("OAUTH_AUTH_SUCCESS", `Authenticated as ${currentUser.email}. Read-only Workspace APIs connected; write actions remain approval-locked.`, "DONE", "Daniel");
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setAuthLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setAuthLoading(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        addLog("OAUTH_SIGN_IN", `Read-only Workspace session authenticated for: ${result.user.email}`, "DONE", "Daniel");
      }
    } catch (err) {
      console.error("Auth popup error:", err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
      addLog("OAUTH_SIGN_OUT", "User requested session closing. Access token invalidated.", "DONE", "Daniel");
    } catch (err) {
      console.error("Sign out fail:", err);
    }
  };

  const addLog = (
    actionType: string, 
    description: string, 
    status: AuditLog["status"], 
    operator: AuditLog["operator"]
  ) => {
    const newLog: AuditLog = {
      id: `LOG-00${auditLogs.length + 1}`,
      timestamp: new Date().toISOString(),
      actionType,
      description,
      status,
      operator
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Status Metrics counting
  const doneCount = contacts.filter(c => c.status === "DONE" || c.status === "APPROVED").length;
  const preparedCount = 3; // Static roadmap representations representing indexer sources
  const approvalCount = contacts.filter(c => c.issueType !== "NONE" && c.status === "PENDING").length;
  const recommendedCount = 3; // Sources Drive + Gmail + Photos

  return (
    <div className="bg-[#0A0A0A] text-[#E0E0E0] font-sans h-screen w-screen flex flex-col overflow-hidden">
      
      {/* TOP NAV/SYSTEM BAR */}
      <header className="border-b border-white/10 h-16 flex items-center justify-between px-8 bg-[#111111] shrink-0 select-none">
        <div className="flex items-center gap-4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></div>
          <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-white/70 font-mono">
            Digital Operating System v4.0.2
          </h1>
        </div>

        {/* CONTROLS AREA: OAUTH & DRY-RUN MODES */}
        <div className="flex items-center gap-8">
          {/* DRY-RUN MODE TRIGGER */}
          <div className="flex items-center gap-3 bg-[#0A0A0A] border border-white/5 py-1.5 px-3 rounded-sm">
            <span className="text-[10px] uppercase font-mono tracking-wider text-white/50">
              Dry-Run Mode
            </span>
            <button
              onClick={() => {
                const nextMode = !dryRunMode;
                setDryRunMode(nextMode);
                addLog(
                  "ENV_MODE_CHANGE",
                  `Toggled environment to ${nextMode ? "DRY-RUN SAFETY" : "LIVE DESTRUCTIVE WRITE"}`,
                  "DONE",
                  "Daniel"
                );
              }}
              className="text-[#3B82F6] hover:text-white transition-colors cursor-pointer"
              title="Toggle safety dry-run"
            >
              {dryRunMode ? (
                <div className="flex items-center gap-1.5 text-[#10B981] font-mono text-xs font-bold">
                  <span>ENABLED</span>
                  <ToggleRight className="w-5 h-5" />
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-red-500 font-mono text-xs font-bold">
                  <span>DISABLED (LIVE)</span>
                  <ToggleLeft className="w-5 h-5" />
                </div>
              )}
            </button>
          </div>

          {/* GOOGLE INTEGRATION OAUTH STATUS */}
          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            {authLoading ? (
              <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-[9px] text-[#10B981] font-mono font-bold tracking-wider uppercase">
                    API Connected
                  </span>
                  <span className="text-xs text-white/60 font-mono truncate max-w-40">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 border border-white/10 rounded-sm hover:border-red-500/40 hover:text-red-400 transition-all cursor-pointer"
                  title="Disconnect OAuth Token"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="gsi-material-button text-xs font-mono border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] hover:bg-[#3B82F6]/20 px-3 py-1.5 rounded-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                Connect Workspace API
              </button>
            )}
          </div>

          {/* RESOURCE METRICS */}
          <div className="flex items-center gap-10 border-l border-white/10 pl-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Storage Utilization</span>
              <span className="text-xs font-mono">14.2 TB / 30 TB</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Security Level</span>
              <span className="text-xs text-[#3B82F6] font-bold tracking-widest font-mono">MAXIMUM</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER LAYOUT */}
      <main className="flex-1 flex overflow-hidden">
        {/* SIDEBAR COMPONENT */}
        <Sidebar
          activeRole={activeRole}
          setActiveRole={setActiveRole}
          storageUsed="14.2 TB"
          storageMax="30 TB"
        />

        {/* WORKSPACE AREA */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#0A0A0A]">
          {/* STATS STATUS ROW */}
          <StatusRow
            doneCount={doneCount}
            preparedCount={preparedCount}
            approvalCount={approvalCount}
            recommendedCount={recommendedCount}
            activeView={activeView}
            setActiveView={setActiveView}
          />

          {/* CENTRAL CLIENT SECTIONS */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#0A0A0A]">
            {activeView === "dashboard" ? (
              <Dashboard
                onNavigate={setActiveView}
                contactsCount={contacts.length}
                duplicateCount={approvalCount}
                dryRunMode={dryRunMode}
                accessToken={accessToken}
                addLog={addLog}
              />
            ) : activeView === "subscriptions" ? (
              <SubscriptionsAudit
                dryRunMode={dryRunMode}
                addLog={addLog}
              />
            ) : activeView === "contacts" ? (
              <ContactsAudit
                contacts={contacts}
                setContacts={setContacts}
                dryRunMode={dryRunMode}
                addLog={addLog}
                accessToken={accessToken}
              />
            ) : (
              <UnifiedSearch />
            )}
          </div>
        </div>
      </main>

      {/* FOOTER TERMINAL TELEMETRY */}
      <footer className="h-12 border-t border-white/10 bg-[#0D0D0D] flex items-center px-8 justify-between shrink-0 select-none">
        <div className="flex items-center gap-6 text-[10px] font-mono text-white/40 uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Session: Active
          </span>
          <span>Cloud Tokens: Reserved</span>
          <span className={dryRunMode ? "text-[#10B981]" : "text-red-400"}>
            Dry-Run Option: {dryRunMode ? "PROTECTED" : "MUTATION DIRECT-WRITE"}
          </span>
        </div>
        <div className="text-[10px] hover:text-white text-white/30 italic flex items-center gap-1 font-mono transition-colors">
          <Terminal className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span>Daniel Command Suggestion: {activeView === "contacts" ? "Certify manual clearance checklist to allow UAE phone norm changes" : "View search architecture roadmap in search view tab"}</span>
        </div>
      </footer>
    </div>
  );
}
