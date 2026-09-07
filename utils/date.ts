/**
 * Lightweight date utilities — no external dependency required.
 * Uses Intl APIs which are available in Hermes (RN 0.71+) and modern JS engines.
 */

const LOCALE = 'en-NG'; // Nigerian English locale

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------

/** "Sunday, 7 September 2026" */
export function formatFullDate(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

/** "7 Sep 2026" */
export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

/** "10:00 AM" */
export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(iso));
}

/** "7 Sep 2026 · 10:00 AM" */
export function formatDateTime(iso: string): string {
  return `${formatShortDate(iso)} · ${formatTime(iso)}`;
}

// ---------------------------------------------------------------------------
// Relative time
// ---------------------------------------------------------------------------

/** "3 days ago" / "in 2 hours" */
export function formatRelative(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  const absSeconds = Math.abs(diff) / 1000;

  const rtf = new Intl.RelativeTimeFormat(LOCALE, { numeric: 'auto' });

  if (absSeconds < 60) return rtf.format(Math.round(diff / 1000), 'second');
  if (absSeconds < 3600) return rtf.format(Math.round(diff / 60000), 'minute');
  if (absSeconds < 86400) return rtf.format(Math.round(diff / 3600000), 'hour');
  if (absSeconds < 2592000) return rtf.format(Math.round(diff / 86400000), 'day');
  if (absSeconds < 31536000) return rtf.format(Math.round(diff / 2592000000), 'month');
  return rtf.format(Math.round(diff / 31536000000), 'year');
}

// ---------------------------------------------------------------------------
// Duration
// ---------------------------------------------------------------------------

/** Format seconds as "1h 23m" or "45m" */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

// ---------------------------------------------------------------------------
// Predicates
// ---------------------------------------------------------------------------

export function isPast(iso: string): boolean {
  return new Date(iso).getTime() < Date.now();
}

export function isFuture(iso: string): boolean {
  return new Date(iso).getTime() > Date.now();
}

export function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}
