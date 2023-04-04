const { JoinTable, snippet } = require('../models');

const addChildSnippet = async (req, res) => {
  try {
      // Create a new entry in the joinTable with the parent and child snippet ids
    const {parentSnippetId, childSnippetId} = req.body
    const snippet = await JoinTable.create({ parentSnippetId, childSnippetId });
    res.send(snippet)
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

// const updateRelation = async (req, res) => {
//   try {

//   }
// }

module.exports = { 
    addChildSnippet 
};