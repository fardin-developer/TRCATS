const express = require('express');
const router = express.Router();

const aboutData = {
    companyName: "TRCATS",
    tagline: "Solution for green energy",
    founders: [
        {
            name: "Founder 1",
            position: "CEO"
        },
        {
            name: "Founder 2",
            position: "CTO"
        },
        {
            name: "Founder 3",
            position: "COO"
        }
    ],
    description: "TRCATS is a cutting-edge technology company focused on delivering innovative solutions to address the challenges of today and tomorrow. With a team of passionate individuals and a commitment to excellence, we strive to make a positive impact on the world.",
    yearFounded: 2020,
    location: {
        city: "Tezpur",
        country: "India"
    },
    website: "https://www.trcats.com",
    socialMedia: {
        twitter: "https://twitter.com/trcats",
        linkedin: "https://www.linkedin.com/company/trcats",
        facebook: "https://www.facebook.com/trcats"
    },
    contact: {
        email: "info@trcats.com",
        phone: "+1234567890"
    }
};

router.get('/about', (req, res) => {
    try {
      // Respond with JSON data
      res.json({
        success: true,
        data: aboutData
      });
    } catch (error) {
      console.error("Error in fetching about data:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching about data"
      });
    }
});

module.exports = router;
