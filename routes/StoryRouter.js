// Import dependencies
const router = require('express').Router();
const middleware = require('../middleware');
const storyController = require('../controllers/StoryController');

// Define story routes
router.get('/get', storyController.getStories);
router.post('/get', middleware.verifyToken,  middleware.stripToken, storyController.createStory);
router.get('/get/:id', storyController.getStoryById);
router.put('/get/:id', middleware.verifyToken,  middleware.stripToken, storyController.updateStory);
router.delete('/get/:id', middleware.verifyToken,  middleware.stripToken, storyController.deleteStory);

// Export router
module.exports = router;