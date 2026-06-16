
import { Student, ActivityLog, DashboardStats, StudentQueryParams, PaginatedStudents } from './types';

// Simulated database
let students: Student[] = [
  {
    id: '1',
    admissionNumber: 'ADM20260001',
    name: 'Aarav Sharma',
    course: 'Computer Science',
    year: 1,
    dateOfBirth: '2005-06-15',
    email: 'aarav.sharma@pillai.edu',
    mobileNumber: '9876543210',
    gender: 'Male',
    address: '123 Academic Row, Mumbai',
    photoUrl: 'https://picsum.photos/seed/aarav/400/400',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    admissionNumber: 'ADM20260002',
    name: 'Ishita Iyer',
    course: 'Information Technology',
    year: 2,
    dateOfBirth: '2004-03-22',
    email: 'ishita.iyer@pillai.edu',
    mobileNumber: '9123456789',
    gender: 'Female',
    address: '45 Varsity Lane, Navi Mumbai',
    photoUrl: 'https://picsum.photos/seed/ishita/400/400',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    admissionNumber: 'ADM20260003',
    name: 'Rohan Mehta',
    course: 'Mechanical Engineering',
    year: 3,
    dateOfBirth: '2003-11-10',
    email: 'rohan.mehta@pillai.edu',
    mobileNumber: '9988776655',
    gender: 'Male',
    address: '88 Engineering Park, Pune',
    photoUrl: 'https://picsum.photos/seed/rohan/400/400',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

let activityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    action: 'Created',
    admissionNumber: 'ADM20260001',
    timestamp: new Date().toISOString(),
    description: 'Initial student record creation.'
  }
];

export async function getStudents(params: StudentQueryParams = {}): Promise<PaginatedStudents> {
  let filtered = [...students];
  const { 
    page = 1, 
    limit = 10, 
    search = '', 
    course = 'all', 
    year = 'all', 
    gender = 'all',
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = params;

  // Search
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(st => 
      st.name.toLowerCase().includes(s) || 
      st.admissionNumber.toLowerCase().includes(s) || 
      st.email.toLowerCase().includes(s)
    );
  }

  // Filter
  if (course && course !== 'all') {
    filtered = filtered.filter(st => st.course === course);
  }
  if (year && year !== 'all') {
    filtered = filtered.filter(st => st.year.toString() === year);
  }
  if (gender && gender !== 'all') {
    filtered = filtered.filter(st => st.gender === gender);
  }

  // Sort
  filtered.sort((a, b) => {
    const fieldA = a[sortBy] || '';
    const fieldB = b[sortBy] || '';
    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return {
    data,
    total,
    page,
    totalPages
  };
}

export async function getStudentById(id: string) {
  return students.find((s) => s.id === id);
}

export async function createStudent(data: Omit<Student, 'id' | 'admissionNumber' | 'createdAt' | 'updatedAt'>) {
  const nextNumber = (students.length + 1).toString().padStart(4, '0');
  const admissionNumber = `ADM2026${nextNumber}`;
  const newStudent: Student = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    admissionNumber,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  students.push(newStudent);
  
  activityLogs.unshift({
    id: Math.random().toString(36).substr(2, 9),
    action: 'Created',
    admissionNumber: newStudent.admissionNumber,
    timestamp: new Date().toISOString(),
    description: `Student ${newStudent.name} admitted.`
  });

  return newStudent;
}

export async function updateStudent(id: string, data: Partial<Student>) {
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return null;
  
  const updatedStudent = {
    ...students[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  students[index] = updatedStudent;
  
  activityLogs.unshift({
    id: Math.random().toString(36).substr(2, 9),
    action: 'Updated',
    admissionNumber: updatedStudent.admissionNumber,
    timestamp: new Date().toISOString(),
    description: `Student profile for ${updatedStudent.name} was modified.`
  });

  return updatedStudent;
}

export async function deleteStudent(id: string) {
  const student = students.find((s) => s.id === id);
  if (!student) return false;
  
  students = students.filter((s) => s.id !== id);
  
  activityLogs.unshift({
    id: Math.random().toString(36).substr(2, 9),
    action: 'Deleted',
    admissionNumber: student.admissionNumber,
    timestamp: new Date().toISOString(),
    description: `Student record for ${student.name} removed from system.`
  });

  return true;
}

export async function getStats(): Promise<DashboardStats> {
  const courseCounts: Record<string, number> = {};
  const yearCounts: Record<number, number> = {};

  students.forEach((s) => {
    courseCounts[s.course] = (courseCounts[s.course] || 0) + 1;
    yearCounts[s.year] = (yearCounts[s.year] || 0) + 1;
  });

  return {
    totalStudents: students.length,
    studentsByCourse: Object.entries(courseCounts).map(([course, count]) => ({ course, count })),
    studentsByYear: Object.entries(yearCounts).map(([year, count]) => ({ year: parseInt(year), count })),
  };
}

export async function getLogs() {
  return [...activityLogs];
}
