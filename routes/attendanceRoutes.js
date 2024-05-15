const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/', attendanceController.getAttendances);
router.post('/', attendanceController.addAttendance);
router.post('/update', attendanceController.updateAttendance);

module.exports = router;
