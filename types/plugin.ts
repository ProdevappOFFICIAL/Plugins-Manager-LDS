// types/plugin.ts
export interface Plugin {
  id: string
  name: string
  description: string
  version: string
  author: string
  category: string
  rating: number
  downloads: number
  size: string
  lastUpdated: string
  screenshots: string[]
  features: string[]
  requirements: string[]
  price: number
  isPremium: boolean
  isInstalled: boolean
  isActive: boolean
  tags: string[]
  changelog: {
    version: string
    date: string
    changes: string[]
  }[]
}