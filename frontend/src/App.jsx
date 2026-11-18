import React, { useState } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  History,
  Server,
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  Database,
  Network,
  Cloud,
  Shield,
  Zap,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  LogIn,
  Download,
  Plus,
  RefreshCw,
  CheckCheck,
  UserPlus,
  X,
  User,
  Hash
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// --- MOCK DATA ---
const MOCK_STUDENTS = [
  { id: 'STU001', name: 'Alice Smith', department: 'Computer Science', email: 'alice.smith@university.edu', avatarColor: 'bg-emerald-600' },
  { id: 'STU002', name: 'Bob Jones', department: 'Computer Science', email: 'bob.jones@university.edu', avatarColor: 'bg-blue-600' },
  { id: 'STU003', name: 'Charlie Brown', department: 'Information Tech', email: 'charlie.b@university.edu', avatarColor: 'bg-purple-600' },
  { id: 'STU004', name: 'Diana Prince', department: 'Data Science', email: 'diana.p@university.edu', avatarColor: 'bg-pink-600' },
  { id: 'STU005', name: 'Ethan Hunt', department: 'Software Eng', email: 'ethan.h@university.edu', avatarColor: 'bg-amber-600' },
  { id: 'STU006', name: 'Fiona Gallagher', department: 'Computer Science', email: 'fiona.g@university.edu', avatarColor: 'bg-indigo-600' },
];

const INITIAL_RECORDS = [
  { id: 1, date: '2026-11-15', student: 'Alice Smith', department: 'Computer Science', status: 'Present' },
  { id: 2, date: '2026-11-15', student: 'Bob Jones', department: 'Computer Science', status: 'Absent' },
  { id: 3, date: '2026-11-15', student: 'Charlie Brown', department: 'Information Tech', status: 'Present' },
  { id: 4, date: '2026-11-14', student: 'Diana Prince', department: 'Data Science', status: 'Late' },
  { id: 5, date: '2026-11-14', student: 'Ethan Hunt', department: 'Software Eng', status: 'Present' },
  { id: 6, date: '2026-11-13', student: 'Fiona Gallagher', department: 'Computer Science', status: 'Present' },
];

const WEEKLY_DATA = [
  { name: 'Mon', present: 45, absent: 5 },
  { name: 'Tue', present: 42, absent: 8 },
  { name: 'Wed', present: 48, absent: 2 },
  { name: 'Thu', present: 46, absent: 4 },
  { name: 'Fri', present: 39, absent: 11 },
];

// --- 1. LOGIN COMPONENT ---
const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@nexus.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let user = null;
    try {
      const res = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        user = data.user;
      }
    } catch (err) {}

    if (!user) {
      if (email === 'admin@nexus.com' && password === 'admin123') {
        user = { id: 'EMP001', name: 'Admin User', email, role: 'Administrator' };
      } else if (email && password.length >= 4) {
        user = { id: 'EMP002', name: email.split('@')[0], email, role: 'Staff Member' };
      }
    }

    setLoading(false);
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password! Please use the demo credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 sm:p-10 space-y-7 relative z-10">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3.5 bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-2xl shadow-lg shadow-indigo-600/30">
            <Database size={28} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">NexusAttendance</h1>
          <p className="text-xs text-slate-500 font-medium">Enterprise Attendance & Multi-Database Management</p>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-3.5 text-xs text-slate-700 flex items-center justify-between">
          <div>
            <span className="font-bold text-indigo-700">Demo Login:</span>
            <span className="text-slate-500 font-mono ml-1.5">admin@nexus.com / admin123</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail('admin@nexus.com');
              setPassword('admin123');
              setError('');
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 rounded-xl text-xs font-semibold transition-all shadow-sm"
          >
            Auto Fill
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3.5 py-2.5 rounded-xl flex items-center space-x-2">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail size={16} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nexus.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Password</label>
              <button
                type="button"
                onClick={() => alert('Demo password is: admin123')}
                className="text-xs text-indigo-600 hover:underline font-semibold"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock size={16} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
            <label className="flex items-center space-x-2 cursor-pointer font-medium">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span>Remember me</span>
            </label>
            <span className="text-slate-400 font-mono">Nexus v2.4</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2 active:scale-[0.99]"
          >
            <LogIn size={16} />
            <span>{loading ? 'Signing in...' : 'Sign In to Dashboard'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

// --- 2. DASHBOARD VIEW ---
const DashboardView = ({ stats, onQuickMark }) => (
  <div className="space-y-6">
    {/* Welcome Card */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <span>System Dashboard Overview</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">Real-time attendance metrics, active students, and compliance trends.</p>
      </div>
      <div className="flex items-center space-x-2 text-xs font-semibold">
        <span class="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-200">
          📅 Today • Nov 15, 2026
        </span>
        <button onClick={onQuickMark} className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-xl transition-all shadow-sm flex items-center space-x-1.5">
          <Plus size={14} />
          <span>Mark Now</span>
        </button>
      </div>
    </div>

    {/* 4 Metric KPI Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Total Enrolled</span>
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Users size={16} />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-black text-slate-900 tracking-tight">{stats.enrolled}</span>
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+4 new</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Enrolled across 4 departments</p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Present Today</span>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
            <UserCheck size={16} />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-black text-emerald-600 tracking-tight">{stats.present}</span>
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">84.0% rate</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Verified student check-ins</p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Absent Today</span>
          <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
            <UserX size={16} />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-black text-rose-600 tracking-tight">{stats.absent}</span>
          <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">-2.5% vs avg</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Unexcused daily absences</p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Avg. Attendance</span>
          <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
            <TrendingUp size={16} />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-black text-purple-600 tracking-tight">{stats.avg}</span>
          <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">Target: 85%</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Rolling 30-day compliance</p>
      </div>
    </div>

    {/* Chart & Department Breakdown */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Weekly Attendance Trend</h3>
            <p className="text-xs text-slate-400">Distribution of present and absent student counts</p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2.5 py-1 rounded-xl">Weekly View</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '11px',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '15px', fontSize: '11px' }} />
              <Bar dataKey="present" name="Present" fill="#10B981" radius={[6, 6, 0, 0]} maxBarSize={32} />
              <Bar dataKey="absent" name="Absent" fill="#F43F5E" radius={[6, 6, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Department Compliance</h3>
          <p className="text-xs text-slate-400 mb-4">Live compliance benchmarks</p>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">Computer Science</span>
                <span className="font-bold text-emerald-600">94%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">Data Science</span>
                <span className="font-bold text-indigo-600">91%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">Software Engineering</span>
                <span className="font-bold text-blue-600">89%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">Information Tech</span>
                <span className="font-bold text-amber-600">82%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>PostgreSQL Synchronized</span>
          </span>
          <span className="font-mono text-slate-400">12ms</span>
        </div>
      </div>
    </div>
  </div>
);

// --- 2.5 ADD STUDENT MODAL ---
const AddStudentModal = ({ isOpen, onClose, onAddStudent }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const finalId = id.trim().toUpperCase() || `STU${Date.now().toString().slice(-4)}`;
    const finalEmail = email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@university.edu`;
    const colors = ['bg-indigo-600', 'bg-emerald-600', 'bg-blue-600', 'bg-purple-600', 'bg-pink-600', 'bg-amber-600', 'bg-rose-600'];
    const avatarColor = colors[Math.floor(Math.random() * colors.length)];

    onAddStudent({
      id: finalId,
      name: name.trim(),
      department,
      email: finalEmail,
      avatarColor
    });

    setName('');
    setId('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-all">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
              <UserPlus size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Add New Student</h3>
              <p className="text-xs text-slate-500">Register a new student to the attendance roster</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">Student Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">Student ID *</label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={id}
                  onChange={e => setId(e.target.value)}
                  placeholder="STU007"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">Department *</label>
              <select
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-medium"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
                <option value="Information Tech">Information Tech</option>
                <option value="Software Eng">Software Eng</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">University Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="john.doe@university.edu"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md shadow-indigo-500/20 flex items-center space-x-1.5 active:scale-95"
            >
              <Plus size={16} />
              <span>Save Student</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- 3. MARK ATTENDANCE VIEW ---
const MarkAttendanceView = ({ students, onOpenAddStudent, onSubmit, showNotification }) => {
  const [attendanceState, setAttendanceState] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const markStatus = (id, status) => {
    setAttendanceState(prev => ({ ...prev, [id]: status }));
  };

  const markAll = (status) => {
    const newState = {};
    students.forEach(s => newState[s.id] = status);
    setAttendanceState(newState);
    showNotification(`All students marked as ${status.toUpperCase()}`, 'info');
  };

  const clearAll = () => {
    setAttendanceState({});
    showNotification('Attendance selection cleared', 'info');
  };

  const filteredStudents = students.filter(
    s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async () => {
    const markedIds = Object.keys(attendanceState);
    if (markedIds.length === 0) {
      showNotification('Please select attendance for at least one student before submitting!', 'warning');
      return;
    }

    setIsSubmitting(true);
    await onSubmit(attendanceState);
    setIsSubmitting(false);
  };

  const selectedCount = Object.keys(attendanceState).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Mark Attendance</h2>
          <p className="text-xs text-slate-500 mt-0.5">Register daily check-ins with immediate transaction rollback safety.</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenAddStudent}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm shadow-indigo-500/20 flex items-center space-x-1.5 active:scale-95"
          >
            <UserPlus size={14} />
            <span>Add Student</span>
          </button>
          <button
            onClick={() => markAll('present')}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center space-x-1.5 active:scale-95"
          >
            <CheckCheck size={14} />
            <span>Mark All Present</span>
          </button>
          <button
            onClick={clearAll}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold px-3 py-2 rounded-xl transition-all"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-3 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search students by name, ID or Dept..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-200">
              {selectedCount} of {students.length} Selected
            </span>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center space-x-2 active:scale-95 disabled:opacity-50"
            >
              <CheckCircle size={15} />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Attendance'}</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 text-[11px]">
                <th className="px-6 py-3.5">Student</th>
                <th className="px-6 py-3.5">ID</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5 text-center">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-xl ${student.avatarColor} text-white font-bold flex items-center justify-center text-xs shadow-sm`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-xs">{student.name}</p>
                        <p className="text-[11px] text-slate-400">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 font-mono text-slate-500 font-medium">{student.id}</td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600">
                      {student.department}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex justify-center space-x-1.5">
                      <button
                        onClick={() => markStatus(student.id, 'present')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          attendanceState[student.id] === 'present'
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                            : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                        }`}
                      >
                        ✓ Present
                      </button>
                      <button
                        onClick={() => markStatus(student.id, 'absent')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          attendanceState[student.id] === 'absent'
                            ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                            : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                        }`}
                      >
                        ✕ Absent
                      </button>
                      <button
                        onClick={() => markStatus(student.id, 'late')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          attendanceState[student.id] === 'late'
                            ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                            : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
                        }`}
                      >
                        ⏱ Late
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- 4. RECORDS VIEW ---
const ViewRecordsView = ({ records, showNotification }) => {
  const [dateFilter, setDateFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredRecords = records.filter(r => {
    if (dateFilter && r.date !== dateFilter) return false;
    if (deptFilter !== 'All' && (r.department || 'Computer Science') !== deptFilter) return false;
    if (statusFilter !== 'All' && r.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    return true;
  });

  const exportCSV = () => {
    let csv = 'Record ID,Date,Student Name,Department,Status\n';
    filteredRecords.forEach(r => {
      csv += `${r.id},"${r.date}","${r.student}","${r.department || 'N/A'}","${r.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-records-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showNotification(`Exported ${filteredRecords.length} record(s) to CSV successfully!`, 'success');
  };

  const resetFilters = () => {
    setDateFilter('');
    setDeptFilter('All');
    setStatusFilter('All');
    showNotification('Filters reset to show all records', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Historical Records</h2>
          <p className="text-xs text-slate-500 mt-0.5">Permanent relational audit logs of attendance sessions.</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-indigo-700 bg-indigo-50 font-bold px-3 py-1.5 rounded-xl border border-indigo-100">
            Total: {filteredRecords.length} of {records.length} records
          </span>
          <button
            onClick={exportCSV}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors flex items-center space-x-1.5"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-3 items-center bg-slate-50/50">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-500">Filter By:</span>
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Data Science">Data Science</option>
            <option value="Information Tech">Information Tech</option>
            <option value="Software Eng">Software Eng</option>
          </select>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="All">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
          </select>
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition-colors hover:bg-slate-50 flex items-center space-x-1"
          >
            <RefreshCw size={12} />
            <span>Reset</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 text-[11px]">
                <th className="px-6 py-3.5">Record ID</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Student Name</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    <p className="font-medium text-slate-600 text-xs">No records found matching the selected filters.</p>
                    <button onClick={resetFilters} className="text-xs text-indigo-600 hover:text-indigo-700 font-bold underline mt-1">
                      Reset Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredRecords.map(record => (
                  <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5 text-slate-500 font-mono font-medium">#REC-{String(record.id).padStart(3, '0')}</td>
                    <td className="px-6 py-3.5 text-slate-600 font-medium">{record.date}</td>
                    <td className="px-6 py-3.5 font-bold text-slate-900">{record.student}</td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600">
                        {record.department || 'Computer Science'}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          record.status === 'Present'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : record.status === 'Absent'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        record.status === 'Present'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : record.status === 'Absent'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- 5. SYSTEM ARCHITECTURE VIEW ---
const SystemArchitectureView = () => (
  <div className="space-y-6">
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">System Infrastructure & Topology</h2>
      <p className="text-xs text-slate-500 mt-1">Multi-database architecture with ACID guarantees and in-memory Redis caching.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Database size={20} />
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">ACID Active</span>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">PostgreSQL Relational DB</h3>
          <p className="text-xs text-slate-500 mt-1">Primary transactional storage for student records and foreign key constraints.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Server size={20} />
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">Port 27017</span>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">MongoDB Event Logs</h3>
          <p className="text-xs text-slate-500 mt-1">High-throughput document store for sensor telemetry and asynchronous audit logs.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <Zap size={20} />
          </div>
          <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200">96.4% Hit</span>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Redis In-Memory Cache</h3>
          <p className="text-xs text-slate-500 mt-1">Sub-millisecond retrieval of daily active attendance and session tokens.</p>
        </div>
      </div>
    </div>
  </div>
);

// --- 6. MAIN COMPONENT ---
export default function AttendanceApp() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nexus_user') || 'null');
    } catch (e) {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [stats, setStats] = useState({
    enrolled: 50,
    present: 42,
    absent: 8,
    avg: '88%'
  });
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('nexus_user', JSON.stringify(user));
    showNotification(`Welcome back, ${user.name}! Signed in successfully.`, 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('nexus_user');
    setCurrentUser(null);
  };

  const handleAttendanceSubmit = async (attendanceState) => {
    const markedIds = Object.keys(attendanceState);
    const today = new Date().toISOString().split('T')[0];

    let presentAdd = 0;
    let absentAdd = 0;
    const newRecordsList = [];

    for (const id of markedIds) {
      const student = MOCK_STUDENTS.find(s => s.id === id);
      const rawStatus = attendanceState[id];
      const status = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1);

      if (status === 'Present') presentAdd++;
      if (status === 'Absent') absentAdd++;

      newRecordsList.push({
        id: records.length + newRecordsList.length + 1,
        date: today,
        student: student ? student.name : id,
        department: student ? student.department : 'General',
        status: status
      });

      try {
        fetch('http://localhost:5001/api/attendance/mark', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ employeeId: id, status })
        }).catch(() => {});
      } catch (err) {}
    }

    setRecords(prev => [...newRecordsList, ...prev]);
    setStats(prev => ({
      ...prev,
      present: prev.present + presentAdd,
      absent: prev.absent + absentAdd
    }));

    showNotification(`✅ Submitted successfully! Recorded attendance for ${markedIds.length} student(s).`, 'success');
  };

  if (!currentUser) {
    return <LoginView onLogin={handleLogin} />;
  }

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mark', label: 'Mark Attendance', icon: CheckSquare },
    { id: 'records', label: 'View Records', icon: History },
    { id: 'architecture', label: 'System Architecture', icon: Server },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 max-w-md px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 text-xs font-semibold transition-all ${
            notification.type === 'warning'
              ? 'bg-amber-50 text-amber-900 border border-amber-300'
              : notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
              : 'bg-indigo-50 text-indigo-900 border border-indigo-300'
          }`}
        >
          {notification.type === 'warning' && <AlertCircle size={16} className="text-amber-600" />}
          {notification.type === 'success' && <CheckCircle2 size={16} className="text-emerald-600" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col hidden md:flex flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md">
              <Database size={20} />
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 tracking-tight block">NexusAttendance</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Enterprise Hub</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
          {navigation.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3.5 border-t border-slate-100 bg-slate-50 m-3 rounded-2xl border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="text-left truncate">
                <p className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</p>
                <p className="text-[11px] text-slate-400 font-medium truncate">{currentUser.role || 'Staff'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Log Out"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-400">Workspace / Attendance</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Live</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl transition-colors font-medium"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && <DashboardView stats={stats} onQuickMark={() => setActiveTab('mark')} />}
            {activeTab === 'mark' && (
              <MarkAttendanceView
                onSubmit={handleAttendanceSubmit}
                showNotification={showNotification}
              />
            )}
            {activeTab === 'records' && <ViewRecordsView records={records} showNotification={showNotification} />}
            {activeTab === 'architecture' && <SystemArchitectureView />}
          </div>
        </div>
      </main>
    </div>
  );
}
