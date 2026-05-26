export interface Contact {
  id: string;
  displayName: string;
  phoneNumbers: string[];
  normalizedPhones: string[];
  emails: string[];
  duplicateGroup?: string;
  issueType: "DUPLICATE_NAME" | "DUPLICATE_PHONE" | "DUPLICATE_EMAIL" | "SUSPICIOUS_FORMAT" | "NONE";
  recommendedAction: "MERGE" | "REPAIR_FORMAT" | "KEEP_DUAL" | "NO_ACTION";
  status: "PENDING" | "APPROVED" | "SKIPPED" | "DONE";
  notes: string;
}

export interface SearchItem {
  id: string;
  source: "drive" | "gmail" | "photos";
  title: string;
  subtitle: string;
  date: string;
  snippet: string;
  url?: string;
  size?: string;
  status?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actionType: string;
  description: string;
  status: "DONE" | "PREPARED" | "DRAFTED" | "PARTIALLY_DONE" | "NEEDS_APPROVAL";
  operator: "Daniel" | "Abdulla";
}

export type ActiveRole = "manager" | "architect" | "engineer" | "partner";

export interface SystemStatus {
  storageUsed: string;
  storageMax: string;
  securityLevel: "MAXIMUM" | "STANDARD" | "LOCKDOWN";
  dryRunMode: boolean;
}
