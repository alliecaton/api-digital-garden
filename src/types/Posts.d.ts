import type { Tag } from './Tags'

export type Post = {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  slug?: string
  tags?: Tag[]
}
