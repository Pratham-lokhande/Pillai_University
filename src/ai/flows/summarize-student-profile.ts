'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate a concise, AI-powered biographical summary of a student's profile.
 *
 * - summarizeStudentProfile - A function that handles the student profile summarization process.
 * - SummarizeStudentProfileInput - The input type for the summarizeStudentProfile function.
 * - SummarizeStudentProfileOutput - The return type for the summarizeStudentProfile function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeStudentProfileInputSchema = z.object({
  admissionNumber: z.string().describe('The unique admission number of the student.'),
  name: z.string().describe('The full name of the student.'),
  course: z.string().describe('The course the student is currently enrolled in.'),
  year: z.number().int().min(1).max(4).describe('The academic year the student is in (e.g., 1, 2, 3, 4).'),
  dateOfBirth: z.string().describe('The date of birth of the student in YYYY-MM-DD format.'),
  email: z.string().email().describe('The email address of the student.'),
  mobileNumber: z.string().describe('The mobile phone number of the student.'),
  gender: z.string().describe('The gender of the student.'),
  address: z.string().describe('The residential address of the student.'),
  photoUrl: z.string().optional().describe('Optional URL to the student\'s photograph.'),
  performanceMetrics: z.string().optional().describe('Optional string detailing student performance metrics (e.g., grades, attendance).'),
  activityLogs: z.string().optional().describe('Optional string detailing student activity logs (e.g., extracurriculars, disciplinary actions).'),
});
export type SummarizeStudentProfileInput = z.infer<typeof SummarizeStudentProfileInputSchema>;

const SummarizeStudentProfileOutputSchema = z.string().describe('A concise, AI-generated biographical summary of the student\'s profile.');
export type SummarizeStudentProfileOutput = z.infer<typeof SummarizeStudentProfileOutputSchema>;

export async function summarizeStudentProfile(input: SummarizeStudentProfileInput): Promise<SummarizeStudentProfileOutput> {
  return summarizeStudentProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeStudentProfilePrompt',
  input: { schema: SummarizeStudentProfileInputSchema },
  output: { schema: SummarizeStudentProfileOutputSchema },
  prompt: `You are an AI assistant tasked with generating a concise, biographical summary of a student's profile.
Your summary should provide a quick overview of their key academic, personal, and activity details. The summary should be approximately 3-5 sentences long, objective, and highlight important aspects.

Student Profile Details:
Admission Number: {{{admissionNumber}}}
Name: {{{name}}}
Course: {{{course}}}
Year: {{{year}}}
Date of Birth: {{{dateOfBirth}}}
Email: {{{email}}}
Mobile Number: {{{mobileNumber}}}
Gender: {{{gender}}}
Address: {{{address}}}

{{#if photoUrl}}Photo URL: {{{photoUrl}}}{{/if}}
{{#if performanceMetrics}}Performance Metrics: {{{performanceMetrics}}}{{/if}}
{{#if activityLogs}}Activity Logs: {{{activityLogs}}}{{/if}}

Generate a concise biographical summary based on these details:`,
});

const summarizeStudentProfileFlow = ai.defineFlow(
  {
    name: 'summarizeStudentProfileFlow',
    inputSchema: SummarizeStudentProfileInputSchema,
    outputSchema: SummarizeStudentProfileOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
