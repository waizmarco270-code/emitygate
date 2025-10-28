'use server';

/**
 * @fileOverview AI-powered feedback on application materials.
 *
 * - aiApplicationReview - A function that handles the application review process.
 * - AIApplicationReviewInput - The input type for the aiApplicationReview function.
 * - AIApplicationReviewOutput - The return type for the aiApplicationReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIApplicationReviewInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "The applicant's resume as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  coverLetter: z.string().describe("The applicant's cover letter."),
  jobDescription: z.string().describe('The job description for the applied position.'),
});
export type AIApplicationReviewInput = z.infer<typeof AIApplicationReviewInputSchema>;

const AIApplicationReviewOutputSchema = z.object({
  feedback: z.string().describe('AI-powered feedback on the application materials.'),
  overallScore: z.number().describe('An overall score for the application materials.'),
});
export type AIApplicationReviewOutput = z.infer<typeof AIApplicationReviewOutputSchema>;

export async function aiApplicationReview(input: AIApplicationReviewInput): Promise<AIApplicationReviewOutput> {
  return aiApplicationReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiApplicationReviewPrompt',
  input: {schema: AIApplicationReviewInputSchema},
  output: {schema: AIApplicationReviewOutputSchema},
  prompt: `You are an AI assistant that provides feedback on job application materials.

  Given a resume, cover letter, and job description, provide constructive feedback to the applicant.

  Consider the following aspects when providing feedback:
  - Resume formatting and clarity
  - Cover letter content and structure
  - Relevance of the application materials to the job description
  - Overall presentation and impact

  Output a detailed feedback report and an overall score (out of 100) for the application materials.

  Resume: {{media url=resumeDataUri}}
  Cover Letter: {{{coverLetter}}}
  Job Description: {{{jobDescription}}}
  
  Output format should be a JSON object with 'feedback' (string) and 'overallScore' (number) fields.
  
  Ensure the output is valid JSON.
  `,
});

const aiApplicationReviewFlow = ai.defineFlow(
  {
    name: 'aiApplicationReviewFlow',
    inputSchema: AIApplicationReviewInputSchema,
    outputSchema: AIApplicationReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
