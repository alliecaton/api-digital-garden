import prisma from '../../prisma/prisma.js'

import RSS from 'rss'
import { marked } from 'marked'

const { Posts } = prisma

export const generateRss = async (req, res, next) => {
  try {
    const posts = await Posts.findMany({
      orderBy: { createdAt: 'desc' },
    })

    const feed = new RSS({
      title: "Allie's Digital Garden",
      description: 'Collection of my thoughts, hobbies, and code stuff.',
      feed_url: 'https://garden.alliecaton.com/rss',
      site_url: 'https://garden.alliecaton.com',
      cdata: false,
    })

    posts.forEach((post) => {
      const parsedContent = marked(post.content)

      feed.item({
        title: post.title,
        guid: post.id,
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
