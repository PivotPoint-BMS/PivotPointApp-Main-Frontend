export function setItem(key: string, value: unknown): void {
  if (typeof window !== 'undefined') window.localStorage.setItem(key, JSON.stringify(value))
}

export function getItem(key: string): unknown {
  const value = JSON.parse(
    typeof window !== 'undefined' ? window.localStorage.getItem(key) || 'null' : 'null'
  )
  return value
}

export function setTemporaryItem(key: string, value: string, expirationMinutes: number): void {
  const expirationMs = expirationMinutes * 60 * 1000
  const record = { value, timestamp: new Date().getTime() + expirationMs }
  if (typeof window !== 'undefined') window.localStorage.setItem(key, JSON.stringify(record))
}

export function getTemporaryItem(key: string): unknown | null {
  const record = JSON.parse(
    typeof window !== 'undefined' ? window.localStorage.getItem(key) || 'null' : 'null'
  )
  if (!record) {
    return null
  }
  const now = new Date().getTime()
  if (now < record.timestamp) {
    return record.value
  }
  if (typeof window !== 'undefined') window.localStorage.removeItem(key)
  return null
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window !== 'undefined') window.localStorage.removeItem(key)
}
