const { Snippet, Story } = require('../models');

const createSnippet = async (req, res, next) => {
    try {
        const { storyId, image, content, snippetId } = req.body;
        const snippet = await Snippet.create({ storyId, image, content, snippetId });
        res.status(201).json(snippet);
    } catch (error) {
        next(error);
    }
}

const getSnippet = async (req, res, next) => {
    try {
        const snippet = await Snippet.findByPk(req.params.id);
        if (!snippet) {
            return res.status(404).json({ message: 'Snippet not found' });
        }
        res.json(snippet);
    } catch (error) {
        next(error);
    }
}

const updateSnippet = async (req, res, next) => {
    try {
        const snippet = await Snippet.findByPk(req.params.id);
        if (!snippet) {
            return res.status(404).json({ message: 'Snippet not found' });
        }
        const { storyId, image, content } = req.body;
        await snippet.update({ storyId, image, content });
        res.json(snippet);
    } catch (error) {
        next(error);
    }
}

const getAllSnippetsByStory = async (req, res, next) => {
    try {
        const snippets = await Snippet.findAll({
            where: { storyId: req.params.storyId }
        });
        res.json(snippets);
    } catch (error) {
        next(error);
    }
}

const getAllSnippetsBySnippetId = async (req, res, next) => {
    try {
        const snippets = await Snippet.findAll({
            where: { snippetId: req.params.snippetId }
        });
        res.json(snippets);
    } catch (error) {
        next(error);
    }
}

const deleteSnippet = async (req, res, next) => {
    try {
        const snippet = await Snippet.findByPk(req.params.id);
        if (!snippet) {
            return res.status(404).json({ message: 'Snippet not found' });
        }
        await snippet.destroy();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createSnippet,
    getSnippet,
    updateSnippet,
    deleteSnippet,
    getAllSnippetsByStory,
    getAllSnippetsBySnippetId
}