export function studyDate(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

export function nextStreak(previousDate: string | undefined, current: number, today = studyDate()): number {
  if (previousDate === today) return current;
  const yesterday = new Date(`${today}T00:00:00Z`);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  return previousDate === yesterday.toISOString().slice(0, 10) ? current + 1 : 1;
}
