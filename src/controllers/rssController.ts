import prisma from '../../prisma/prisma'

import type { Request, Response, NextFunction } from 'express'

import RSS from 'rss'
import { marked } from 'marked'

const { posts } = prisma

export const generateRss = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPosts = await posts.findMany({
      orderBy: { createdAt: 'desc' },
    })

    const feed = new RSS({
      title: "Allie's Digital Garden",
      description: 'Collection of my thoughts, hobbies, and code stuff.',
      feed_url: 'https://garden.alliecaton.com/rss',
      site_url: 'https://garden.alliecaton.com',
    })

    allPosts.forEach(async (post) => {
      const parsedContent = await marked(post.content)

      feed.item({
        title: post.title,
        guid: String(post.id),
        description: parsedContent,
        url: `https://garden.alliecaton.com/posts/${post.slug}`,
        date: post.createdAt,
      })
    })

    const rssXml = feed.xml({ indent: true })

    res.type('application/xml')
    res.send(rssXml)
  } catch (e) {
    console.error(e)
    next(e)
  }
}
