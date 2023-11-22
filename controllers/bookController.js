const cheerio = require('cheerio')
const axios = require('axios')

exports.getCurrentlyReading = async (req, res) => {
  const url = 'https://app.thestorygraph.com/currently-reading/allieeeee'

  try {
    const res = await axios(url)

    if (res?.data) {
      const $ = cheerio.load(res.data)

      const books = []

      $('div[class="mt-5 block md:hidden"] .book-pane-content').each(
        (i, el) => {
          const title = $('.book-title-author-and-series span a', el).text()
          const link =
            'https://app.thestorygraph.com' +
            $('.book-title-author-and-series span a', el).prop('href')
          const author = $('.book-title-author-and-series p a', el).text()
          const img = $('.book-cover img', el).prop('src')
          console.log(title)

          books.push({
            title: title,
            link: link,
            author: author,
            img: img,
          })
        }
      )
    }

    res.send(books)
  } catch (e) {
    res.send(e)
  }
}
