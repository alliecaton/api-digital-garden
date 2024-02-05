import type { Tag } from './Tags.d.ts'

export type Bookmark = {
  id: number
  title: string
  url: string
  description?: string
  quote?: string
  createdAt: string
  updatedAt: string
  tags?: Tag[]
}
