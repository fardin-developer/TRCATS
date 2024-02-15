const Home = require('../Model/homePageSchema')
exports.homeRoute = (req,res)=>{
    console.log('ohk');
    res.json(
        {
            "banner_url": "https://example.com/logo.png",
            "title": "Home Page",
            "items": [
              {
                "title": "Item 1",
                "icon_url": "https://example.com/icons/item1.png",
                "desc": "Description for Item 1"
              },
              {
                "title": "Item 2",
                "icon_url": "https://example.com/icons/item2.png",
                "desc": "Description for Item 2"
              },
              {
                "title": "Item 3",
                "icon_url": "https://example.com/icons/item3.png",
                "desc": "Description for Item 3"
              }
            ]
          }
          
    )
}

exports.homePost = (req,res)=>{
    const { banner_url, title, items } = req.body;

    const homePostCreate = new Home({
        banner_url: banner_url,
        title: title,
        items:items
    });
    
    homePostCreate.save()
        .then(savedHomePage => {
            console.log('Saved home page:', savedHomePage);
            return res.json({
                success:true
            });
        })
        .catch(error => {
            console.error('Error saving home page:', error);
            return res.status(500).json({ error: 'Internal server error' });
        });
}