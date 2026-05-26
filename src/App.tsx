/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <div className="bg-[#0A0A0A] text-[#E0E0E0] font-sans h-screen w-screen flex flex-col overflow-hidden">
      {/* TOP NAV/SYSTEM BAR */}
      <header className="border-b border-white/10 h-16 flex items-center justify-between px-8 bg-[#111111]">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse"></div>
          <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-white/70">
            Digital Operating System v4.0.2
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Storage Utilization</span>
            <span className="text-xs font-mono">14.2 TB / 30 TB</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Security Level</span>
            <span className="text-xs text-[#3B82F6] font-bold tracking-widest">MAXIMUM</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR: ROLE SELECTOR & SERVICES */}
        <nav className="w-64 border-r border-white/10 flex flex-col bg-[#0D0D0D]">
          <div className="p-6">
            <p className="text-[10px] text-white/30 uppercase mb-4 tracking-[0.1em]">Active Master Role</p>
            <div className="p-3 border border-[#3B82F6]/30 bg-[#3B82F6]/5 rounded-sm mb-6">
              <span className="text-xs font-bold text-white">Operations Manager</span>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-xs text-white/60 hover:text-white cursor-pointer">
                <div className="w-1 h-4 bg-white/20"></div> Automation Architect
              </li>
              <li className="flex items-center gap-3 text-xs text-white/60 hover:text-white cursor-pointer">
                <div className="w-1 h-4 bg-white/20"></div> Senior Software Engineer
              </li>
              <li className="flex items-center gap-3 text-xs text-white/60 hover:text-white cursor-pointer">
                <div className="w-1 h-4 bg-white/20"></div> Research Partner
              </li>
            </ul>
          </div>
          <div className="mt-auto p-6 border-t border-white/5">
            <p className="text-[10px] text-white/30 uppercase mb-4">Ecosystem Nodes</p>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-white/50">Google Cloud</span>
                <span className="text-[#10B981]">ONLINE</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-white/50">GitHub Enterprise</span>
                <span className="text-[#10B981]">ONLINE</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-white/50">MCP Servers</span>
                <span className="text-orange-400">SYNCING</span>
              </div>
            </div>
          </div>
        </nav>

        {/* CENTER CONTENT: DASHBOARD */}
        <div className="flex-1 flex flex-col">
          {/* STATUS ROW */}
          <div className="grid grid-cols-4 border-b border-white/10">
            <div className="p-6 border-r border-white/10">
              <span className="text-[10px] text-[#10B981] font-bold block mb-1 uppercase tracking-tighter italic">Done</span>
              <p className="text-xs text-white/80">Workspace Backup Automation</p>
            </div>
            <div className="p-6 border-r border-white/10">
              <span className="text-[10px] text-[#3B82F6] font-bold block mb-1 uppercase tracking-tighter italic">Prepared</span>
              <p className="text-xs text-white/80">Cloud Run Deployment (v1.2)</p>
            </div>
            <div className="p-6 border-r border-white/10">
              <span className="text-[10px] text-red-500 font-bold block mb-1 uppercase tracking-tighter italic">Needs Approval</span>
              <p className="text-xs text-white/80">UAE Contacts Normalization</p>
            </div>
            <div className="p-6">
              <span className="text-[10px] text-white/30 font-bold block mb-1 uppercase tracking-tighter italic">Recommended</span>
              <p className="text-xs text-white/80">Drive Duplicate Triage</p>
            </div>
          </div>

          {/* MAINT WORKSPACE */}
          <div className="flex-1 p-8 overflow-hidden">
            <div className="mb-8">
              <h2 className="text-xl font-light mb-2">Project: <span className="text-white font-medium">Contact System Audit</span></h2>
              <p className="text-xs text-white/40 max-w-2xl italic">Performing structural normalization and duplicate detection across Google Contacts for UAE region specifically. All destructive actions paused pending executive approval.</p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER LOGS */}
      <footer className="h-12 border-t border-white/10 bg-[#0D0D0D] flex items-center px-8 justify-between">
        <div className="flex items-center gap-6 text-[10px] font-mono text-white/40 uppercase tracking-widest">
          <span>Session: Active</span>
          <span>Cloud Tokens: Reserved</span>
          <span>Dry-Run Mode: ENABLED</span>
        </div>
        <div className="text-[10px] text-white/30 italic">System building next step: Verification of Cloud Deployment scripts</div>
      </footer>
    </div>
  );
}

