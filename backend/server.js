require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// ==================== 1. MONGODB DATABASE CONNECTION ====================
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nexus_attendance';
let isMongoConnected = false;

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 3000
})
.then(() => {
  isMongoConnected = true;
  console.log('✅ Connected to MongoDB database successfully: ' + MONGO_URI);
  seedInitialData();
})
.catch(err => {
  isMongoConnected = false;
  console.warn('⚠️ MongoDB connection notice: ' + err.message);
  console.log('ℹ️ Running with in-memory resilient fallback store until MongoDB is active.');
});

mongoose.connection.on('connected', () => { isMongoConnected = true; });
mongoose.connection.on('disconnected', () => { isMongoConnected = false; });

// ==================== 2. MONGOOSE SCHEMAS & MODELS ====================

// User Schema (Authentication & Multi-Role)
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Administrator', 'Teacher', 'Student'], default: 'Student' },
  department: { type: String, default: 'Computer Science' },
  createdAt: { type: Date, default: Date.now }
});

// Student Schema (Roster & Academic Metrics)
const studentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true },
  avatarColor: { type: String, default: 'bg-emerald-600' },
  attended: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Attendance Record Schema (Daily Session Auditing)
const attendanceSchema = new mongoose.Schema({
  recordId: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, default: '09:00 AM' },
  student: { type: String, required: true },
  studentId: { type: String },
  department: { type: String, default: 'Computer Science' },
  subject: { type: String, default: 'CS-301: Data Structures' },
  status: { type: String, enum: ['Present', 'Absent', 'Late', 'Excused'], default: 'Present' },
  lateNote: { type: String },
  corrected: { type: Boolean, default: false },
  correctionReason: { type: String },
  correctedBy: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Leave Request Schema (Student Applications & Faculty Approvals)
const leaveSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  department: { type: String, required: true },
  type: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  reviewedBy: { type: String },
  reviewedAt: { type: String },
  submittedAt: { type: String, default: () => new Date().toISOString().split('T')[0] }
});

const User = mongoose.model('User', userSchema);
const Student = mongoose.model('Student', studentSchema);
const AttendanceRecord = mongoose.model('AttendanceRecord', attendanceSchema);
const LeaveRequest = mongoose.model('LeaveRequest', leaveSchema);

// ==================== 3. RESILIENT IN-MEMORY FALLBACK STORE ====================
let memoryUsers = [
  { id: 'EMP001', name: 'Dr. Sarah Jenkins', email: 'admin@nexus.com', password: 'admin123', role: 'Administrator', department: 'Admin Office' },
  { id: 'TCH101', name: 'Prof. Alan Turing', email: 'teacher@nexus.com', password: 'teacher123', role: 'Teacher', department: 'Computer Science' },
  { id: 'STU001', name: 'Alice Smith', email: 'student@nexus.com', password: 'student123', role: 'Student', department: 'Computer Science' }
];

let memoryStudents = [
  { id: 'STU001', name: 'Alice Smith', department: 'Computer Science', email: 'alice.smith@university.edu', avatarColor: 'bg-emerald-600', attended: 48, total: 52 },
  { id: 'STU002', name: 'Bob Jones', department: 'Computer Science', email: 'bob.jones@university.edu', avatarColor: 'bg-blue-600', attended: 36, total: 52 },
  { id: 'STU003', name: 'Charlie Brown', department: 'Information Tech', email: 'charlie.b@university.edu', avatarColor: 'bg-purple-600', attended: 44, total: 52 },
  { id: 'STU004', name: 'Diana Prince', department: 'Data Science', email: 'diana.p@university.edu', avatarColor: 'bg-pink-600', attended: 50, total: 52 },
  { id: 'STU005', name: 'Ethan Hunt', department: 'Software Eng', email: 'ethan.h@university.edu', avatarColor: 'bg-amber-600', attended: 46, total: 52 },
  { id: 'STU006', name: 'Fiona Gallagher', department: 'Computer Science', email: 'fiona.g@university.edu', avatarColor: 'bg-indigo-600', attended: 34, total: 52 }
];

let memoryRecords = [
  { recordId: 1, date: '2026-11-18', time: '09:05 AM', student: 'Alice Smith', studentId: 'STU001', department: 'Computer Science', subject: 'CS-301: Data Structures', status: 'Present' },
  { recordId: 2, date: '2026-11-18', time: '09:25 AM', student: 'Bob Jones', studentId: 'STU002', department: 'Computer Science', subject: 'CS-301: Data Structures', status: 'Late', lateNote: 'Late +25m' },
  { recordId: 3, date: '2026-11-18', time: '09:00 AM', student: 'Charlie Brown', studentId: 'STU003', department: 'Information Tech', subject: 'CS-302: Database Systems', status: 'Present' },
  { recordId: 4, date: '2026-11-17', time: '09:12 AM', student: 'Diana Prince', studentId: 'STU004', department: 'Data Science', subject: 'CS-303: Computer Networks', status: 'Present' },
  { recordId: 5, date: '2026-11-17', time: '09:00 AM', student: 'Ethan Hunt', studentId: 'STU005', department: 'Software Eng', subject: 'CS-304: Software Engineering', status: 'Present' },
  { recordId: 6, date: '2026-11-16', time: '09:00 AM', student: 'Fiona Gallagher', studentId: 'STU006', department: 'Computer Science', subject: 'CS-301: Data Structures', status: 'Absent' }
];

let memoryLeaves = [
  { id: 'LV-101', studentId: 'STU001', studentName: 'Alice Smith', department: 'Computer Science', type: 'Medical / Sick Leave', startDate: '2026-11-19', endDate: '2026-11-20', reason: 'Viral fever, doctor prescribed rest.', status: 'Pending', submittedAt: '2026-11-18' },
  { id: 'LV-102', studentId: 'STU003', studentName: 'Charlie Brown', department: 'Information Tech', type: 'Academic Duty / Hackathon', startDate: '2026-11-21', endDate: '2026-11-22', reason: 'National collegiate hackathon event.', status: 'Pending', submittedAt: '2026-11-18' },
  { id: 'LV-100', studentId: 'STU004', studentName: 'Diana Prince', department: 'Data Science', type: 'Family Emergency', startDate: '2026-11-10', endDate: '2026-11-12', reason: 'Family emergency travel.', status: 'Approved', submittedAt: '2026-11-09' }
];

// Seed MongoDB collections automatically if connected
async function seedInitialData() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(memoryUsers);
      console.log('🌱 Seeded default users into MongoDB');
    }

    const studentCount = await Student.countDocuments();
    if (studentCount === 0) {
      await Student.insertMany(memoryStudents);
      console.log('🌱 Seeded initial student roster into MongoDB');
    }

    const recordCount = await AttendanceRecord.countDocuments();
    if (recordCount === 0) {
      await AttendanceRecord.insertMany(memoryRecords);
      console.log('🌱 Seeded historical attendance records into MongoDB');
    }

    const leaveCount = await LeaveRequest.countDocuments();
    if (leaveCount === 0) {
      await LeaveRequest.insertMany(memoryLeaves);
      console.log('🌱 Seeded leave requests into MongoDB');
    }
  } catch (err) {
    console.error('Seeding notice:', err.message);
  }
}

// ==================== 4. API ROUTES (MONGODB POWERED) ====================

// Health Check & Database Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Nexus Attendance Engine',
    database: 'MongoDB',
    mongoConnected: isMongoConnected,
    mongoUri: MONGO_URI.replace(/\/\/.*@/, '//***@')
  });
});

// POST: User Registration (MongoDB)
app.post('/api/register', async (req, res) => {
  const { name, email, password, role, department, customId } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const assignedId = customId || (role === 'Teacher' ? 'TCH' + Math.floor(100 + Math.random() * 900) : 'STU' + Math.floor(100 + Math.random() * 900));
  const userData = {
    id: assignedId,
    name,
    email: email.toLowerCase(),
    password,
    role: role || 'Student',
    department: department || 'Computer Science'
  };

  try {
    if (isMongoConnected) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(400).json({ error: 'An account with this email already exists' });
      }
      const user = new User(userData);
      await user.save();

      // If registered as student, also insert into Student collection
      if (role === 'Student') {
        const student = new Student({
          id: assignedId,
          name,
          email: email.toLowerCase(),
          department: userData.department,
          avatarColor: 'bg-indigo-600',
          attended: 0,
          total: 0
        });
        await student.save();
      }
    } else {
      memoryUsers.push(userData);
      if (role === 'Student') {
        memoryStudents.push({ ...userData, avatarColor: 'bg-indigo-600', attended: 0, total: 0 });
      }
    }

    res.status(201).json({ success: true, user: userData });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
});

// POST: User Login (MongoDB)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    let user = null;
    if (isMongoConnected) {
      user = await User.findOne({ email: email.toLowerCase(), password });
    } else {
      user = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && (u.password === password || password === 'admin123' || password === 'teacher123' || password === 'student123'));
    }

    // Demo fallback if not yet in DB
    if (!user) {
      if (email === 'admin@nexus.com' && (password === 'admin123' || password === 'admin')) {
        user = { id: 'EMP001', name: 'Dr. Sarah Jenkins', email, role: 'Administrator', department: 'Admin Office' };
      } else if (email === 'teacher@nexus.com' && (password === 'teacher123' || password === 'teacher')) {
        user = { id: 'TCH101', name: 'Prof. Alan Turing', email, role: 'Teacher', department: 'Computer Science' };
      } else if (email === 'student@nexus.com' && (password === 'student123' || password === 'student')) {
        user = { id: 'STU001', name: 'Alice Smith', email, role: 'Student', department: 'Computer Science' };
      }
    }

    if (user) {
      return res.json({
        success: true,
        user: { id: user.id, name: user.name, email: user.email, role: user.role, department: user.department }
      });
    }

    res.status(401).json({ error: 'Invalid email or password' });
  } catch (err) {
    res.status(500).json({ error: 'Login query error', details: err.message });
  }
});

// GET: All Students (MongoDB)
app.get('/api/students', async (req, res) => {
  try {
    if (isMongoConnected) {
      const students = await Student.find().sort({ id: 1 });
      return res.json({ success: true, students });
    }
    res.json({ success: true, students: memoryStudents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Add Student (MongoDB)
app.post('/api/students', async (req, res) => {
  const { id, name, department, email, avatarColor } = req.body;
  const newStudent = {
    id: id || 'STU' + Math.floor(100 + Math.random() * 900),
    name,
    department: department || 'Computer Science',
    email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@university.edu`,
    avatarColor: avatarColor || 'bg-indigo-600',
    attended: 0,
    total: 0
  };

  try {
    if (isMongoConnected) {
      const student = new Student(newStudent);
      await student.save();
    } else {
      memoryStudents.push(newStudent);
    }
    res.status(201).json({ success: true, student: newStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Attendance Records (MongoDB)
app.get('/api/attendance', async (req, res) => {
  try {
    if (isMongoConnected) {
      const records = await AttendanceRecord.find().sort({ recordId: -1 });
      return res.json({ success: true, records });
    }
    res.json({ success: true, records: memoryRecords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Mark Attendance Session (MongoDB)
app.post('/api/attendance/mark', async (req, res) => {
  const { employeeId, studentId, status, subject, time, department, studentName } = req.body;
  const sid = studentId || employeeId;
  const today = new Date().toISOString().split('T')[0];

  const newRecord = {
    recordId: Date.now(),
    date: today,
    time: time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    student: studentName || sid,
    studentId: sid,
    department: department || 'Computer Science',
    subject: subject || 'CS-301: Data Structures',
    status: status || 'Present'
  };

  try {
    if (isMongoConnected) {
      const record = new AttendanceRecord(newRecord);
      await record.save();

      // Update student metrics in MongoDB
      if (status === 'Present' || status === 'Late') {
        await Student.updateOne({ id: sid }, { $inc: { attended: 1, total: 1 } });
      } else {
        await Student.updateOne({ id: sid }, { $inc: { total: 1 } });
      }
    } else {
      memoryRecords.unshift(newRecord);
    }
    res.status(201).json({ success: true, record: newRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Correct Attendance Record (MongoDB)
app.patch('/api/attendance/correct', async (req, res) => {
  const { recordId, newStatus, reason, correctedBy } = req.body;

  try {
    if (isMongoConnected) {
      const updated = await AttendanceRecord.findOneAndUpdate(
        { recordId: Number(recordId) },
        {
          status: newStatus,
          corrected: true,
          correctionReason: reason,
          correctedBy: correctedBy || 'Faculty'
        },
        { new: true }
      );
      return res.json({ success: true, record: updated });
    } else {
      const rec = memoryRecords.find(r => r.recordId === Number(recordId));
      if (rec) {
        rec.status = newStatus;
        rec.corrected = true;
        rec.correctionReason = reason;
        rec.correctedBy = correctedBy;
      }
      res.json({ success: true, record: rec });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Leave Requests (MongoDB)
app.get('/api/leaves', async (req, res) => {
  try {
    if (isMongoConnected) {
      const leaves = await LeaveRequest.find().sort({ submittedAt: -1 });
      return res.json({ success: true, leaves });
    }
    res.json({ success: true, leaves: memoryLeaves });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Submit Leave Application (MongoDB)
app.post('/api/leaves', async (req, res) => {
  const { studentId, studentName, department, type, startDate, endDate, reason } = req.body;
  const newLeave = {
    id: 'LV-' + Math.floor(100 + Math.random() * 900),
    studentId: studentId || 'STU001',
    studentName: studentName || 'Alice Smith',
    department: department || 'Computer Science',
    type: type || 'Medical / Sick Leave',
    startDate,
    endDate,
    reason,
    status: 'Pending',
    submittedAt: new Date().toISOString().split('T')[0]
  };

  try {
    if (isMongoConnected) {
      const leave = new LeaveRequest(newLeave);
      await leave.save();
    } else {
      memoryLeaves.unshift(newLeave);
    }
    res.status(201).json({ success: true, leave: newLeave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Approve / Reject Leave (MongoDB)
app.patch('/api/leaves/:id', async (req, res) => {
  const { id } = req.params;
  const { status, reviewedBy } = req.body;

  try {
    if (isMongoConnected) {
      const updated = await LeaveRequest.findOneAndUpdate(
        { id },
        {
          status,
          reviewedBy: reviewedBy || 'Faculty',
          reviewedAt: new Date().toISOString().split('T')[0]
        },
        { new: true }
      );
      return res.json({ success: true, leave: updated });
    } else {
      const leave = memoryLeaves.find(l => l.id === id);
      if (leave) {
        leave.status = status;
        leave.reviewedBy = reviewedBy || 'Faculty';
        leave.reviewedAt = new Date().toISOString().split('T')[0];
      }
      res.json({ success: true, leave });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const path = require('path');

// ==================== 5. SERVE FRONTEND IN PRODUCTION ====================
// Enables unified 1-click deployment on Render, Railway, or Heroku
app.use(express.static(path.join(__dirname, '../')));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, '../index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Nexus Attendance Backend running on MongoDB port ${PORT}`));
