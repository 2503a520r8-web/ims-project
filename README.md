# NexusAttendance - Management System

## 📁 পরিচ্ছন্ন প্রোজেক্ট স্ট্রাকচার (Clean Project Structure)

```text
IMS PROJECTE/
├── index.html            # লাইভ প্রিভিউ ওয়েবসাইট (Live Server দিয়ে সরাসরি এক ক্লিকে চলে)
├── README.md             # গাইড
│
├── database/             # MongoDB NoSQL স্কিমা ও ডকুমেন্ট স্পেসিফিকেশন
│   └── mongodb_schema.js # Mongoose কালেকশন ও মডেল ডেফিনেশন
│
├── frontend/             # পূর্ণাঙ্গ React (Vite) ড্যাশবোর্ড
│   ├── src/
│   │   ├── App.jsx       # মূল React কম্পোনেন্ট
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
│
└── backend/              # Node.js + Express + MongoDB (Mongoose) API সার্ভার
    ├── server.js         # MongoDB কালেকশন ও API রুটস (Port 5001)
    ├── .env              # MongoDB কানেকশন স্ট্রিং
    └── package.json
```

---

## 🚀 কীভাবে চালাবেন (How to Run)

### উপায় ১: Live Server দিয়ে সরাসরি চালানো (সবচেয়ে সহজ)
- VS Code-এ `index.html` ফাইলটি ওপেন করে নিচে ডানে **Go Live** অথবা রাইট-ক্লিক করে **"Open with Live Server"**-এ ক্লিক করুন।

### উপায় ২: React Frontend চালানো (Vite)
টার্মিনালে রান করুন:
```bash
cd frontend
npm run dev
```
ব্রাউজারে `http://localhost:3000` ওপেন করুন।

### উপায় ৩: Backend API সার্ভার চালানো
আরেকটি টার্মিনাল উইন্ডো খুলে রান করুন:
```bash
cd backend
npm run dev
```
সার্ভারটি `http://localhost:5001`-এ চালু হবে।
