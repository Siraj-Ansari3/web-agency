import express from 'express';
import Project from '../Schema/Project.js';
import { customAlphabet } from 'nanoid';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a custom nanoid with 6 characters (lowercase letters and digits)
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);

const slugify = (text) =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-')

router.post('/add', authMiddleware, async (req, res) => {
    try {
        const {
            title,
            category,
            description,
            shortDescription,
            techStack,
            features,
            userRoles,
            liveLink,
            timeline,
            challenge,
            client,
            thumbnail,
            longSS,
            screenshots
        } = req.body;

        const requiredFields = ['title', 'description', 'category'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: 'Missing required fields',
                missingFields
            });
        }

        // Generate project_id
        const slugifiedTitle = slugify(title);

        const uniqueId = nanoid();
        const project_id = `${slugifiedTitle}-${uniqueId}`;

        const newProject = new Project({
            project_id,
            title,
            category,
            description,
            shortDescription: shortDescription || description.substring(0, 200) + '...',
            techStack,
            features,
            userRoles,
            liveLink,
            timeline,
            challenge,
            client: client || 'Confidential',
            thumbnail,
            longSS,
            screenshots
        });

        // Save to database
        const savedProject = await newProject.save();

        res.status(201).json({
            message: 'Portfolio project created successfully',
            project: savedProject
        });
    } catch (error) {
        console.error('Error creating portfolio project:', error);

        // Handle duplicate key error
        if (error.code === 11000 && error.keyPattern?.project_id) {
            return res.status(400).json({
                error: 'Project ID already exists. Please try changing title.'
            });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        if (!projects) {
            return res.status(404).json({ error: "No Projects Found" });
        }
        return res.status(200).json({ projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/recent', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).limit(3);
    
    if (!projects || projects.length === 0) {
      return res.status(404).json({ error: "No Projects Found" });
    }

    return res.status(200).json({ projects });
  } catch (error) {
    console.error('Error fetching recent projects:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/get-project/:id', async (req, res) => {
  try {
    const project = await Project.findOne({project_id: req.params.id});
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    return res.status(200).json({ project });
  } catch (error) {
    console.error('Error fetching project:', error);
    
    // Handle invalid ID format
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid project ID format' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/get-all", async(req, res) => {
    try {
        const projects = await Project.find({}).sort({ createdAt: -1});

        if(!projects){
            return res.status(404).json({error: "Project Not Found"});
        }

        return res.status(200).json({projects});
    } catch (error) {
        return res.status(500).json({error: "Internal Server Error!"});
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/update/:project_id', authMiddleware, async (req, res) => {
  try {
    const { project_id } = req.params;
    const updateData = req.body;

    // Find project by custom project_id
    const project = await Project.findOneAndUpdate(
      { project_id },
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        error: `Duplicate field value: ${field}`,
        message: `${field} must be unique`
      });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});
export default router;