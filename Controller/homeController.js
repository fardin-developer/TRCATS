const Home = require('../Model/homePageSchema')

exports.homeRoute = async (req, res) => {
  try {
    const homedata = await Home.find()
    res.json({
      success: true,
      data: homedata
    })
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        data: 'something went wrong',
        error: 'something went wrong'
      })
  }
}

exports.homePost = (req, res) => {
  const { banner_url, title, items } = req.body

  const homePostCreate = new Home({
    banner_url: banner_url,
    title: title,
    items: items
  })

  homePostCreate
    .save()
    .then(savedHomePage => {
      console.log('Saved home page:', savedHomePage)
      return res.json({
        success: true,
        data: savedHomePage
      })
    })
    .catch(error => {
      console.error('Error saving home page:', error)
      return res.status(500).json({ error: 'Internal server error' })
    })
}
