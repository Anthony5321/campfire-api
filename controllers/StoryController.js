const { User, Story, Vote } = require('../models');

async function getStories(req, res) {
  try {
    const stories = await Story.findAll({
      include: [{ model: User, as: 'users' }]
    });
    res.status(200).json({ stories });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

const getStoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const story = await Story.findByPk(id, {
      include: ['author', 'votes']
    });
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (err) {
    next(err);
  }
};


const createStory = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;
    const story = await Story.create({
      title,
      content,
      authorId
    });
    res.json(story);
  } catch (err) {
    next(err);
  }
};


const updateStory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const authorId = req.user.id;
    const [numUpdated, updatedStory] = await Story.update(
      { title, content },
      {
        where: { id, authorId },
        returning: true
      }
    );
    if (numUpdated === 0) {
      return res.status(404).json({ error: 'Story not found or not owned by user' });
    }
    res.json(updatedStory[0]);
  } catch (err) {
    next(err);
  }
};


const deleteStory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const authorId = req.user.id;
    const numDeleted = await Story.destroy({
      where: { id, authorId }
    });
    if (numDeleted === 0) {
      return res.status(404).json({ error: 'Story not found or not owned by user' });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory
}