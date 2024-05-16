const express = require('express');
const router = express.Router();
const Lecturer = require('../models/lecturer');
const Student = require('../models/student');

router.post('/login', async (req, res) => {
  console.log('Login route hit');
  const { id, password } = req.body;

  try {
    // Check lecturers first
    let user = await Lecturer.findOne({ lecturer_id: id });
    if (user && user.password === password) {
      return res.json({ role: 'lecturer' });
    }

    // Check students next
    user = await Student.findOne({ student_id: id });
    if (user && user.password === password) {
      return res.json({ role: 'student' });
    }

    // If no user found
    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
  
});

module.exports = router;
