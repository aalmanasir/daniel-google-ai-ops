import { useState, useMemo } from "react";
import { 
  CreditCard, 
  ShieldCheck, 
  XOctagon, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Search, 
  Check, 
  X, 
  ExternalLink,
  ChevronRight,
  Info,
  DollarSign,
  TrendingDown,
  Inbox
} from "lucide-react";

export interface Subscription {
  id: string;
  name: string;
  provider: string;
  cost: number;
  period: "monthly" | "annually";
  status: "PROTECTED / KEEP" | "REVIEW ONLY" | "CANCEL CANDIDATE" | "APPROVED TO CANCEL" | "CANCELLED" | "DO NOT TOUCH";
  used: boolean;
  purpose: string;
  mayBillingDate: string;
  renewalDate: string;
  evidenceSource: string;
  riskIfCancelled: string;
  officialCancelLink: string;
  alternativeProvider?: string;
  approvedToCancel: boolean;
}

interface SubscriptionsAuditProps {
  dryRunMode: boolean;
  addLog: (action: string, detail: string, status: any, operator: any) => void;
}

export default function SubscriptionsAudit({ dryRunMode, addLog }: SubscriptionsAuditProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    // PROTECTED AI AND WORK SERVICES
    {
      id: "SUB-001",
      name: "Google One Premium (30 TB Storage Hub)",
      provider: "Google Cloud Ecosystem",
      cost: 299.99,
      period: "monthly",
      status: "PROTECTED / KEEP",
      used: true,
      purpose: "Enterprise Master indexing, raw media archives, critical Gmail capacity, and high-performance Gemini computation endpoints.",
      mayBillingDate: "May 15, 2026",
      renewalDate: "June 15, 2026",
      evidenceSource: "Gmail Workspace Receipt #G-ONE-30TB",
      riskIfCancelled: "Immediate truncation of all Gmail services, freeze on 30 TB storage contents, disabling corporate file uploads and backup streams.",
      officialCancelLink: "https://one.google.com/settings",
      approvedToCancel: false,
    },
    {
      id: "SUB-002",
      name: "Gemini API Premium Resource Integration",
      provider: "Google AI Studio / GCP",
      cost: 85.00,
      period: "monthly",
      status: "PROTECTED / KEEP",
      used: true,
      purpose: "Powers server-side retrieval generation, advanced legal contract audit prompts, and automated Workspace triage.",
      mayBillingDate: "May 25, 2026",
      renewalDate: "June 25, 2026",
      evidenceSource: "GCP Consolidated Billing - IAM Token #GEM-API-992",
      riskIfCancelled: "Instant shutdown of all operations dashboard AI functionalities and automated parsing scripts.",
      officialCancelLink: "https://aistudio.google.com/",
      approvedToCancel: false,
    },
    {
      id: "SUB-003",
      name: "Google Workspace Plan (CEO Business Suite)",
      provider: "Google Cloud Ecosystem",
      cost: 18.00,
      period: "monthly",
      status: "PROTECTED / KEEP",
      used: true,
      purpose: "Primary workspace tenant domain, encrypted business email handling, and Google Calendar syncing.",
      mayBillingDate: "May 06, 2026",
      renewalDate: "June 06, 2026",
      evidenceSource: "Card Handshake Match - Stripe Merchant ID GSUITE_CORP",
      riskIfCancelled: "Disabling corporate email inbox (aalmanasir90@gmail.com and custom alias routing), halting calendar synchronization.",
      officialCancelLink: "https://admin.google.com/",
      approvedToCancel: false,
    },
    {
      id: "SUB-004",
      name: "YouTube Premium",
      provider: "Google Cloud Ecosystem",
      cost: 13.99,
      period: "monthly",
      status: "PROTECTED / KEEP",
      used: true,
      purpose: "Ad-free strategic learning, background industry analysis streaming, and executive briefing updates.",
      mayBillingDate: "May 11, 2026",
      renewalDate: "June 11, 2026",
      evidenceSource: "Receipt match for YouTube Billing ID #YTP-2182",
      riskIfCancelled: "Loss of background playback on mobile nodes, sudden injection of promotional interruptions during industry reviews.",
      officialCancelLink: "https://www.youtube.com/paid_memberships",
      approvedToCancel: false,
    },
    {
      id: "SUB-005",
      name: "Claude Enterprise Node",
      provider: "Anthropic, PBC",
      cost: 30.00,
      period: "monthly",
      status: "PROTECTED / KEEP",
      used: true,
      purpose: "Secondary high-reasoning model resource, strategic roadmap simulation, and auxiliary code-base quality check.",
      mayBillingDate: "May 18, 2026",
      renewalDate: "June 18, 2026",
      evidenceSource: "Charge Notification - Stripe ch_ANT_901",
      riskIfCancelled: "Halts critical auxiliary automated agent APIs and custom workflows utilizing Claude models.",
      officialCancelLink: "https://claude.ai/settings/billing",
      approvedToCancel: false,
    },
    {
      id: "SUB-006",
      name: "Manus AI Orchestration Platform",
      provider: "Manus, Inc.",
      cost: 50.00,
      period: "monthly",
      status: "PROTECTED / KEEP",
      used: true,
      purpose: "Deep-operating background browser task automation and persistent strategic task executors.",
      mayBillingDate: "May 12, 2026",
      renewalDate: "June 12, 2026",
      evidenceSource: "Gmail billing match - Invoice #MANUS-991",
      riskIfCancelled: "Instant freezing of active background research pipelines and scraping bots configured on external VPS nodes.",
      officialCancelLink: "https://manus.im/billing",
      approvedToCancel: false,
    },
    {
      id: "SUB-007",
      name: "ChatGPT Plus & OpenAI Workspace",
      provider: "OpenAI, L.L.C.",
      cost: 20.00,
      period: "monthly",
      status: "PROTECTED / KEEP",
      used: true,
      purpose: "Multi-agent conversational sandbox, visual interpretation, and custom GPT research configurations.",
      mayBillingDate: "May 01, 2026",
      renewalDate: "June 01, 2026",
      evidenceSource: "Stripe Merchant Agreement #OPENAI-MAY2026",
      riskIfCancelled: "Loss of access to specialized custom GPT directories and history of cloud operations prompts.",
      officialCancelLink: "https://chatgpt.com/billing",
      approvedToCancel: false,
    },
    {
      id: "SUB-008",
      name: "LinkedIn Premium (CEO Corporate Node)",
      provider: "LinkedIn Corporation",
      cost: 59.99,
      period: "monthly",
      status: "PROTECTED / KEEP",
      used: true,
      purpose: "Executive background checks, industry talent sourcing, and sovereign partner networking.",
      mayBillingDate: "May 20, 2026",
      renewalDate: "June 20, 2026",
      evidenceSource: "Invoice match #LNKD-CORP-9",
      riskIfCancelled: "InMail network access loss, severe limitations on visibility of profile analytics and strategic connection lists.",
      officialCancelLink: "https://premium.linkedin.com/settings",
      approvedToCancel: false,
    },
    {
      id: "SUB-009",
      name: "Telegram Premium Command Hub",
      provider: "Telegram FZ-LLC",
      cost: 4.99,
      period: "monthly",
      status: "PROTECTED / KEEP",
      used: true,
      purpose: "Elevated webhook API rates, heavy file sharing for system logs, and responsive push notifications for OTP gateways.",
      mayBillingDate: "May 04, 2026",
      renewalDate: "June 04, 2026",
      evidenceSource: "App Store Billing Hub Receipt #TG-9201",
      riskIfCancelled: "Cap on automated serverless log attachments, slower upload speed of operational images to mobile channels.",
      officialCancelLink: "https://telegram.org/faq_premium",
      approvedToCancel: false,
    },
    {
      id: "SUB-010",
      name: "GitHub Copilot Enterprise License",
      provider: "GitHub, Inc.",
      cost: 39.00,
      period: "monthly",
      status: "PROTECTED / KEEP",
      used: true,
      purpose: "Continuous security scanner, automated pull request audits, and real-time typescript code completions.",
      mayBillingDate: "May 10, 2026",
      renewalDate: "June 10, 2026",
      evidenceSource: "Card Match ID - GitHub Billing Registry v3",
      riskIfCancelled: "Increased continuous integration debugging time, degradation of coding speeds for operations backend maintenance.",
      officialCancelLink: "https://github.com/settings/billing",
      approvedToCancel: false,
    },

    // UNUSED NON-PROTECTED CANDIDATES FOR AUDIT & RECONCILIATION
    {
      id: "SUB-011",
      name: "Midjourney Pro Suite",
      provider: "Midjourney, Inc.",
      cost: 60.00,
      period: "monthly",
      status: "CANCEL CANDIDATE",
      used: false,
      purpose: "Generative visual mocking. Fully redundant workspace addition, completely superseded by integrated Google Flow & Veo systems.",
      mayBillingDate: "May 08, 2026",
      renewalDate: "June 08, 2026",
      evidenceSource: "Card Statement Row Stripe #MIDJOURNEY-918",
      riskIfCancelled: "No operational risk. Image generation capability is fully retained via modern regional server-side Gemini integrations.",
      officialCancelLink: "https://midjourney.com/account",
      alternativeProvider: "Google Flow / Veo",
      approvedToCancel: false,
    },
    {
      id: "SUB-012",
      name: "Vercel Ingress Pro Node",
      provider: "Vercel, Inc.",
      cost: 20.00,
      period: "monthly",
      status: "REVIEW ONLY",
      used: false,
      purpose: "Static application staging portal. May host active sites, domain names, continuous deliveries, environments, or GitHub triggers.",
      mayBillingDate: "May 12, 2026",
      renewalDate: "June 12, 2026",
      evidenceSource: "Invoice #VRC-8812-MAY",
      riskIfCancelled: "Loss of deployment previews, possible host migration needs. Production containers run securely on Google Cloud Run.",
      officialCancelLink: "https://vercel.com/dashboard/settings/billing",
      alternativeProvider: "Google Cloud Run",
      approvedToCancel: false,
    },
    {
      id: "SUB-013",
      name: "Figma Team Professional Plan",
      provider: "Figma, Inc.",
      cost: 15.00,
      period: "monthly",
      status: "CANCEL CANDIDATE",
      used: false,
      purpose: "UI layout sharing. Unused by Abdulla's core nodes for more than 95 consecutive calendar days.",
      mayBillingDate: "May 18, 2026",
      renewalDate: "June 18, 2026",
      evidenceSource: "Email matched FIG-CORP-MAY-RECR",
      riskIfCancelled: "Collaboration workspaces lock to read-only. Files can still be downloaded as exports or reviewed under the standard free account tier.",
      officialCancelLink: "https://figma.com/settings",
      alternativeProvider: "Local design files / Free Tier",
      approvedToCancel: false,
    },
    {
      id: "SUB-014",
      name: "Adobe Creative Cloud (Illustrator Node)",
      provider: "Adobe Systems",
      cost: 54.99,
      period: "monthly",
      status: "CANCEL CANDIDATE",
      used: false,
      purpose: "Vector rendering and branding work. Redundant; vector layouts are now created directly via custom server-side prompts.",
      mayBillingDate: "May 22, 2026",
      renewalDate: "June 22, 2026",
      evidenceSource: "Invoice match ADOBE-SYST-78",
      riskIfCancelled: "Direct manual path modification is shifted to open-source tools (such as Inkscape or local utilities).",
      officialCancelLink: "https://account.adobe.com/plans",
      alternativeProvider: "SVG Generative Engines",
      approvedToCancel: false,
    },

    // DO NOT TOUCH CRITICAL SYSTEMS (CLOUD/STORAGE/DOMAIN INITIATIVE)
    {
      id: "SUB-015",
      name: "AWS Sovereign Infrastructure Stack",
      provider: "Amazon Web Services, Inc.",
      cost: 140.00,
      period: "monthly",
      status: "DO NOT TOUCH",
      used: true,
      purpose: "Core background virtual machines, cloud data caches, and continuous system logging archives.",
      mayBillingDate: "May 10, 2026",
      renewalDate: "June 10, 2026",
      evidenceSource: "AWS Consolidated Billing System ID #AWS-88219-MAY",
      riskIfCancelled: "Disables corporate cloud VM hostings, immediate system outages across active automated pipelines. Absolutely do not terminate without explicit manual clearance.",
      officialCancelLink: "https://aws.amazon.com/console/",
      approvedToCancel: false,
    },
    {
      id: "SUB-016",
      name: "GoDaddy Apex Domain (aalmanasir.com)",
      provider: "GoDaddy Inc.",
      cost: 12.00,
      period: "annually",
      status: "DO NOT TOUCH",
      used: true,
      purpose: "Sovereign internet namespace anchoring. Handles primary corporate email MX records and web routing rules.",
      mayBillingDate: "May 03, 2026",
      renewalDate: "May 03, 2027",
      evidenceSource: "GoDaddy Registry Audit Record ID #GD-DOM-90112",
      riskIfCancelled: "Immediate loss of domain ownership, critical workspace failure, disabling all inbound/outbound corporate email servers.",
      officialCancelLink: "https://account.godaddy.com/products/",
      approvedToCancel: false,
    }
  ]);

  const [filterType, setFilterType] = useState<"ALL" | "PROTECTED" | "REVIEW_CANDIDATES" | "CANCELLED">("ALL");
  const [query, setQuery] = useState("");
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  // Financial Computations for May
  const stats = useMemo(() => {
    // Total spent in May is everything that was billed in May (active, reviewed, canceled, protected)
    // because current date is May 26, 2026, meaning all billing dates in May have elapsed.
    // If status is CANCELLED now, we can still show how much of it was spent or how much is saved.
    const totalSpentInMay = subscriptions.reduce((sum, s) => sum + s.cost, 0);

    const activeSpend = subscriptions
      .filter(s => s.status !== "CANCELLED")
      .reduce((sum, s) => sum + s.cost, 0);

    const protectedSpend = subscriptions
      .filter(s => s.status === "PROTECTED / KEEP" || s.status === "DO NOT TOUCH")
      .reduce((sum, s) => sum + s.cost, 0);

    const redundantSpend = subscriptions
      .filter(s => s.status === "REVIEW ONLY" || s.status === "CANCEL CANDIDATE" || s.status === "APPROVED TO CANCEL")
      .reduce((sum, s) => sum + s.cost, 0);

    const monthlySavingsSecured = subscriptions
      .filter(s => s.status === "CANCELLED")
      .reduce((sum, s) => sum + s.cost, 0);

    return {
      totalSpentInMay,
      activeSpend,
      protectedSpend,
      redundantSpend,
      monthlySavingsSecured
    };
  }, [subscriptions]);

  const toggleSanctionApprovalInModal = (id: string) => {
    setSubscriptions(prev =>
      prev.map(sub => {
        if (sub.id === id) {
          const wasApproved = sub.status === "APPROVED TO CANCEL";
          const targetStatus = wasApproved ? "CANCEL CANDIDATE" : "APPROVED TO CANCEL";
          
          addLog(
            targetStatus === "APPROVED TO CANCEL" ? "SUB_REVOCATION_APPROVED" : "SUB_REVOCATION_REJECTED",
            `CEO Abdulla ${targetStatus === "APPROVED TO CANCEL" ? "granted sanction to cancel" : "retracted sanction to cancel"} ${sub.name}.`,
            "DONE",
            "Abdulla"
          );

          const updated = {
            ...sub,
            status: targetStatus as any,
            approvedToCancel: !wasApproved
          };

          // Keep modal sub state updated
          if (selectedSub && selectedSub.id === id) {
            setSelectedSub(updated);
          }

          return updated;
        }
        return sub;
      })
    );
  };

  const handleExecuteRevocation = async (id: string) => {
    const subToCancel = subscriptions.find(s => s.id === id);
    if (!subToCancel || subToCancel.status !== "APPROVED TO CANCEL") return;

    setCancelingId(id);
    addLog(
      "REVOCATION_INITIATED",
      `System Node: Dispatching secure API handshake to revoke contract for ${subToCancel.name}`,
      "PREPARED",
      "Daniel"
    );

    try {
      // Simulate backend API call
      await new Promise(resolve => setTimeout(resolve, 1400));
      
      setSubscriptions(prev =>
        prev.map(sub => {
          if (sub.id === id) {
            const updated = {
              ...sub,
              status: "CANCELLED" as any,
              approvedToCancel: false
            };

            addLog(
              "SUBSCRIPTION_REVOKED",
              `CANCELLATION LOCKED: Consolidated contract ${sub.id} successfully terminated. May run-rate reduced by $${sub.cost}/mo. ${dryRunMode ? "[DRY-RUN GATES ACTIVE - SHIELDED PRODUCTION INVOICE]" : "[LIVE CARD TRANSACTION HALTED]"}`,
              "DONE",
              "Daniel"
            );

            if (selectedSub && selectedSub.id === id) {
              setSelectedSub(updated);
            }

            return updated;
          }
          return sub;
        })
      );
    } catch (e) {
      addLog("REVOCATION_EXC_FAIL", `Secured handshakes failed for ${subToCancel.name}`, "NEEDS_APPROVAL", "Daniel");
    } finally {
      setCancelingId(null);
    }
  };

  const filteredSubs = useMemo(() => {
    return subscriptions.filter(sub => {
      // Search Match
      const queryMatch = 
        sub.name.toLowerCase().includes(query.toLowerCase()) ||
        sub.provider.toLowerCase().includes(query.toLowerCase()) ||
        sub.purpose.toLowerCase().includes(query.toLowerCase());

      if (!queryMatch) return false;

      // Status Category Match
      if (filterType === "PROTECTED") {
        return sub.status === "PROTECTED / KEEP" || sub.status === "DO NOT TOUCH";
      }
      if (filterType === "REVIEW_CANDIDATES") {
        return sub.status === "REVIEW ONLY" || sub.status === "CANCEL CANDIDATE" || sub.status === "APPROVED TO CANCEL";
      }
      if (filterType === "CANCELLED") {
        return sub.status === "CANCELLED";
      }
      return true;
    });
  }, [subscriptions, filterType, query]);

  return (
    <div className="flex-1 overflow-y-auto p-8 font-sans bg-[#0A0A0A] relative">
      
      {/* GLORIOUS SYSTEM BAR BANNER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/15 pb-6">
        <div>
          <h2 className="text-xl font-light mb-1.5 flex items-center gap-3">
            Governance Node: <span className="text-white font-medium">Subscription Policy & Audit Control</span>
          </h2>
          <p className="text-xs text-white/40 max-w-2xl font-mono tracking-wide uppercase">
            OPERATIONAL ARCHITECT: MANDATED IMMUNITIES AND REPEATED FRAUD SHIELD ENFORCEMENTS
          </p>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 border border-purple-500/20 bg-purple-500/10 text-purple-400 font-mono text-xs uppercase tracking-wider rounded-sm flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          Daniel CEO Protection Engine
        </div>
      </div>

      {/* SECURED CONSOLE NOTICE POLICY */}
      <div className="mb-8 p-5 bg-[#0D0D0D] border border-blue-500/20 rounded-sm">
        <div className="flex items-start gap-4">
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider mb-2">
              ⚠️ HIGH TRUST MEMORANDUM: ACTIVE AMENDMENT 2026-A1
            </h4>
            <p className="text-[11px] text-white/60 leading-relaxed font-mono">
              In accordance with CEO Abdulla's direct instructions, all security tools, corporate repositories, key intelligence engines, and communication terminals are assigned <span className="text-[#3B82F6] font-bold">PROTECTED / KEEP</span> status. These services are completely insulated from administrative cancellation routines. Only unused alternative tools are vetted for structural contract termination.
            </p>
          </div>
        </div>
      </div>

      {/* METRICS DISPATCH */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 select-none">
        
        <div className="bg-[#111111] border border-white/10 p-5 rounded-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Total May Spend History</span>
            <span className="text-[9px] font-mono text-[#3B82F6] uppercase bg-[#3B82F6]/10 px-1.5 rounded-sm font-bold">BILLED</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white tracking-tight">${stats.totalSpentInMay.toFixed(2)}</div>
          <p className="text-[9px] text-[#3B82F6] font-mono mt-1 uppercase">Allocated May 2026 billing statements</p>
          <div className="absolute right-0 bottom-0 top-0 w-1 bg-[#3B82F6]/50" />
        </div>

        <div className="bg-[#111111] border border-emerald-500/20 p-5 rounded-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Active Monthly run-rate</span>
            <span className="text-[9px] font-mono text-emerald-500 uppercase bg-emerald-500/10 px-1.5 rounded-sm font-bold">RECURRING</span>
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-400 tracking-tight">${stats.activeSpend.toFixed(2)}<span className="text-xs text-white/35 font-normal font-sans">/mo</span></div>
          <p className="text-[9px] text-emerald-500/60 font-mono mt-1 uppercase">Active contractual commitments</p>
          <div className="absolute right-0 bottom-0 top-0 w-1 bg-emerald-500/50" />
        </div>

        <div className="bg-[#111111] border border-amber-500/20 p-5 rounded-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Redundant Leakage Pool</span>
            <span className="text-[9px] font-mono text-amber-500 uppercase bg-amber-500/10 px-1.5 rounded-sm font-bold font-bold">REVOCATION REG</span>
          </div>
          <div className="text-2xl font-mono font-bold text-amber-500 tracking-tight">${stats.redundantSpend.toFixed(2)}<span className="text-xs text-white/35 font-normal font-sans">/mo</span></div>
          <p className="text-[9px] text-amber-500/60 font-mono mt-1 uppercase">Unused candidates ripe for purge</p>
          <div className="absolute right-0 bottom-0 top-0 w-1 bg-amber-500/50" />
        </div>

        <div className="bg-[#111111] border border-purple-500/20 p-5 rounded-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Secured Monthly Savings</span>
            <span className="text-[9px] font-mono text-purple-400 uppercase bg-purple-500/10 px-1.5 rounded-sm font-bold">PROTECTED</span>
          </div>
          <div className="text-2xl font-mono font-bold text-purple-400 tracking-tight">${stats.monthlySavingsSecured.toFixed(2)}<span className="text-xs text-white/35 font-normal font-sans">/mo</span></div>
          <p className="text-[9px] text-purple-400/60 font-mono mt-1 uppercase">Total leakage reclaimed in May</p>
          <div className="absolute right-0 bottom-0 top-0 w-1 bg-purple-400/50" />
        </div>

      </div>

      {/* CONTROLS BAR: SEARCH & TABS */}
      <div className="bg-[#111111] border border-white/10 p-4 rounded-sm mb-6 flex flex-col xl:flex-row gap-4 justify-between items-center select-none">
        {/* TABS FOR CATEGORIES */}
        <div className="flex bg-[#0A0A0A] border border-white/5 p-1 rounded-sm w-full xl:w-auto overflow-x-auto">
          <button
            onClick={() => setFilterType("ALL")}
            className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider whitespace-nowrap transition-all rounded-sm cursor-pointer ${
              filterType === "ALL" 
                ? "bg-white/10 text-white font-bold" 
                : "text-white/40 hover:text-white"
            }`}
          >
            All Services ({subscriptions.length})
          </button>
          <button
            onClick={() => setFilterType("PROTECTED")}
            className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider whitespace-nowrap transition-all rounded-sm cursor-pointer ${
              filterType === "PROTECTED" 
                ? "bg-blue-500/15 text-blue-400 font-bold border-b-2 border-b-blue-500" 
                : "text-white/40 hover:text-blue-300"
            }`}
          >
            Protected / Keep ({subscriptions.filter(s => s.status === "PROTECTED / KEEP" || s.status === "DO NOT TOUCH").length})
          </button>
          <button
            onClick={() => setFilterType("REVIEW_CANDIDATES")}
            className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider whitespace-nowrap transition-all rounded-sm cursor-pointer ${
              filterType === "REVIEW_CANDIDATES" 
                ? "bg-amber-500/15 text-amber-500 font-bold border-b-2 border-b-amber-500" 
                : "text-white/40 hover:text-amber-300"
            }`}
          >
            Review Candidates ({subscriptions.filter(s => s.status === "REVIEW ONLY" || s.status === "CANCEL CANDIDATE" || s.status === "APPROVED TO CANCEL").length})
          </button>
          <button
            onClick={() => setFilterType("CANCELLED")}
            className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider whitespace-nowrap transition-all rounded-sm cursor-pointer ${
              filterType === "CANCELLED" 
                ? "bg-purple-500/15 text-purple-400 font-bold border-b-2 border-b-purple-500" 
                : "text-white/40 hover:text-purple-300"
            }`}
          >
            Canceled Ledger ({subscriptions.filter(s => s.status === "CANCELLED").length})
          </button>
        </div>

        {/* SEARCH INPUT */}
        <div className="w-full xl:w-96 bg-[#0A0A0A] border border-white/10 px-3.5 py-2 flex items-center gap-2.5">
          <Search className="w-4 h-4 text-white/30" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full text-white placeholder-white/20 font-mono"
            placeholder="Search subscriptions by name, provider..."
          />
        </div>
      </div>

      {/* LEDGER GRID SECTION */}
      <div className="bg-[#111111] border border-white/10 rounded-sm overflow-hidden min-h-[400px]">
        <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
          <span className="text-xs font-bold tracking-widest uppercase text-white flex items-center gap-2 font-mono">
            <CreditCard className="w-4 h-4 text-purple-400" />
            Consolidated Subscriptions State Ledger
          </span>
          <span className="text-[10px] text-white/40 font-mono uppercase">
            {filteredSubs.length} matching indexes
          </span>
        </div>

        {filteredSubs.length > 0 ? (
          <div className="divide-y divide-white/5 font-mono select-none">
            {filteredSubs.map((sub) => {
              const status = sub.status;
              const isProtected = status === "PROTECTED / KEEP";
              const isCanceled = status === "CANCELLED";
              const isApproved = status === "APPROVED TO CANCEL";
              
              return (
                <div 
                  key={sub.id} 
                  onClick={() => setSelectedSub(sub)}
                  className={`p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-150 cursor-pointer ${
                    isCanceled ? "bg-red-950/5 opacity-50" : "hover:bg-white/[0.01]"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                      <h4 className="text-xs font-bold text-white transition-colors group-hover:text-purple-400">
                        {sub.name}
                      </h4>

                      {/* BADGE LIFE ACTIONS */}
                      {status === "DO NOT TOUCH" ? (
                        <span className="text-[8px] tracking-widest bg-rose-500/15 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-sm font-bold flex items-center gap-1 uppercase">
                          <AlertTriangle className="w-2.5 h-2.5 text-rose-400" /> DO NOT TOUCH
                        </span>
                      ) : isProtected ? (
                        <span className="text-[8px] tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-sm font-bold flex items-center gap-1 uppercase">
                          <Lock className="w-2.5 h-2.5" /> PROTECTED / KEEP
                        </span>
                      ) : isCanceled ? (
                        <span className="text-[8px] tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-sm font-bold uppercase">
                          CANCELLED
                        </span>
                      ) : isApproved ? (
                        <span className="text-[8px] tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-sm font-bold animate-pulse uppercase">
                          APPROVED TO CANCEL
                        </span>
                      ) : status === "REVIEW ONLY" ? (
                        <span className="text-[8px] tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-sm font-bold uppercase">
                          REVIEW ONLY
                        </span>
                      ) : (
                        <span className="text-[8px] tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-sm font-bold uppercase">
                          CANCEL CANDIDATE
                        </span>
                      )}

                      <span className="text-[9px] text-white/20 ml-auto md:ml-0 bg-white/5 px-1.5 rounded-sm">
                        {sub.id}
                      </span>
                    </div>

                    <p className="text-[11px] text-white/45 max-w-4xl line-clamp-1 mb-2">
                      {sub.purpose}
                    </p>

                    <div className="flex flex-wrap gap-x-5 text-[9px] text-white/30">
                      <span>Platform: <span className="text-white/60">{sub.provider}</span></span>
                      <span>Renewal Cycle: <span className="text-white/60">{sub.mayBillingDate}</span></span>
                      {sub.alternativeProvider && (
                        <span className="text-purple-400">Alternative: <span className="underline">{sub.alternativeProvider}</span></span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                    <div className="text-right">
                      <span className="text-[8px] text-white/30 block uppercase leading-none">May Billing</span>
                      <span className={`text-sm font-bold ${isCanceled ? "text-white/25 line-through" : "text-white"}`}>
                        ${sub.cost.toFixed(2)}<span className="text-[9px] text-white/40 font-light font-sans">/mo</span>
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/25" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center select-none">
            <Inbox className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-widest mb-1">No database index matched</h4>
            <p className="text-[10px] text-white/40 max-w-xs mx-auto font-mono">
              Adjust search query keywords or toggle status category filter parameters.
            </p>
          </div>
        )}
      </div>

      {/* RECONCILIATION SLIDE-OVER DETAIL DRAWER COMPONENTS */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs font-mono">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedSub(null)} />
          
          <div className="relative w-full max-w-xl bg-[#0D0D0D] border-l border-white/10 h-full p-6 flex flex-col justify-between overflow-y-auto animate-slide-in select-none">
            
            {/* DRAWER HEADER */}
            <div>
              <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[9px] bg-white/5 text-white/40 px-2 py-0.5 rounded-sm uppercase tracking-wider mb-2 inline-block">
                    Contract Audit Record Folder
                  </span>
                  <h3 className="text-sm font-bold text-white">{selectedSub.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedSub(null)}
                  className="p-1 px-2.5 border border-white/10 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 text-xs transition-colors rounded-sm cursor-pointer"
                >
                  ✕ CLOSE
                </button>
              </div>

              {/* SECURITY IMMUNITY BADGE */}
              {selectedSub.status === "DO NOT TOUCH" ? (
                <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/25 text-rose-400 rounded-sm">
                  <div className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider leading-none mb-1.5 font-mono text-rose-400">
                        CRITICAL SYSTEM / DO NOT TOUCH
                      </h4>
                      <p className="text-[10.5px] leading-relaxed text-white/70">
                        This subscription controls master cloud infrastructure, internet domains, or identity routing. Under direct executive order, modifying or terminating this subscription is strictly prohibited.
                      </p>
                    </div>
                  </div>
                </div>
              ) : selectedSub.status === "PROTECTED / KEEP" ? (
                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-sm">
                  <div className="flex gap-3">
                    <Lock className="w-5 h-5 text-blue-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider leading-none mb-1.5">
                        PROTECTED / KEEP RULE ACTIVE
                      </h4>
                      <p className="text-[10.5px] leading-relaxed text-white/70">
                        This AI or operational service is shielded by secure configuration rules. Automated and manual cancellations are completely frozen.
                      </p>
                    </div>
                  </div>
                </div>
              ) : selectedSub.status === "CANCELLED" ? (
                <div className="mb-6 p-4 bg-red-500/15 border border-red-500/25 text-red-400 rounded-sm">
                  <div className="flex gap-3">
                    <XOctagon className="w-5 h-5 text-red-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider leading-none mb-1.5">
                        CONTRACT CANCELLED
                      </h4>
                      <p className="text-[10.5px] leading-relaxed text-red-200/70">
                        Transaction flow stopped for recurring invoicing. Any billed amount for May is archived. Secured future savings of <span className="font-bold font-mono text-white">${selectedSub.cost.toFixed(2)}/mo</span>.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-sm">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider leading-none mb-1.5">
                        RETRENCHMENT CANDIDATE - REVIEW REQ
                      </h4>
                      <p className="text-[10.5px] leading-relaxed text-white/70">
                        Review performance usage, alternative configurations, and strategic risks before authorizing revocation codes.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* FILE REPORT INK */}
              <div className="space-y-4 text-xs">
                
                {/* APP NAME */}
                <div className="border-b border-white/5 pb-3">
                  <span className="text-[9px] text-white/30 block uppercase">Exact App Name</span>
                  <span className="text-white text-xs font-bold">{selectedSub.name}</span>
                </div>

                {/* PLATFORM */}
                <div className="border-b border-white/5 pb-3">
                  <span className="text-[9px] text-white/30 block uppercase">Platform / Merchant</span>
                  <span className="text-white/80">{selectedSub.provider}</span>
                </div>

                {/* AMOUNT */}
                <div className="border-b border-white/5 pb-3 flex flex-col md:flex-row justify-between md:items-center gap-3">
                  <div>
                    <span className="text-[9px] text-white/30 block uppercase">Invoicing Rate</span>
                    <span className="text-white text-sm font-bold font-mono">${selectedSub.cost.toFixed(2)} / {selectedSub.period}</span>
                  </div>
                  <div className="flex gap-4 md:gap-8 justify-between md:justify-end text-right">
                    <div>
                      <span className="text-[9px] text-white/30 block uppercase text-right">May Billing Date</span>
                      <span className="text-white/80 font-mono block text-right text-xs">{selectedSub.mayBillingDate}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-white/30 block uppercase text-right">Next Renewal Date</span>
                      <span className="text-white/80 font-mono block text-right text-xs">{selectedSub.renewalDate}</span>
                    </div>
                  </div>
                </div>

                {/* EVIDENCE SOURCE */}
                <div className="border-b border-white/5 pb-3">
                  <span className="text-[9px] text-[#3B82F6] block uppercase font-bold">Evidence Source</span>
                  <span className="text-white/80 bg-blue-500/5 border border-blue-500/10 px-2 py-1.5 mt-1 block leading-relaxed rounded-sm font-mono text-[11px]">
                    🔍 {selectedSub.evidenceSource}
                  </span>
                </div>

                {/* STRATEGIC RISK */}
                <div className="border-b border-white/5 pb-3">
                  <span className="text-[9px] text-red-400 block uppercase font-bold">Risk If Cancelled</span>
                  <p className="text-white/70 text-[11px] leading-relaxed mt-1">
                    {selectedSub.riskIfCancelled}
                  </p>
                </div>

                {/* ALTERNATIVE PLATFORM */}
                {selectedSub.alternativeProvider && (
                  <div className="border-b border-white/5 pb-3">
                    <span className="text-[9px] text-purple-400 block uppercase font-bold font-bold">MANDATED ALTERNATIVE IN-HOUSE NODE</span>
                    <span className="text-purple-400 bg-purple-500/5 border border-purple-500/10 px-2 py-1 mt-1 inline-block rounded-sm">
                      {selectedSub.alternativeProvider}
                    </span>
                  </div>
                )}

                {/* CANCELLATION LINK */}
                <div>
                  <span className="text-[9px] text-white/30 block uppercase">Company Termination Portal</span>
                  <a 
                    href={selectedSub.officialCancelLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-mono text-[11px] font-bold rounded-sm mt-1 mb-2 select-none"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                    Open Official Cancellation Portal
                  </a>
                </div>

              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="border-t border-white/10 pt-4 mt-6">
              {selectedSub.status === "DO NOT TOUCH" ? (
                <div className="text-center p-3 border border-rose-500/20 bg-rose-500/5 text-rose-400 text-[10px] uppercase font-bold tracking-widest rounded-sm">
                  ⛔ CANCELLATION PREVENTED: DO NOT TOUCH CORE INFRASTRUCTURE
                </div>
              ) : selectedSub.status === "PROTECTED / KEEP" ? (
                <div className="text-center p-3 border border-white/5 bg-[#0F0F0F] text-white/30 text-[10px] uppercase font-bold tracking-widest rounded-sm">
                  ⛔ CANCELLATION PREVENTED BY CORPORATE CRITICAL RULE
                </div>
              ) : selectedSub.status === "CANCELLED" ? (
                <div className="text-center p-3 border border-red-500/15 bg-red-500/5 text-red-500 text-[10px] uppercase font-bold tracking-widest rounded-sm">
                  ✓ SECURED: Contract Purged
                </div>
              ) : (
                <div className="space-y-4">
                  
                  {/* CONSENT CHECKBOX TOGGLE */}
                  <div 
                    onClick={() => toggleSanctionApprovalInModal(selectedSub.id)}
                    className={`flex items-start gap-3 p-3 border transition-colors cursor-pointer rounded-sm bg-[#111] ${
                      selectedSub.status === "APPROVED TO CANCEL" 
                        ? "border-emerald-500/30 bg-emerald-500/[0.02]" 
                        : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className={`mt-0.5 w-4 h-4 border rounded-xs flex items-center justify-center transition-all ${
                      selectedSub.status === "APPROVED TO CANCEL" 
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                        : "bg-[#0A0A0A] border-white/20 text-transparent"
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-white uppercase tracking-wider leading-none mb-1">
                        Sovereign Executive Sanction - Approval Request
                      </h5>
                      <p className="text-[10px] text-white/50 leading-tight">
                        I hereby authorize operational manager Daniel to initiate secure API cancellation workflows for this redundant contract on my behalf.
                      </p>
                    </div>
                  </div>

                  {/* EXECUTE BUTTON */}
                  <button
                    onClick={() => handleExecuteRevocation(selectedSub.id)}
                    disabled={selectedSub.status !== "APPROVED TO CANCEL" || cancelingId === selectedSub.id}
                    className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-all border rounded-sm cursor-pointer ${
                      selectedSub.status === "APPROVED TO CANCEL"
                        ? "bg-red-500/15 hover:bg-red-500/25 border border-red-500 text-red-500 font-bold hover:shadow-xs hover:shadow-red-500/10"
                        : "bg-white/[0.02] text-white/20 border-white/5 cursor-not-allowed"
                    }`}
                  >
                    {cancelingId === selectedSub.id ? (
                      <span className="flex items-center justify-center gap-2 animate-pulse">
                        DISPATCHING FINAL TERMINATION SIGNAL...
                      </span>
                    ) : (
                      "Confirm & Execute Cancellation Cycle"
                    )}
                  </button>

                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
