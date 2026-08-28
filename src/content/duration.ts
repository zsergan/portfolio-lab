// Inclusive month counting (both the start and end month count as full
// months) is what makes "May 2022 — Nov 2024" read as 31 months rather
// than 30 — matches how a person would naturally count "how long was I
// there," not a strict calendar-days subtraction.
export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr`;
  return `${years} yr ${remainingMonths} mo`;
}
