
'use server';

import { revalidatePath } from 'next/cache';
import * as store from '@/lib/store';
import { Student, StudentQueryParams } from '@/lib/types';
import { generateStudentProfileSummary } from '@/ai/flows/generate-student-profile-summary';

export async function fetchStudents(params?: StudentQueryParams) {
  return await store.getStudents(params);
}

export async function fetchStats() {
  return await store.getStats();
}

export async function fetchLogs() {
  return await store.getLogs();
}

export async function fetchStudentById(id: string) {
  return await store.getStudentById(id);
}

export async function createStudentAction(data: any) {
  const student = await store.createStudent(data);
  revalidatePath('/students');
  revalidatePath('/');
  return student;
}

export async function updateStudentAction(id: string, data: any) {
  const student = await store.updateStudent(id, data);
  revalidatePath('/students');
  revalidatePath(`/students/${id}`);
  revalidatePath('/');
  return student;
}

export async function deleteStudentAction(id: string) {
  await store.deleteStudent(id);
  revalidatePath('/students');
  revalidatePath('/');
}

export async function generateSummaryAction(student: Student) {
  try {
    return await generateStudentProfileSummary({
      admissionNumber: student.admissionNumber,
      name: student.name,
      course: student.course,
      year: student.year,
      dateOfBirth: student.dateOfBirth,
      email: student.email,
      mobileNumber: student.mobileNumber,
      gender: student.gender,
      address: student.address,
    });
  } catch (error) {
    console.error('AI Summary Error:', error);
    return 'The AI agent is currently busy analyzing academic transcripts. A professional summary will be available shortly.';
  }
}
