export function getCompletedDays(slug: string): number[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(`journey:${slug}:completedDays`)
    if (!raw) return []
    const arr = JSON.parse(raw)
    if (Array.isArray(arr)) return arr.filter((n) => Number.isFinite(n))
    return []
  } catch {
    return []
  }
}

export function setCompletedDays(slug: string, days: number[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(`journey:${slug}:completedDays`, JSON.stringify([...new Set(days)].sort((a, b) => a - b)))
  } catch {
    // noop
  }
}


