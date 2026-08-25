import { StoredApplication } from '../types/insurance'

/**
 * In-memory store for applications.
 * Structured as a repository pattern so it can be swapped for a SQL
 * implementation later without changing the service layer.
 */
const applications: Map<string, StoredApplication> = new Map()

export const applicationStore = {
  save(application: StoredApplication): void {
    applications.set(application.id, application)
  },

  update(id: string, changes: Partial<StoredApplication>): StoredApplication | undefined {
    const existing = applications.get(id)
    if (!existing) return undefined
    const updated = { ...existing, ...changes }
    applications.set(id, updated)
    return updated
  },

  findById(id: string): StoredApplication | undefined {
    return applications.get(id)
  },

  findAll(): StoredApplication[] {
    return Array.from(applications.values())
  },

  findByDecision(decision: StoredApplication['decision']): StoredApplication[] {
    return Array.from(applications.values()).filter((a) => a.decision === decision)
  },

  count(): number {
    return applications.size
  }
}
