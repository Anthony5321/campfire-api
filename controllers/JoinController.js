const { JoinTable, snippet } = require('../models');

const addChildSnippet = async (req, res) => {
  try {
      // Create a new entry in the joinTable with the parent and child snippet ids
    const {parentSnippetId, childSnippetId} = req.body
    console.log(parentSnippetId);
    console.log(childSnippetId);
    const snippet = await JoinTable.create({ parentSnippetId, childSnippetId });
    res.send(snippet)
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

module.exports = { 
    addChildSnippet 
};