
export type Gender = 'Male' | 'Female' | 'Other';

export interface Student {
  id: string;
  admissionNumber: string;
  name: string;
  course: string;
  year: number;
  dateOfBirth: string;
  email: string;
  mobileNumber: string;
  gender: Gender;
  address: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  action: 'Created' | 'Updated' | 'Deleted';
  admissionNumber: string;
  timestamp: string;
  description: string;
}

export interface DashboardStats {
  totalStudents: number;
  studentsByCourse: { course: string; count: number }[];
  studentsByYear: { year: number; count: number }[];
}

export interface StudentQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  course?: string;
  year?: string;
  gender?: string;
  sortBy?: 'name' | 'admissionNumber' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedStudents {
  data: Student[];
  total: number;
  page: number;
  totalPages: number;
}
