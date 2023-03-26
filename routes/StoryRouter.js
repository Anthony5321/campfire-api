// Import dependencies
const router = require('express').Router();
const middleware = require('../middleware');
const storyController = require('../controllers/StoryController');

// Define story routes
router.get('/', storyController.getStories);
router.post('/', middleware.stripToken, middleware.verifyToken, storyController.createStory);
router.get('/:id', storyController.getStoryById);
router.put('/:id',  middleware.stripToken, middleware.verifyToken, storyController.updateStory);
router.delete('/:id', middleware.stripToken, middleware.verifyToken, storyController.deleteStory);

// Export router
module.exports = router;