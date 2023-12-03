const models = require('../models')

const Tag = models.Tag

exports.findOrCreateTag = async (tag) => {
  try {
    const data = await Tag.findOrCreate({
      where: {
        name: tag.name,
      },
      defaults: {
        emoji: tag.emoji,
      },
    })

    console.log('found or created', data)

    if (data) {
      return data
    }
  } catch (e) {
    console.error(e)
  }
}

// exports.findOrCreateTag = async (req, res) => {
//   const { name, emoji } = req.body
//   try {
//     const data = await Tag.findOrCreate({
//       where: {
//         name: name,
//       },
//       defaults: {
//         emoji: emoji,
//       },
//     })

//     console.log(data)

//     res.json(data)

//     // return data
//   } catch (e) {
//     console.error(e)
//   }
// }
