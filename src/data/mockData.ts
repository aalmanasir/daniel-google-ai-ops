import { Contact, SearchItem, AuditLog } from "../types";

export const initialMockContacts: Contact[] = [
  {
    id: "CX-8891",
    displayName: "Ahmad Al-Maktoum",
    phoneNumbers: ["050 442 1109"],
    normalizedPhones: ["+971504421109"],
    emails: ["ahmad@almaktoum.ae"],
    issueType: "SUSPICIOUS_FORMAT",
    recommendedAction: "REPAIR_FORMAT",
    status: "PENDING",
    notes: "Phone spacing correctable to +971 standard prefix",
  },
  {
    id: "CX-8892",
    displayName: "Fatima Zayed",
    phoneNumbers: ["+9710527782110"],
    normalizedPhones: ["+971527782110"],
    emails: ["fatima.zayed@adgm.com"],
    issueType: "SUSPICIOUS_FORMAT",
    recommendedAction: "REPAIR_FORMAT",
    status: "PENDING",
    notes: "Has invalid 0 embedded inside country prefix (+971052)",
  },
  {
    id: "CX-8893",
    displayName: "Ahamad Al-Maktoum",
    phoneNumbers: ["+971504421109"],
    normalizedPhones: ["+971504421109"],
    emails: ["ahmad.m@dubai.gov.ae"],
    duplicateGroup: "GRP-001",
    issueType: "DUPLICATE_PHONE",
    recommendedAction: "MERGE",
    status: "PENDING",
    notes: "Matches CX-8891 by exact normalized phone. Possible name misspelling.",
  },
  {
    id: "CX-9011",
    displayName: "Zayed Enterprise Office",
    phoneNumbers: ["0551002233"],
    normalizedPhones: ["+971551002233"],
    emails: ["contact@zayedenterprise.ae"],
    issueType: "SUSPICIOUS_FORMAT",
    recommendedAction: "REPAIR_FORMAT",
    status: "PENDING",
    notes: "Requires standard international mobile prefix",
  },
  {
    id: "CX-9012",
    displayName: "Zayed Enterprise Office",
    phoneNumbers: ["+971551002233"],
    normalizedPhones: ["+971551002233"],
    emails: ["info@zayedenterprise.ae"],
    duplicateGroup: "GRP-002",
    issueType: "DUPLICATE_NAME",
    recommendedAction: "MERGE",
    status: "PENDING",
    notes: "Matches CX-9011 by company name and normalized phone.",
  },
  {
    id: "CX-9501",
    displayName: "Hassan Al-Jaber",
    phoneNumbers: ["+971 56 123 4567"],
    normalizedPhones: ["+971561234567"],
    emails: ["hassan.jaber@adnoc.ae", "hassan.jaber@gmail.com"],
    issueType: "NONE",
    recommendedAction: "NO_ACTION",
    status: "DONE",
    notes: "Validated normal. Non-duplicate entry.",
  },
  {
    id: "CX-9502",
    displayName: "Hassan Al-Jaber",
    phoneNumbers: ["+971561234567"],
    normalizedPhones: ["+971561234567"],
    emails: ["hassan.j@adnoc.ae"],
    duplicateGroup: "GRP-003",
    issueType: "DUPLICATE_NAME",
    recommendedAction: "MERGE",
    status: "PENDING",
    notes: "Duplicate name and matching phone with duplicate group GRP-003",
  },
  {
    id: "CX-9080",
    displayName: "Dubai Arbitration Support",
    phoneNumbers: ["+97143400010"],
    normalizedPhones: ["+97143400010"],
    emails: ["arbitration@dubailaw.ae"],
    issueType: "NONE",
    recommendedAction: "NO_ACTION",
    status: "DONE",
    notes: "Fixed landline format. Validated.",
  }
];

export const initialMockDriveItems: SearchItem[] = [
  {
    id: "DRV-101",
    source: "drive",
    title: "Gulf Institutional Arbitration Draft.docx",
    subtitle: "DIFC / ADGM Legal Frameworks",
    date: "2026-05-20",
    snippet: "This document outlines the special arbitration clauses suitable for Gulf-based real estate covenants and regulatory models.",
    url: "https://drive.google.com/open?id=DRV-101",
    size: "1.2 MB"
  },
  {
    id: "DRV-102",
    source: "drive",
    title: "Google Cloud Platform Architecture - Zayed OS.pdf",
    subtitle: "Cloud Architecture Blueprint",
    date: "2026-05-24",
    snippet: "Complete network mapping including Cloud Run microservices, Cloud SQL, Secret Manager configurations and IAM restrictions.",
    url: "https://drive.google.com/open?id=DRV-102",
    size: "4.8 MB"
  },
  {
    id: "DRV-103",
    source: "drive",
    title: "Storage Consolidation Master Plan v3.xlsx",
    subtitle: "Operations / Storage Audits",
    date: "2026-05-25",
    snippet: "Contains metrics detailing 30 TB storage allocation strategy across Photos raw backups, enterprise video and document archives.",
    url: "https://drive.google.com/open?id=DRV-103",
    size: "14.5 MB"
  },
  {
    id: "DRV-104",
    source: "drive",
    title: "Veo Creative Storyboards - Brand Launch.mp4",
    subtitle: "Creative Assets",
    date: "2026-05-18",
    snippet: "High-tier generative video prompts and cinematic shots matching the modern Gulf corporate aesthetic.",
    url: "https://drive.google.com/open?id=DRV-104",
    size: "1.4 GB"
  }
];

export const initialMockGmailItems: SearchItem[] = [
  {
    id: "GML-101",
    source: "gmail",
    title: "Google AI Plan: Premium Membership Activated",
    subtitle: "Google One Subscription Team",
    date: "2026-05-26",
    snippet: "Abdulla, your premium 30 TB workspace package is now fully set up. Access Google Flow, Veo, advanced Gemini models and live Cloud Run pipelines.",
    url: "https://mail.google.com/mail/u/0/#inbox/1"
  },
  {
    id: "GML-102",
    source: "gmail",
    title: "Action Required: UAE Contact Audit Log prepared",
    subtitle: "Daniel Office Manager",
    date: "2026-05-26",
    snippet: "Abdulla, I detected 3 duplicate contact profiles with conflicting UAE mobile formats (+9710...). Dry-run audit report is ready for manual review.",
    url: "https://mail.google.com/mail/u/0/#inbox/2"
  },
  {
    id: "GML-103",
    source: "gmail",
    title: "Secure Node Verification - Secret Key Rotated",
    subtitle: "GCP Compliance System",
    date: "2026-05-25",
    snippet: "All production service accounts have refreshed their private JSON descriptors. OAuth authorization tokens successfully locked to user standard sessions.",
    url: "https://mail.google.com/mail/u/0/#inbox/3"
  }
];

export const initialMockPhotosItems: SearchItem[] = [
  {
    id: "PHO-101",
    source: "photos",
    title: "Zayed_Corporate_Whiteboard_Draft.jpg",
    subtitle: "Whiteboard Diagrams",
    date: "2026-05-22",
    snippet: "Flowcharts detailing Antigravity state machines, local database structures, and Telegram telemetry pipelines.",
    url: "https://photos.google.com/photo/1"
  },
  {
    id: "PHO-102",
    source: "photos",
    title: "DIFC_Arbitration_Center_Meeting_Mockup.png",
    subtitle: "Concept Visualizations",
    date: "2026-05-24",
    snippet: "Rendered layout generated via Google Flow / Nano Banana depicting professional legal workspaces.",
    url: "https://photos.google.com/photo/2"
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: "LOG-001",
    timestamp: "2026-05-26T06:10:00Z",
    actionType: "SECURITY_INTEGRITY",
    description: "OAuth Credentials secured. Checked Workspace API scope compliance list.",
    status: "DONE",
    operator: "Daniel"
  },
  {
    id: "LOG-002",
    timestamp: "2026-05-26T06:30:00Z",
    actionType: "AUDIT_CONTACTS",
    description: "Evaluated 8 active Google Contacts. Identified 3 suspicious UAE number formats.",
    status: "PREPARED",
    operator: "Daniel"
  },
  {
    id: "LOG-003",
    timestamp: "2026-05-26T06:44:00Z",
    actionType: "GCP_STORAGE_REPORT",
    description: "Drive storage inventory refreshed. Total size allocated: 14.2 TB out of 30 TB.",
    status: "DONE",
    operator: "Daniel"
  }
];
