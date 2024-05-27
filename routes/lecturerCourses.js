const express = require('express');
const router = express.Router();
const Course = require('../models/course'); // Ensure this path is correct

router.get('/:lecturer_id', async (req, res) => {
  const { lecturer_id } = req.params;

  console.log(`Received request for lecturer_id: ${lecturer_id}`);

  try {
    const courses = await Course.find({ lecturer_id });
    console.log(`Courses found: ${JSON.stringify(courses)}`);
    res.json(courses);
  } catch (error) {
    console.error(`Error fetching courses: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
