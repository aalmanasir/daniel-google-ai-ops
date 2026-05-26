export function normalizeUAEPhone(phone: string): string {
  // Remove all spaces, dashes, parentheses and non-numeric chars except +
  let cleaned = phone.replace(/[^\d+]/g, "").trim();

  // If empty or doesn't resemble a UAE format, return as is
  if (!cleaned) return phone;

  // Let's match UAE prefix variations
  // Cases detailed in instructions:
  // 1. +971050xxxxxxx -> +97150xxxxxxx
  const plus9710Match = cleaned.match(/^\+9710(5[024568]\d{7})$/);
  if (plus9710Match) {
    return `+971${plus9710Match[1]}`;
  }

  // 2. +050xxxxxxx -> +97150xxxxxxx
  const plus0Match = cleaned.match(/^\+0(5[024568]\d{7})$/);
  if (plus0Match) {
    return `+971${plus0Match[1]}`;
  }

  // 3. 050xxxxxxx -> +97150xxxxxxx
  const plain0Match = cleaned.match(/^0(5[024568]\d{7})$/);
  if (plain0Match) {
    return `+971${plain0Match[1]}`;
  }

  // 4. Already correct format: +97150xxxxxxx
  const correctMatch = cleaned.match(/^\+971(5[024568]\d{7})$/);
  if (correctMatch) {
    return `+971${correctMatch[1]}`;
  }

  // Fallback check: if it starts with 50, 52 etc (length 9)
  const plain5Match = cleaned.match(/^(5[024568]\d{7})$/);
  if (plain5Match) {
    return `+971${plain5Match[1]}`;
  }

  return cleaned;
}

export function isUAEMobile(phone: string): boolean {
  const cleaned = phone.replace(/[^\d+]/g, "");
  return (
    /^(05[024568]\d{7})$/.test(cleaned) ||
    /^\+0(5[024568]\d{7})$/.test(cleaned) ||
    /^\+9710(5[024568]\d{7})$/.test(cleaned) ||
    /^\+971(5[024568]\d{7})$/.test(cleaned) ||
    /^(5[024568]\d{7})$/.test(cleaned)
  );
}
