const express = require('express');
const router = express.Router();

const SnippetController = require('../controllers/SnippetController');


router.post('/', SnippetController.createSnippet);
router.get('/story/:storyId', SnippetController.getAllSnippetsByStory);
router.get('/snippet/:snippetId', SnippetController.getAllSnippetsBySnippetId);
router.get('/:id', SnippetController.getSnippet);
router.put('/:id', SnippetController.updateSnippet);
router.delete('/:id', SnippetController.deleteSnippet);

module.exports = router;