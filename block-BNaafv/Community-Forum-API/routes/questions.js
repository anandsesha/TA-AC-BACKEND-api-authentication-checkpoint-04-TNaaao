var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const Question = require('../models/Question');
const User = require('../models/User');

// POST on /api/questions - Create a question on the Community Forum (authentication required)
router.post('/', auth.verifyToken, async (req, res, next) => {
  try {
    var { title, author, slug, description, tags } = req.body;
    // console.log(title, author, slug, description, tags);

    if (!title || !author || !slug) {
      res.status(400).json({
        error: 'title, author and slug mandatory for creating a question',
      });
    }
    // Find the user by username to get the corresponding ObjectId - since author field needs the id to associate with the User as per schema
    //   So, author name coming in req - using that name we get all fields of that User (including his _id) - pasing that below we create the question (which needs author: <userid>)
    var user = await User.findOne({ username: author });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    var createdQuestion = await Question.create({
      title,
      author: user._id,
      slug,
      description,
      tags,
    });

    // console.log(createdQuestion);
    res.status(201).json({ questions: [createdQuestion] });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
