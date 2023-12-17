import cheerio from 'cheerio'
import axios from 'axios'

export const getCurrentlyReading = async (req, res, next) => {
  const url = 'https://app.thestorygraph.com/currently-reading/allieeeee'

  try {
    const html = await axios(url)

    if (html?.data) {
      const $ = cheerio.load(html.data)

      const books = []

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

      res.json(data)
    }
  } catch (e) {
    next(e)
  }
}
