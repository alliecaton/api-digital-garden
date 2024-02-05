import { load } from 'cheerio'
import axios from 'axios'

import type { Response, Request, NextFunction } from 'express'

type Book = {
  title: string
  link: string
  author: string
  img?: string
}

export const getCurrentlyReading = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url = 'https://app.thestorygraph.com/currently-reading/allieeeee'

  try {
    const html = await axios(url)

    if (html?.data) {
      const $ = load(html.data)

      const books: Book[] = []

      $('div[class="mt-5 block md:hidden"] .book-pane-content').each(
        (i, el) => {
          const title = $('.book-title-author-and-series span a', el).text()
          const link =
            'https://app.thestorygraph.com' +
            $('.book-title-author-and-series span a', el).prop('href')
          const author = $('.book-title-author-and-series p a', el).text()
          const img = $('.book-cover img', el).prop('src')

          books.push({
            title: title,
            link: link,
            author: author,
            img: img,
          })
        }
      )

      const data = {
        books: books,
      }

      if (data.books) {
        res.json(data)
      }
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}
