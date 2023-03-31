const { User, Story } = require('../models');
const middleware = require('../middleware')

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
    });
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (err) {
    throw err;
  }
};


const createStory = async (req, res) => {
  try {
    console.log(req.body); // log the request body
    const story = await Story.create({...req.body})
    res.send(story)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating story' });
  }
}

const updateStory = async (req, res) => {
  try {
    const story = await Story.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    )
    res.send(story)
  } catch (err) {
    throw err
  }
}



const deleteStory = async (req, res) => {
  try {
    await Story.destroy({ where: { id: req.params.id } })
    res.send({ msg: 'Story Removed', payload: req.params.id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  getStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory
}