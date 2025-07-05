import express from "express";
import dotenv from "dotenv";
import authMiddleware from "../middleware/authMiddleware.js";
import homePage from "../Schema/HomePage.js";
import AboutPage from "../Schema/AboutPage.js";
dotenv.config();

const router = express.Router();

router.post("/homepage", authMiddleware, async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const {
      hero,
      about,
      features,
      services,
      steps,
      portfolio,
      blog,
      testimonials,
      cta
    } = req.body;

    // Validate required hero fields
    if (!hero?.title || !hero?.subtitle || !hero?.ctaText || !hero?.ctaLink) {
      return res.status(400).json({
        error: "Missing required hero fields",
        required: ["hero.title", "hero.subtitle", "hero.ctaText", "hero.ctaLink"]
      });
    }

    // Validate required CTA fields
    if (!cta?.title || !cta?.subtitle || !cta?.ctaText || !cta?.ctaLink) {
      return res.status(400).json({
        error: "Missing required CTA fields",
        required: ["cta.title", "cta.subtitle", "cta.ctaText", "cta.ctaLink"]
      });
    }

    if (!features) {
      return res.status(400).json({
        error: "Missing required features fields",
        required: ["features"]
      });
    }

    // Check if homepage exists
    let homepage = await homePage.findOne();

    if (homepage) {
      // Update all sections
      homepage.hero = hero;
      homepage.about = about;
      homepage.features = features || [];
      homepage.services = services;
      homepage.steps = steps;
      homepage.portfolio = portfolio;
      homepage.blog = blog;
      homepage.testimonials = testimonials || [];
      homepage.cta = cta;

      await homepage.save();

      return res.status(200).json({
        message: "Homepage updated successfully",
        data: homepage
      });
    } else {
      // Create new homepage with all sections
      const newHomepage = new homePage({
        hero,
        about,
        features: features || [],
        services,
        steps,
        portfolio,
        blog,
        testimonials: testimonials || [],
        cta
      });

      const savedHomepage = await newHomepage.save();

      return res.status(201).json({
        message: "Homepage created successfully",
        data: savedHomepage
      });
    }

  } catch (error) {
    console.log("Homepage save error:", error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: "Validation failed",
        details: validationErrors
      });
    }

    // Handle other errors
    return res.status(500).json({
      error: "Internal server error",
      message: error.message || "Failed to save homepage data"
    });
  }
});

// Optional: Add a GET route to retrieve homepage data
router.get("/homepage", async (req, res) => {
  try {
    const homepage = await homePage.findOne();

    if (!homepage) {
      return res.status(404).json({
        message: "Homepage not found"
      });
    }

    return res.status(200).json({
      message: "Homepage retrieved successfully",
      data: homepage
    });

  } catch (error) {
    console.error("Homepage fetch error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: "Failed to fetch homepage data"
    });
  }
});


// UPDATE About Page Data
router.post('/about', authMiddleware, async (req, res) => {
  try {
    const {
      header,
      storyMission,
      coreValues,
      teamMembers,
      whyChooseUs,
      cta
    } = req.body;

    const updatedPage = await AboutPage.findOneAndUpdate(
      { page: 'about' },
      {
        $set: {
          header,
          storyMission,
          coreValues,
          teamMembers,
          whyChooseUs,
          cta
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: "About page updated successfully",
      page: updatedPage
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET About Page Data
router.get('/about', async (req, res) => {
  try {
    const aboutPage = await AboutPage.findOne({ page: 'about' });

    if (!aboutPage) {
      return res.status(404).json({ message: "About page not found" });
    }

    res.status(200).json(aboutPage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.get('/steps', async (req, res) => {
  try {
    // Find the homepage document (assuming only one exists)
    const homepage = await homePage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage data not found"
      });
    }

    // Extract only the steps section
    const stepsData = homepage.steps;

    res.status(200).json({
      success: true,
      data: stepsData
    });

  } catch (error) {
    console.error("Error fetching steps:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});


router.get('/services', async (req, res) => {
  try {
    const homepage = await homePage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage data not found"
      });
    }

    // Extract only the steps section
    const services = homepage.services;

    res.status(200).json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error("Error fetching steps:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
})




export default router;