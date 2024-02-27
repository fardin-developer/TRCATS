const Home = require('../Model/homePageSchema')
exports.homeRoute = (req, res) => {
  console.log('ohk');
  res.json(
    {
      success: true,
      "banner_url": "https://picsum.photos/200",
      "title": "Home Page",
      "items": [
        {
          "title": "Item 1",
          "icon_url": "https://picsum.photos/200",
          "desc": "Description for Item 1"
        },
        {
          "title": "Item 2",
          "icon_url": "https://picsum.photos/200",
          "desc": "Description for Item 2"
        },
        {
          "title": "Item 3",
          "icon_url": "https://picsum.photos/200",
          "desc": "Description for Item 3"
        }
      ]
    }

  )
}

exports.homePost = (req, res) => {
  const { banner_url, title, items } = req.body;

  const homePostCreate = new Home({
    banner_url: banner_url,
    title: title,
    items: items
  });

  homePostCreate.save()
    .then(savedHomePage => {
      console.log('Saved home page:', savedHomePage);
      return res.json({
        success: true,
        data: savedHomePage
      });
    })
    .catch(error => {
      console.error('Error saving home page:', error);
      return res.status(500).json({ error: 'Internal server error' });
    });
}