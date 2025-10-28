'use server';

/**
 * @fileOverview Summarizes team feedback using AI.
 *
 * - summarizeTeamFeedback - A function that summarizes the feedback.
 * - SummarizeTeamFeedbackInput - The input type for the summarizeTeamFeedback function.
 * - SummarizeTeamFeedbackOutput - The return type for the summarizeTeamFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTeamFeedbackInputSchema = z.object({
  feedback: z.string().describe('A collection of feedback from team members to be summarized.'),
});
export type SummarizeTeamFeedbackInput = z.infer<typeof SummarizeTeamFeedbackInputSchema>;

const SummarizeTeamFeedbackOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the key points, action items, and overall sentiment from the provided feedback.'),
});
export type SummarizeTeamFeedbackOutput = z.infer<typeof SummarizeTeamFeedbackOutputSchema>;

export async function summarizeTeamFeedback(input: SummarizeTeamFeedbackInput): Promise<SummarizeTeamFeedbackOutput> {
  return summarizeTeamFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTeamFeedbackPrompt',
  input: {schema: SummarizeTeamFeedbackInputSchema},
  output: {schema: SummarizeTeamFeedbackOutputSchema},
  prompt: `You are an expert project manager, skilled at distilling complex team discussions into actionable insights.

  Summarize the following feedback into a clear and concise report. Identify key themes, action items, and the overall sentiment.

  Raw Feedback:
  {{{feedback}}}
  
  Generate a summary.`,
});

const summarizeTeamFeedbackFlow = ai.defineFlow(
  {
    name: 'summarizeTeamFeedbackFlow',
    inputSchema: SummarizeTeamFeedbackInputSchema,
    outputSchema: SummarizeTeamFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
