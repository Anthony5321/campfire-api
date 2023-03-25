// Import dependencies
const router = require('express').Router();
const storyController = require('../controllers/StoryController');

// Define story routes
router.get('/', storyController.getStories);
router.post('/', storyController.createStory);
router.get('/:id', storyController.getStoryById);
router.put('/:id', storyController.updateStory);
router.delete('/:id', storyController.deleteStory);

// Export router
module.exports = router;