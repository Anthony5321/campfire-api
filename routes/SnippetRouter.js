const express = require('express');
const router = express.Router();

const SnippetController = require('../controllers/SnippetController');
const JoinController = require('../controllers/JoinController');

// Define snippet routes
router.post('/', SnippetController.createSnippet);
router.get('/story/:storyId', SnippetController.getAllSnippetsByStory);
router.get('/snippet/:snippetId', SnippetController.getAllSnippetsBySnippetId);
router.get('/:id', SnippetController.getSnippet);
router.put('/:id', SnippetController.updateSnippet);
router.delete('/:id', SnippetController.deleteSnippet);

// Define joinTable routes
router.post('/children', JoinController.addChildSnippet);

module.exports = router;