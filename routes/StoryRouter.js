// Import dependencies
const router = require('express').Router();
const middleware = require('../middleware');
const storyController = require('../controllers/StoryController');

// Define story routes
router.get('/', storyController.getStories);
router.post('/', middleware.verifyToken,  middleware.stripToken, storyController.createStory);
router.get('/:id', storyController.getStoryById);
router.get('/search/:title', storyController.getStoriesByTitle);
router.put('/:id', middleware.verifyToken,  middleware.stripToken, storyController.updateStory);
router.delete('/:id', middleware.verifyToken,  middleware.stripToken, storyController.deleteStory);

// Export router
module.exports = router;