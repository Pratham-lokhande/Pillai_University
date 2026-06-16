'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate a concise, AI-powered summary of a student's profile.
 *
 * - generateStudentProfileSummary - A function that handles the student profile summarization process.
 * - GenerateStudentProfileSummaryInput - The input type for the generateStudentProfileSummary function.
 * - GenerateStudentProfileSummaryOutput - The return type for the generateStudentProfileSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateStudentProfileSummaryInputSchema = z.object({
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
});
export type GenerateStudentProfileSummaryInput = z.infer<typeof GenerateStudentProfileSummaryInputSchema>;

const GenerateStudentProfileSummaryOutputSchema = z.string().describe('A concise, AI-generated summary of the student\'s profile.');
export type GenerateStudentProfileSummaryOutput = z.infer<typeof GenerateStudentProfileSummaryOutputSchema>;

export async function generateStudentProfileSummary(input: GenerateStudentProfileSummaryInput): Promise<GenerateStudentProfileSummaryOutput> {
  return generateStudentProfileSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudentProfileSummaryPrompt',
  input: { schema: GenerateStudentProfileSummaryInputSchema },
  output: { schema: GenerateStudentProfileSummaryOutputSchema },
  prompt: `You are an AI assistant designed to generate concise and professional summaries of student profiles for administrative purposes. Your goal is to provide a quick overview of the student's key biographical details, academic enrollment, and general status based on the provided information. The summary should be approximately 3-4 sentences long and objective.

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

Generate a concise summary based on these details:`,
});

const generateStudentProfileSummaryFlow = ai.defineFlow(
  {
    name: 'generateStudentProfileSummaryFlow',
    inputSchema: GenerateStudentProfileSummaryInputSchema,
    outputSchema: GenerateStudentProfileSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
