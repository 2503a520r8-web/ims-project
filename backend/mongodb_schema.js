// MongoDB Database Models & Collections Specification
// Project: Nexus Attendance Management System
// Database: nexus_attendance (MongoDB NoSQL)

/*
=============================================================
  COLLECTION 1: users
  Stores authentication credentials & role access
=============================================================
*/
const UserDocument = {
  "_id": "ObjectId('673b281f9a12c4001a1b2c3d')",
  "id": "STU001",                           // String (Unique Indexed ID)
  "name": "Alice Smith",                    // String
  "email": "alice.smith@university.edu",    // String (Unique Indexed)
  "password": "hashed_or_plain_password",   // String
  "role": "Student",                        // Enum: 'Administrator' | 'Teacher' | 'Student'
  "department": "Computer Science",         // String
  "createdAt": "ISODate('2026-11-18T09:00:00Z')"
};

/*
=============================================================
  COLLECTION 2: students
  Stores enrolled student profiles & academic attendance stats
=============================================================
*/
const StudentDocument = {
  "_id": "ObjectId('673b281f9a12c4001a1b2c3e')",
  "id": "STU001",                           // String (Unique ID)
  "name": "Alice Smith",                    // String
  "department": "Computer Science",         // String
  "email": "alice.smith@university.edu",    // String
  "avatarColor": "bg-emerald-600",          // String (Tailwind badge class)
  "attended": 48,                           // Number (Total sessions present)
  "total": 52,                              // Number (Total sessions held)
  "createdAt": "ISODate('2026-11-18T09:00:00Z')"
};

/*
=============================================================
  COLLECTION 3: attendancerecords
  Daily session records with course subject & audit history
=============================================================
*/
const AttendanceRecordDocument = {
  "_id": "ObjectId('673b281f9a12c4001a1b2c3f')",
  "recordId": 1731920400000,                // Number (Unique audit timestamp)
  "date": "2026-11-18",                     // String (YYYY-MM-DD)
  "time": "09:05 AM",                       // String (HH:MM AM/PM)
  "student": "Alice Smith",                 // String
  "studentId": "STU001",                    // String
  "department": "Computer Science",         // String
  "subject": "CS-301: Data Structures",     // String (Course code & title)
  "status": "Present",                      // Enum: 'Present' | 'Absent' | 'Late' | 'Excused'
  "lateNote": null,                         // String (e.g. 'Late +25m')
  "corrected": false,                       // Boolean
  "correctionReason": null,                 // String
  "correctedBy": null,                      // String
  "createdAt": "ISODate('2026-11-18T09:05:00Z')"
};

/*
=============================================================
  COLLECTION 4: leaverequests
  Student leave applications with faculty approval workflow
=============================================================
*/
const LeaveRequestDocument = {
  "_id": "ObjectId('673b281f9a12c4001a1b2c40')",
  "id": "LV-101",                           // String (Unique Leave ID)
  "studentId": "STU001",                    // String
  "studentName": "Alice Smith",             // String
  "department": "Computer Science",         // String
  "type": "Medical / Sick Leave",           // String
  "startDate": "2026-11-19",                // String
  "endDate": "2026-11-20",                  // String
  "reason": "Viral fever, prescribed 2 days complete rest.",
  "status": "Pending",                      // Enum: 'Pending' | 'Approved' | 'Rejected'
  "reviewedBy": null,                       // String (Faculty Name)
  "reviewedAt": null,                       // String
  "submittedAt": "2026-11-18"               // String
};

module.exports = {
  UserDocument,
  StudentDocument,
  AttendanceRecordDocument,
  LeaveRequestDocument
};
