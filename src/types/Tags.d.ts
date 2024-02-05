import type { Post } from './Posts.d.ts'
import type { Bookmark } from './Bookmarks.d.ts'

export type Tag = {
  id: number
  emoji?: string
  name: string
  createdAt: string
  updatedAt: string
  bookmarks?: object[]
  posts?: Post[]
  bookmarks?: Bookmark[]
}
