const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Schema = mongoose.Schema;
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
const dbURI = 'mongodb+srv://PC:1EVwjeQt8CFDuvsh@attendance.aotlhct.mongodb.net/?retryWrites=true&w=majority&appName=Attendance';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected via Atlas'))
  .catch(err => console.log(err));

// Schema definition
const AttendanceSchema = new Schema({
    studentName: { type: String, required: true },
    inClassNumber: { type: Number, required: true },
    attendances: [
        {
            date: { type: String, required: true }, // Format "DD/MM"
            status: { type: String, required: true, enum: ['attended', 'absent', 'excused'] }
        }
    ]
});

// Model based on the schema
const Attendance = mongoose.model('Attendance', AttendanceSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Attendance System');
});

app.get('/attendances', async (req, res) => {
    try {
        const records = await Attendance.find();
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

app.post('/attendances', async (req, res) => {
    try {
        const newRecord = new Attendance(req.body);
        const savedRecord = await newRecord.save();
        res.json(savedRecord);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

app.post('/updateAttendance', async (req, res) => {
    const { inClassNo, date, status } = req.body;
    
    try {
        const record = await Attendance.findOne({ inClassNumber: inClassNo });
        if (record) {
            const attendance = record.attendances.find(a => a.date === date);
            if (attendance) {
                attendance.status = status;  // Update the status
            } else {
                // If no attendance for that date exists, add it
                record.attendances.push({ date, status });
            }
            await record.save();  // Save the updated record
            res.json({ success: true, message: 'Attendance updated successfully', data: record });
        } else {
            res.status(404).json({ success: false, message: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
